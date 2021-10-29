import {
    BtnBar,
    ModifyDialog,
    Header,
    LoadingDialog,
    ObjectSelect,
    ResultTable,
    PendingComponent
} from '../../components'
import {TableColumn} from '@nlmk/ds/dist/components/Table'
import {Alert, CommonWrapper} from '@nlmk/ds/dist/components'
import React, {useCallback, useEffect, useState} from "react";
import {IRowsInterface, EntityInterface, requestInterface} from "../../interfaces";
import {useHttp} from "../../hooks/http.hook";
import {getEntity, getObjectId, getVisibleEntityFields} from "../../helpers/entities/entities";
import {defaultHeader} from "../../constants/headerStructure";
import {getRequestUrl} from "../../helpers/http/http";
import {defaultRequestParams} from "../../constants/defaultRequestParams";
import {requestMessages} from "../../constants/messages";

function ThemeWrapper(props: any) {
    return (
        <CommonWrapper theme="light">{props.children}</CommonWrapper>
    )
}

export const MainPage: React.FC = () => {
    const { request, pending, error, clearError } = useHttp()
    const [requestParams, setRequestParams] = useState<requestInterface>(defaultRequestParams)
    const [pageCount, setPageCount] = useState(1)
    const [notification, setNotification] = useState<string | null>(null)

    const [isEditDialogVisible, setEditDialogVisible] = useState(false)
    const [isCreateDialogVisible, setCreateDialogVisible] = useState(false)
    const [isLoadDialogVisible, setLoadDialogVisible] = useState(false)
    const [activeRow, setActiveRow] = useState<IRowsInterface | null>(null)
    const [isLoading, setLoading] = useState(false)
    const [isCompleted] = useState(false)

    const [rows, setRows] = useState<IRowsInterface[]>([])
    const [columns, setColumns] = useState<TableColumn<IRowsInterface>[]>(defaultHeader)
    const [checkedList, onCheckedChange] = useState<IRowsInterface[]>([{} as IRowsInterface])

    const [objectList, setObjectList] = useState<EntityInterface[]>([])
    const [activeEntity, setActiveEntity] = useState<EntityInterface | null>(null)

    const getEntities = useCallback(async () => {
        try {
            const mas = (await request('/entities', 'GET')).map((val: String) => getEntity(val))
            setObjectList(mas);
        } catch (e) {
        }
    }, [request])

    useEffect(() => {
        getEntities();
    }, [getEntities])

    const onEditDialogOpen = useCallback(() => {
        setEditDialogVisible(true)
    }, [])


    const onEditDialogClose = () => {
        setEditDialogVisible(false)
    }

    const onCreateDialogOpen = () => {
        setCreateDialogVisible(true)
    }

    const onCreateDialogClose = () => {
        setCreateDialogVisible(false)
    }

    const clearRows = () => {
        setRows([])
        setPageCount(0);
    }

    const clearNotifications = useCallback(()=>{
        setNotification(null)
        clearError()
    },[clearError])

    const getRows = useCallback((value: any, params = requestParams) => {
        const result = getEntity(value);
        setActiveEntity(result);
        setColumns(result.tableHeader);
        setActiveRow(null);
        clearNotifications();
        onCheckedChange([{} as IRowsInterface])
        try {
            const url = getRequestUrl(result.url, params);
            request(url, 'GET').then(data => {
                const resultedRows = data.content.map((column: any) => {
                    const resultedRow: any = {};
                    for (const key in column) {
                        resultedRow[result.fieldByName[key]] = column[key]
                    }

                    return resultedRow;
                })
                setPageCount(data.totalPages)
                setRows(resultedRows)
            }).catch(() => {
                setRows([])
            })
        } catch (e) {
        }
    }, [clearNotifications, requestParams, request])

    const setParamsAndGetRows = useCallback((params: requestInterface, entityName: String | undefined) => {
        setRequestParams(params)
        getRows(entityName, params)
    }, [getRows])


    useEffect(() => {
        const tableElements = checkedList.slice(1);
        const activeElement = tableElements.length === 1 ? tableElements[0] : null
        setActiveRow(activeElement)
    }, [checkedList])

    const onChangePage = (page: number) => {
        const newRequestParams = {...requestParams, page};
        setParamsAndGetRows(newRequestParams, activeEntity?.name)
    }

    const onFilterItems = (value: any) => {
        const sort = Object.keys(activeEntity?.fieldByName).find(key => activeEntity?.fieldByName[`${key}`] === value)
        const newRequestParams = {...defaultRequestParams, sort}
        clearRows();
        setParamsAndGetRows(newRequestParams, activeEntity?.name)
    }

    const selectEntity = (value: string) => {
        clearRows()
        setParamsAndGetRows(defaultRequestParams, value)
    }

    const getDefaultRows = useCallback(() => {
        clearRows()
        setParamsAndGetRows(defaultRequestParams, activeEntity?.name)
    }, [activeEntity, setParamsAndGetRows])


    const sentRequestWithReFresh = useCallback(async (url: string, method: 'PUT' | 'POST' | 'DELETE', body: any) => {
        clearNotifications();
        await request(url, method, body)
        onCheckedChange([{} as IRowsInterface])
        getDefaultRows()
        setNotification(requestMessages[method])
    }, [getDefaultRows, request, clearNotifications])

    const modifyObject = useCallback(async (object: any, method: 'PUT' | 'POST') => {
        try {
            if (activeEntity) {
                const body: any = {};

                Object.entries(activeEntity.fieldByName).forEach(([key, value]) => {
                    const requestValue = object[`${value}`]
                    body[`${key}`] = requestValue;
                });

                await sentRequestWithReFresh(activeEntity.url, method, body)
            }
        } catch (e) {
            onCheckedChange([{} as IRowsInterface])
        }
    }, [activeEntity, sentRequestWithReFresh])

    const deleteObjects = useCallback(async () => {
        try {
            if (activeEntity) {
                const body = checkedList.slice(1).map(check => getObjectId(check, activeEntity));

                await sentRequestWithReFresh(activeEntity.url, 'DELETE', body)
            }
        } catch (e) {
            onCheckedChange([{} as IRowsInterface])
        }
    }, [activeEntity, checkedList, sentRequestWithReFresh])


    const createObject = useCallback(async (object: any) => {
        await modifyObject(object, 'POST')
    }, [modifyObject])

    const editObject = useCallback(async (object: any) => {
        await modifyObject(object, 'PUT')
    }, [modifyObject])

    return (
        <div className="App">
            <ThemeWrapper>
                <Header/>
                <div className="main">
                    <ObjectSelect objectList={objectList} getRows={selectEntity}/>
                    <div className="main-table">
                        {
                            error &&
                            <Alert
                                severity={'error'}
                                title={error}
                                variant={'standard'}
                                className='notification'
                            />
                        }
                        {
                            notification &&
                            <Alert
                                className='notification'
                            >
                                {notification}
                            </Alert>
                        }

                        <BtnBar
                            isEditBtnDisabled={!activeRow}
                            isDeleteBtnDisabled={!checkedList.slice(1).length}
                            setLoadDialogVisible={setLoadDialogVisible}
                            onEditDialogOpen={onEditDialogOpen}
                            onCreateDialogOpen={onCreateDialogOpen}
                            onDeleteObjects={deleteObjects}
                            filterItem={activeEntity?.fieldByName[`${requestParams.sort}`]}
                            filterElements={getVisibleEntityFields(columns)}
                            onFilterItems={onFilterItems}
                            isNeedReload={!!error}
                            isBarEnabled={rows.length > 0}
                            reload={getDefaultRows}
                        />
                        <ResultTable
                            rows={rows}
                            checked={checkedList}
                            columns={getVisibleEntityFields(columns)}
                            onCheckedChange={onCheckedChange}
                            onChangePage={(page) => onChangePage(page)}
                            pageCount={pageCount}
                        />
                    </div>
                </div>
                {isEditDialogVisible &&
                <ModifyDialog
                    activeRow={activeRow}
                    onClose={onEditDialogClose}
                    columns={activeEntity?.tableHeader}
                    modify={editObject}
                />
                }
                {isLoadDialogVisible && (
                    <LoadingDialog
                        isCompleted={isCompleted}
                        setLoadDialogVisible={setLoadDialogVisible}
                        setLoading={setLoading}
                        isLoading={isLoading}
                    />
                )}
                {isCreateDialogVisible && (
                    <ModifyDialog
                        activeRow={{}}
                        onClose={onCreateDialogClose}
                        columns={activeEntity?.tableHeader}
                        isCreationDialog={true}
                        modify={createObject}
                    />
                )}

                {pending &&
                <PendingComponent/>
                }
            </ThemeWrapper>
        </div>
    )
}


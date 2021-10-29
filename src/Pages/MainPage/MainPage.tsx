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

function ThemeWrapper(props: any) {
    return (
        <CommonWrapper theme="light">{props.children}</CommonWrapper>
    )
}

export const MainPage: React.FC = () => {
    const {request, pending, error, clearError} = useHttp()
    const [checkedList, onCheckedChange] = useState<IRowsInterface[]>([{} as IRowsInterface])
    const [isEditDialogVisible, setEditDialogVisible] = useState(false)
    const [isCreateDialogVisible, setCreateDialogVisible] = useState(false)
    const [isLoadDialogVisible, setLoadDialogVisible] = useState(false)
    const [activeRow, setActiveRow] = useState<IRowsInterface | null>(null)
    const [isLoading, setLoading] = useState(false)
    const [rows, setRows] = useState<IRowsInterface[]>([])
    const [columns, setColumns] = useState<TableColumn<IRowsInterface>[]>(defaultHeader)
    const [objectList, setObjectList] = useState<EntityInterface[]>([])
    const [isCompleted] = useState(false)
    const [activeEntity, setActiveEntity] = useState<EntityInterface | null>(null)
    const [requestParams, setRequestParams] = useState<requestInterface>(defaultRequestParams)
    const [pageCount, setPageCount] = useState(1)

    const getEntities = useCallback(() => {
        try {
            request('/entities', 'GET').then(data => {
                const mas = data.map((val: String) => getEntity(val))
                setObjectList(mas);
            })
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

    const setParamsAndGetRows = (params: requestInterface,entityName: String | undefined) => {
        setRequestParams(params)
        getRows(entityName, params)
    }


    useEffect(() => {
        const tableElements = checkedList.slice(1);
        const activeElement = tableElements.length === 1 ? tableElements[0] : null
        setActiveRow(activeElement)
    }, [checkedList])

    const onChangePage = (pageNumber: number) => {
        const newRequestParams = { ...requestParams, pageNumber};
        setParamsAndGetRows(newRequestParams, activeEntity?.name)
    }

    const onFilterItems = (value: any) => {
        const sortBy = Object.keys(activeEntity?.fieldByName).find(key => activeEntity?.fieldByName[`${key}`] === value)
        const newRequestParams = { ...defaultRequestParams,sortBy }
        clearRows();
        setParamsAndGetRows(newRequestParams, activeEntity?.name)
    }

    const onReload = () => {
        clearRows()
        getRows(activeEntity?.name, defaultRequestParams)
    }

    const selectEntity = (value: string) => {
        clearRows()
        setParamsAndGetRows(defaultRequestParams, value)
    }


    const getRows = (value: any, params = requestParams) => {
        const result = getEntity(value);
        setActiveEntity(result);
        setColumns(result.tableHeader);
        setActiveRow(null);
        clearError();
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
    }

    const modifyObject = useCallback((object: any, method: String) => {
        clearError();
        try {
            if (activeEntity) {
                const body: any = {};
                Object.entries(activeEntity.fieldByName).forEach(([key, value]) => {
                    const requestValue = object[`${value}`]
                    body[`${key}`] = requestValue;
                });
                request(activeEntity.url, method, body).then(() => {
                    onCheckedChange([{} as IRowsInterface])
                })
            }
        } catch (e) {
        }
    }, [activeEntity, request, clearError])

    const deleteObjects = useCallback(() => {
        try {
            if (activeEntity) {
                clearError();
                const body = checkedList.slice(1).map(check => getObjectId(check, activeEntity));
                request(activeEntity.url, 'DELETE', body).then(() => {
                    onCheckedChange([{} as IRowsInterface])
                })
            }

        } catch (e) {
        }
    }, [activeEntity, checkedList, request, clearError])

    const createObject = useCallback((object: any) => {
        modifyObject(object, 'POST')
    }, [modifyObject])

    const editObject = useCallback((object: any) => {
        modifyObject(object, 'PUT')
    }, [modifyObject])

    return (
        <div className="App">
            <ThemeWrapper>
                <Header/>
                <div className="main">
                    <ObjectSelect objectList={objectList} getRows={selectEntity}/>
                    <div className="main-table">
                        {error &&
                        <Alert
                            severity={'error'}
                            title={error}
                            variant={'standard'}
                            className='notification'
                        />
                        }
                        <BtnBar
                            isEditBtnDisabled={!activeRow}
                            isDeleteBtnDisabled={!checkedList.slice(1).length}
                            setLoadDialogVisible={setLoadDialogVisible}
                            onEditDialogOpen={onEditDialogOpen}
                            onCreateDialogOpen={onCreateDialogOpen}
                            onDeleteObjects={deleteObjects}
                            filterElement={getVisibleEntityFields(columns)}
                            filterItems={onFilterItems}
                            isNeedReload={!!error}
                            isBarEnabled={rows.length > 0}
                            reload={onReload}
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


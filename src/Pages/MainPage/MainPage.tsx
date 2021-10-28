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
import {IRowsInterface, EntityInterface} from "../../interfaces";
import {useHttp} from "../../hooks/http.hook";
import {getEntity, getObjectId, getVisibleEntityFields} from "../../helpers/entities/entities";
import {defaultHeader} from "../../constants/headerStructure";

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
    const [activeEntity, setActiveObject] = useState<EntityInterface | null>(null)

    const getEntities = useCallback(() => {
        try {
            request('/entities', 'GET').then(data => {
                const mas = data.map((val: String) => {
                    const result = getEntity(val);
                    return {
                        name: `${result.name}`,
                        url: `${result.url}`,
                        localizedName: `${result.localizedName}`,
                    };
                })
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


    useEffect(() => {
        const tableElements = checkedList.slice(1);
        if (tableElements.length === 1) {
            setActiveRow(tableElements[0])
        } else {
            setActiveRow(null)
        }

    }, [checkedList])

    const selectObject = (e: any) => {
        const result = getEntity(e.target.value);
        setActiveRow(null);
        clearError();
        onCheckedChange([{} as IRowsInterface])
        try {
            request(result.url, 'GET').then(data => {
                setActiveObject(result)
                setColumns(result.tableHeader)
                const resultedRows = data.map((column: any) => {
                    const resultedRow: any = {};
                    for (const key in column) {
                        resultedRow[result.fieldByName[key]] = column[key]
                    }

                    return resultedRow;
                })
                setRows(resultedRows.slice(0, 10))
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
                    <ObjectSelect objectList={objectList} selectType={selectObject}/>
                    <div className="main-table">
                        {error &&
                        <Alert
                            severity={'error'}
                            title={error}
                            variant={'standard'}
                            className='notification'
                        />
                        }
                        {rows.length > 0 &&
                        <BtnBar
                            isEditBtnDisabled={!activeRow}
                            isDeleteBtnDisabled={!checkedList.slice(1).length}
                            setLoadDialogVisible={setLoadDialogVisible}
                            onEditDialogOpen={onEditDialogOpen}
                            onCreateDialogOpen={onCreateDialogOpen}
                            onDeleteObjects={deleteObjects}
                        />}
                        <ResultTable
                            rows={rows}
                            checked={checkedList}
                            columns={getVisibleEntityFields(columns)}
                            onCheckedChange={onCheckedChange}
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


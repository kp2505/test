import React, {useCallback, useState} from "react";
import {Input} from "@nlmk/ds/dist/components/Input/Input";
import {Button, Dialog} from "@nlmk/ds/dist/components";
import {factoryTableHeaderInterface} from "../../../interfaces";

interface ModifyDialogProps {
    activeRow: any,
    onClose: () => any,
    columns: factoryTableHeaderInterface[],
    isCreationDialog?: boolean,
    modify: (object: any) => any,
}


export const ModifyDialog: React.FC<ModifyDialogProps> = ({onClose, activeRow, columns, isCreationDialog = false,modify}) => {
    const createFormEntity = (columns: factoryTableHeaderInterface[]) => {
        const formEntity: any = {};
        columns.forEach((column) => {
                formEntity[`${column.name}`] = '';
        })
        return formEntity;
    }

    const formEntity = isCreationDialog ? createFormEntity(columns) : activeRow;
    const [form, setForm] = useState({...formEntity})

    const modifyAndClose = () => {
        modify(form)
        onClose()
    }

    const handleUserInput = useCallback( (event: any) => {
        const bufferFrom = {...form}
        const name = event.target.name;
        const value = event.target.value;
        bufferFrom[`${name}`] = value;
        setForm({...bufferFrom});
    },[form])

    const fields = columns.map(column => {
        return (column.editable || isCreationDialog) ?
            <div className="dialog-field" key={`${column.title}`}>
                <div className="dialog-field-name">{column.title}:</div>
                <Input name={String(column.name)} defaultValue={activeRow[`${column.name}`]} onChange={handleUserInput}/>
            </div> :
            ''
    })

    return (
        <Dialog onClose={() => onClose()}>
            <div className="dialog">
                <h2 className="dialog-title">
                    {isCreationDialog ? 'Создание записи' : 'Редактирование записи'}
                </h2>
                <div className="dialog-fields">
                    {fields}
                </div>
                <div className="dialog-btn-wrap">
                    <Button
                        variant={'contained'}
                        className="btn-danger btn--mr"
                        onClick={() => onClose()}
                    >
                        Отмена
                    </Button>
                    {isCreationDialog ?
                        <Button variant="contained" className="btn-green" onClick={()=> modifyAndClose()}>
                            Создать
                        </Button>
                        :
                        <Button variant="contained" color="primary" onClick={()=> modifyAndClose()}>
                            Редактировать
                        </Button>
                    }
                </div>
            </div>
        </Dialog>
    )
}

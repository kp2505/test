import React from "react";
import {Input} from "@nlmk/ds/dist/components/Input/Input";
import { Button, CompetedSvgIcon, Dialog, Loader, PlusSvgIcon } from "@nlmk/ds/dist/components";

interface LoadingDialogDialogProps {
    isCompleted: boolean,
    setLoadDialogVisible: (visible: boolean) => any,
    setLoading: (loadingStatus: boolean) => any,
    isLoading: boolean
}

export const LoadingDialog: React.FC<LoadingDialogDialogProps> = ({setLoadDialogVisible, isCompleted,isLoading,setLoading}) => {
    return (
        <Dialog onClose={() => setLoadDialogVisible(false)}>
            <div className={isCompleted ? 'dialog-completed' : 'dialog'}>
                <h2 className="dialog-title"> Загрузка данных из CSV </h2>
                {!isLoading && !isCompleted && (
                    <form>
                        <div className="dialog-load-file-wrapper">
                            <Input
                                id="input__file"
                                type="file"
                                className="dialog-load-file"
                            ></Input>
                            <label
                                className="dialog-load-emitter"
                                htmlFor="input__file"
                            >
                                <PlusSvgIcon></PlusSvgIcon>
                                Выбрать CSV файл
                            </label>
                        </div>
                        <div className="dialog-btn-wrap">
                            <Button
                                variant="contained"
                                className="btn-green"
                                onClick={() => setLoading(true)}
                            >
                                Загрузить
                            </Button>
                        </div>
                    </form>
                )}
                {isLoading && (
                    <div className="dialog-loading-block">
                        <Loader />
                        <div className="dialog-loading-name">
                            Пожалуйста ,подождите...
                        </div>
                    </div>
                )}
                {isCompleted && (
                    <div className="dialog-loading-completed">
                        <CompetedSvgIcon className="dialog-loading-completed-icon" />
                        Загрузка завершена
                    </div>
                )}
            </div>
        </Dialog>
    )
}

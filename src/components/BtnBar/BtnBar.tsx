import React from "react";
import {Button, SwapSvgIcon} from "@nlmk/ds/dist/components";
import Filter from "@nlmk/ds/dist/components/Icon/icon/Filter";

interface BtnBarProps {
    isEditBtnDisabled: boolean,
    isDeleteBtnDisabled: boolean,
    setLoadDialogVisible: (e: boolean) => any,
    onEditDialogOpen: () => any,
    onCreateDialogOpen: () => any,
    onDeleteObjects: () => any,
}

export const BtnBar: React.FC<BtnBarProps> = (
    {
        onEditDialogOpen,
        onCreateDialogOpen,
        setLoadDialogVisible,
        isEditBtnDisabled,
        isDeleteBtnDisabled,
        onDeleteObjects,
    })  => {
    return (
        <div className="btn-container">
            <div className="filters-wrap">
                <div className="filters">
                    <Filter />
                    <div className="filters-name">Фильтры</div>
                </div>
                <div className="filters">
                    <SwapSvgIcon />
                    <div className="filters-name">Сортировка</div>
                </div>
            </div>
            <div className="btn-wrapper">
                <div className="btn-wrap btn-wrap--yellow">
                    <Button
                        disabled={!isDeleteBtnDisabled}
                        variant={'contained'}
                        className={isDeleteBtnDisabled ? "btn-yellow" : ''}
                        onClick={() => setLoadDialogVisible(true)}
                    >
                        CSV
                    </Button>
                </div>
                <div className="btn-wrap">
                    <Button
                        disabled={!isDeleteBtnDisabled}
                        variant={'contained'}
                        className={isDeleteBtnDisabled ? "btn-green" : ''}
                        onClick={() => onCreateDialogOpen()}
                    >
                        +
                    </Button>
                </div>
                <div className="btn-wrap">
                    <Button
                        disabled={isDeleteBtnDisabled}
                        variant={'contained'}
                        className={!isDeleteBtnDisabled ? "btn-danger" : ''}
                        onClick={onDeleteObjects}
                    >
                        -
                    </Button>
                </div>
                <div className="btn-wrap">
                    <Button
                        disabled={isEditBtnDisabled}
                        variant={'contained'}
                        color={!isEditBtnDisabled ? 'secondary' : 'default'}
                        onClick={() => onEditDialogOpen()}>
                        Ред.
                    </Button>
                </div>
            </div>
        </div>
    )
}

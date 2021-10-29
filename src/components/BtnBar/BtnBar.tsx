import React from "react";
import {Button, MenuItem, Select, SwapSvgIcon} from "@nlmk/ds/dist/components";
import Filter from "@nlmk/ds/dist/components/Icon/icon/Filter";
import {factoryTableHeaderInterface} from "../../interfaces";
import {ReloadButton} from "../ReloadButton/ReloadButton";


interface BtnBarProps {
    isEditBtnDisabled: boolean,
    isDeleteBtnDisabled: boolean,
    setLoadDialogVisible: (e: boolean) => any,
    onEditDialogOpen: () => any,
    onCreateDialogOpen: () => any,
    onDeleteObjects: () => any,
    onFilterItems: (item: any) => any,
    filterElements: factoryTableHeaderInterface[],
    filterItem: string | undefined,
    isNeedReload: boolean,
    isBarEnabled: boolean,
    reload: () => any,
}

export const BtnBar: React.FC<BtnBarProps> = (
    {
        onEditDialogOpen,
        onCreateDialogOpen,
        setLoadDialogVisible,
        isEditBtnDisabled,
        isDeleteBtnDisabled,
        onDeleteObjects,
        filterElements,
        onFilterItems,
        isNeedReload,
        isBarEnabled,
        reload,
        filterItem
    }) => {
    return (
        <div className="bar-container">
            {isBarEnabled ?
                <div className="btn-container">
                    <div className="filters-wrap">
                        <div className="filters">
                            <Filter/>
                            <div className="filters-name">
                                {
                                    (
                                        <Select
                                            onChange={(e) => onFilterItems(e.target.value)}
                                            label="Фильтровать по"
                                            formControlStyle={{width: '200px'}}
                                            value={filterItem}
                                        >
                                            {
                                                filterElements.map((elem: any) =>
                                                    <MenuItem
                                                        key={`${elem.name}`}
                                                        value={elem.name}
                                                        className='menu-item'
                                                        selected={elem.name === filterItem}
                                                    >
                                                        {elem.title}
                                                    </MenuItem>
                                                )
                                            }
                                        </Select>
                                    )
                                }
                            </div>
                        </div>
                        <div className="filters">
                            <SwapSvgIcon/>
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
                        <div className="btn-wrap">
                            <ReloadButton reload={reload}/>
                        </div>
                    </div>
                </div>
                :
                (isNeedReload &&
                    <ReloadButton reload={reload}/>
                )
            }
        </div>

    )
}

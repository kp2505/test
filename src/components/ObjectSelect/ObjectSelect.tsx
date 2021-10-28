import React from "react";
import {MenuItem, Select} from "@nlmk/ds/dist/components";
import { EntityInterface } from "../../interfaces";

interface ObjectSelectProps {
    objectList: EntityInterface[],
    getRows: (e: any) => any,
}

export const ObjectSelect: React.FC<ObjectSelectProps> = ({objectList, getRows})  => {
    return (
        <Select
            onChange={(e)=>getRows(e.target.value)}
            label="Выберите объект"
            formControlStyle={{ width: '400px' }}

        >
            { objectList.length > 0 && objectList.map((object) =>
                <MenuItem key={`${object.url}`} className='menu-item' value={`${object.name}`}>{object.localizedName}</MenuItem>
            )}
        </Select>
    )
}

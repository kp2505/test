import React from "react";
import {MenuItem, Select} from "@nlmk/ds/dist/components";
import { EntityInterface } from "../../interfaces";

interface ObjectSelectProps {
    objectList: EntityInterface[],
    selectType: (e: any) => any,
}

export const ObjectSelect: React.FC<ObjectSelectProps> = ({objectList, selectType})  => {
    return (
        <Select
            onChange={(e)=>selectType(e)}
            label="Выберите объект"
            formControlStyle={{ width: '400px' }}

        >
            { objectList.length > 0 && objectList.map((object) =>
                <MenuItem key={`${object.url}`} className='menu-item' value={`${object.name}`}>{object.localizedName}</MenuItem>
            )}
        </Select>
    )
}

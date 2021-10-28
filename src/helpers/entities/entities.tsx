import {EntityInterface, IRowsInterface} from "../../interfaces";
import { entitiesInfo } from "../../constants/entityInfo";
import {TableColumn} from "@nlmk/ds/dist/components/Table";

export const getEntity = (id: String): EntityInterface => {
    // @ts-ignore
    const result = entitiesInfo[`${id}`] || entitiesInfo['FACTORY'];
    return result;
}

export const getVisibleEntityFields = (tableHeader:TableColumn<IRowsInterface>[]):any =>{
    return tableHeader.filter((item:any) => !item.invisible)
}

export const getObjectId = (object:IRowsInterface,activeEntity: EntityInterface) => {
    const compositeIdField = activeEntity.compositeIdField;
    if (compositeIdField) {
        const compositeId: any = {},normolizedEntity: any = {};
        Object.entries(activeEntity.fieldByName).forEach(([key, value]) => {
            // @ts-ignore
            const requestValue = object[`${value}`]
            normolizedEntity[`${key}`] = requestValue;
        });
        compositeIdField.forEach((field:String)=>{
            compositeId[`${field}`] = normolizedEntity[`${field}`]
        })

        return compositeId;
    } else {
        return object.id;
    }
}

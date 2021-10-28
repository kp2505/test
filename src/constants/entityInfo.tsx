import {entitiesFieldByName, entitiesUrl, entityHeader, localizedEntityName} from "./entityStructure";


export const entitiesInfo = {
    'WORKSHOP': {
        name: 'WORKSHOP',
        localizedName: localizedEntityName['WORKSHOP'],
        url: entitiesUrl['WORKSHOP'],
        tableHeader: entityHeader['WORKSHOP'],
        fieldByName: entitiesFieldByName['WORKSHOP']
    },
    'FACTORY': {
        name: 'FACTORY',
        localizedName: localizedEntityName['FACTORY'],
        url: entitiesUrl['FACTORY'],
        tableHeader: entityHeader['FACTORY'],
        fieldByName: entitiesFieldByName['FACTORY']
    },
    'MANUFACTURE': {
        name: 'MANUFACTURE',
        localizedName: localizedEntityName['MANUFACTURE'],
        url: entitiesUrl['MANUFACTURE'],
        tableHeader: entityHeader['MANUFACTURE'],
        fieldByName: entitiesFieldByName['MANUFACTURE']
    },
    'WAREHOUSE': {
        name: 'WAREHOUSE',
        localizedName: localizedEntityName['WAREHOUSE'],
        url: entitiesUrl['WAREHOUSE'],
        tableHeader: entityHeader['WAREHOUSE'],
        fieldByName: entitiesFieldByName['WAREHOUSE']
    },
    'BUDGET_STOCK': {
        name: 'BUDGET_STOCK',
        localizedName: localizedEntityName['BUDGET_STOCK'],
        url: entitiesUrl['BUDGET_STOCK'],
        tableHeader: entityHeader['BUDGET_STOCK'],
        fieldByName: entitiesFieldByName['BUDGET_STOCK'],
        compositeIdField:['date','mainWorkshopId','mark','plantId','repairWorkshopId']
    },
    'BUDGET_DEBIT': {
        name: 'BUDGET_DEBIT',
        localizedName: localizedEntityName['BUDGET_DEBIT'],
        url: entitiesUrl['BUDGET_DEBIT'],
        tableHeader: entityHeader['BUDGET_DEBIT'],
        fieldByName: entitiesFieldByName['BUDGET_DEBIT'],
        compositeIdField:['article','mainWorkshopId','mark','period','plantId','repairWorkshopId']
    },
}


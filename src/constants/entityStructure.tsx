import {
    budgetDebitsTableHeader,
    budgetStockTableHeader,
    manufactureTableHeader,
    plantTableHeader,
    warehouseTableHeader,
    workshopTableHeader
} from "./headerStructure";

export const localizedEntityName = {
    'FACTORY': 'Завод',
    'MANUFACTURE': 'Производство',
    'WORKSHOP': 'Цех',
    'WAREHOUSE': 'Склад',
    'BUDGET_STOCK': 'Бюджет запаса',
    'BUDGET_DEBIT': 'Бюджет списания',
}

export const entitiesUrl = {
    'FACTORY': '/plants',
    'MANUFACTURE': '/manufactures',
    'WORKSHOP': '/workshops',
    'WAREHOUSE': '/warehouses',
    'BUDGET_STOCK': '/budget-stocks',
    'BUDGET_DEBIT': '/budget-debits',
}

export const entitiesFieldByName = {
    'FACTORY':
        {
            'name': 'factory',
            'id': 'id',
            'dateUpdated': 'date',
        },
    'MANUFACTURE':
        {
            'id': 'id',
            'updateDate': 'date',
        },
    'WORKSHOP':
        {
            'name': 'mainWorkshop',
            'id': 'id',
            'dateUpdated': 'date',
        },
    'WAREHOUSE':
        {
            'mainWorkshopId': 'mainWorkshop',
            'manufactureId': 'manufacture',
            'plantId': 'factory',
            'repairWorkshopId': 'repairWorkshop',
            'updateTime': 'date',
            'warehouseId': 'id',
        },
    'BUDGET_STOCK':
        {
            'mainWorkshopId': 'mainWorkshop',
            'plantId': 'factory',
            'repairWorkshopId': 'repairWorkshop',
            'mark': 'ratingType',
            'price': 'amount',
            'date': 'creationDate',
            'updateDate': 'date',
            'year': 'year',
            'month': 'month'
        },
    'BUDGET_DEBIT':
        {
            'article': 'name',
            'mainWorkshopId': 'mainWorkshop',
            'repairWorkshopId': 'repairWorkshop',
            'plantId': 'factory',
            'mark': 'ratingType',
            'price': 'amount',
            'period': 'date',
            'year': 'year',
            'month': 'month',
            'pricePerHour': 'pricePerHour'
        },
}

export const entityHeader = {
    'FACTORY': plantTableHeader,
    'MANUFACTURE': manufactureTableHeader,
    'WORKSHOP': workshopTableHeader,
    'WAREHOUSE': warehouseTableHeader,
    'BUDGET_STOCK': budgetStockTableHeader,
    'BUDGET_DEBIT': budgetDebitsTableHeader,
}

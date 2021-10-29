export interface IRowsInterface {
    id: string;
    factory: string;
    mainWorkshop: string;
    repairWorkshop: string;
    ratingType: string;
    date: string;
    creationDate: string;
    amount: string;
    year: string;
    month: string;
    manufacture: string;
    name: string;
    pricePerHour: string;

}

export interface EntityInterface {
    name: String,
    url: string,
    localizedName: string,
    tableHeader?: any,
    fieldByName : any,
    compositeIdField?: any,
}

export interface factoryTableHeaderInterface {
    name: String,
    title: String,
    editable?: boolean,
    invisible?: boolean,
}

export interface requestInterface {
    page: number,
    size: number,
    sort?: string,
}

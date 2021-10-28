export const defaultHeader = [
    {name: 'info', title: 'Информация', editable: false},
]
export const plantTableHeader = [
    {name: 'id', title: 'Завод', editable: false},
    {name: 'factory', title: 'Завод - имя', editable: true},
    {name: 'date', title: 'Дата', editable: true},
]
export const warehouseTableHeader = [
    {name: 'id', title: 'Склад', editable: false},
    {name: 'mainWorkshop', title: 'Основной цех', editable: true},
    {name: 'factory', title: 'Завод', editable: true},
    {name: 'manufacture', title: 'Производство', editable: true},
    {name: 'repairWorkshop', title: 'Ремонтный цех', editable: true},
    {name: 'date', title: 'Дата', editable: true},
]
export const budgetStockTableHeader = [
    {name: 'factory', title: 'Завод ', editable: true},
    {name: 'mainWorkshop', title: 'Основной цех', editable: true},
    {name: 'repairWorkshop', title: 'Ремонтный цех', editable: true},
    {name: 'amount', title: 'Сумма, руб', editable: true},
    {name: 'ratingType', title: 'Вид оценки', editable: true},
    {name: 'creationDate', title: 'Дата создания', editable: true},
    {name: 'date', title: 'Дата', editable: true},
    {name: 'year', title: 'Год', editable: true, invisible:true},
    {name: 'month', title: 'Месяц', editable: true, invisible:true},
]
export const budgetDebitsTableHeader = [
    {name: 'name', title: 'Название', editable: true},
    {name: 'factory', title: 'Завод', editable: true},
    {name: 'mainWorkshop', title: 'Основной цех', editable: true},
    {name: 'repairWorkshop', title: 'Ремонтный цех', editable: true},
    {name: 'ratingType', title: 'Вид оценки', editable: true},
    {name: 'amount', title: 'Сумма, руб', editable: true},
    {name: 'date', title: 'Дата', editable: true},
    {name: 'year', title: 'Год', editable: true, invisible:true},
    {name: 'month', title: 'Месяц', editable: true, invisible:true},
    {name: 'pricePerHour', title: 'Цена за час', editable: true, invisible:true},
]
export const workshopTableHeader = [
    {name: 'id', title: 'Цех', editable: false},
    {name: 'mainWorkshop', title: 'Цех - имя', editable: true},
    {name: 'date', title: 'Дата', editable: true},
]
export const manufactureTableHeader = [
    {name: 'id', title: 'Производство', editable: false},
    {name: 'date', title: 'Дата', editable: true}
]

import {IRowsInterface} from "../../interfaces";
import React from "react";
import {Card, CardContent, Pagination, Table} from "@nlmk/ds/dist/components";
import {TableColumn} from "@nlmk/ds/dist/components/Table";

interface ResultTableProps {
    rows: IRowsInterface[],
    checked: IRowsInterface[],
    columns: TableColumn<IRowsInterface>[],
    onCheckedChange: (e: any) => any,
    onChangePage: (page: number) => any,
    pageCount: number,
}

export const ResultTable: React.FC<ResultTableProps> = (
    {
        rows,
        columns,
        checked,
        onCheckedChange,
        onChangePage,
        pageCount,
    }) => {

    const isPaginationVisible = pageCount > 1;

    return (
        <Card withBoxShadow={true}>
            {rows.length > 0 ?
                (
                    <div>
                        <Table
                            <IRowsInterface>
                            rows={rows}
                            columns={columns}
                            rowsSelection={{
                                checkEnabled: true,
                                checked,
                                onCheckedChange,
                            }}
                            style={{header: {className: 'custom-header-css-class'}}}
                        />
                        {
                            isPaginationVisible && <Card>
                                <CardContent>
                                    <Pagination count={pageCount}
                                                onChange={(event, page) => onChangePage(page-1)}/>
                                </CardContent>
                            </Card>
                        }
                    </div>) :
                <Table rows={[]} columns={columns} noDataMessage="Нет данных по вашему запросу"/>
            }
        </Card>
    )
}

import { IRowsInterface } from "../../interfaces";
import React from "react";
import { Card,Table } from "@nlmk/ds/dist/components";
import {TableColumn} from "@nlmk/ds/dist/components/Table";

interface ResultTableProps {
    rows: IRowsInterface[],
    checked: IRowsInterface[],
    columns: TableColumn<IRowsInterface>[],
    onCheckedChange: (e: any) => any,
}

export const ResultTable: React.FC<ResultTableProps> = ({rows, columns,checked,onCheckedChange})  => {
    return (
        <Card withBoxShadow={true}>
            {rows.length > 0 ?
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
                /> :
                <Table rows={[]} columns={columns} noDataMessage="Нет данных по вашему запросу" />
            }
        </Card>
    )
}

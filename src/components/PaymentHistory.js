import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
    { field: 'monthName', headerName: 'Month', type: 'number' },
    { field: 'year', headerName: 'Year', width: 130 },
    { field: 'rentAmount', headerName: 'Rent', type: 'number', width: 130 },
    { field: 'currentUnit', headerName: 'Current Unit', type: 'number', width: 130 },
    { field: 'prevUnit', headerName: 'Prev Unit', type: 'number', width: 130 },
    {
        field: 'unitConsumed',
        headerName: 'Unit Consumed',
        type: 'number', width: 130
    },
    { field: 'electricBill', headerName: 'Electric Bill', type: 'number', width: 130 },
    { field: 'total', headerName: 'Total', type: 'number', width: 130 },

];

export default function PaymentHistory(props) {
    const { payment } = props;
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={payment} columns={columns} pageSize={5} checkboxSelection />
        </div>
    );
}

import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
    { field: 'monthName', headerName: 'Month' },
    { field: 'total', headerName: 'Total', type: 'number' },
    { field: 'rentAmount', headerName: 'Rent', type: 'number' },
    { field: 'currentUnit', headerName: 'Current Unit', type: 'number' },
    { field: 'prevUnit', headerName: 'Prev Unit', type: 'number' },
    {
        field: 'unitConsumed',
        headerName: 'Unit Consumed',
        type: 'number'
    },
    { field: 'electricBill', headerName: 'Electric Bill', type: 'number' },
    { field: 'year', headerName: 'Year' },

];

export default function PaymentHistory(props) {
    const { payment } = props;
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={payment} columns={columns} pageSize={5} checkboxSelection />
        </div>
    );
}

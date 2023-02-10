import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import clsx from 'clsx';


export default function ContributionsTable() {
  const [pageSize, setPageSize] = React.useState(5);


  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid
        autoHeight 
        disableSelectionOnClick
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        rows={rows}
        columns={columns}
        experimentalFeatures={{ newEditingApi: true }}
        sx={{
          boxShadow: 1,
          border: 1,
          borderColor: 'primary.light',
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.main',
          },
          '& .super-app.low': {
            color: '#f44336',
            fontWeight: '600',
          },
          '& .super-app.average': {
            color: '#ffe607',
            fontWeight: '600',
          },
          '& .super-app.high': {
            color: '#44c949',
            fontWeight: '600',
          },
        }}
      />
    </div>
  );
}

const contribValues = ['Low', 'Average', 'High'];

const columns = [
  { field: 'name', headerName: 'Name', flex: 0.5, editable: false },
  { field: 'contribution', headerName: 'Contribution', 
    type: 'singleSelect',
    flex: 1,
    editable: true,
    valueOptions: contribValues,
    cellClassName: (params) => {
      if (params.value == null) {
        return '';
      }

      return clsx('super-app', {
        low: params.value === 'Low',
        average: params.value === 'Average',
        high: params.value === 'High',
      });
    }, },
  
];

const rows = [
  {
    id: 1,
    name: 'Paco',
    contribution: 'Low',
   
  },
  {
    id: 2,
    name: 'Rubén',
    contribution: 'Average',
   
  },
  {
    id: 3,
    name: 'Daniel',
    contribution: 'High',
   
  },
  
];
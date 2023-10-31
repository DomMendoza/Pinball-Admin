// import * as React from "react";
// import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import { useDemoData } from "@mui/x-data-grid-generator";

// const VISIBLE_FIELDS = ["name", "rating", "country", "dateCreated", "isAdmin"];

// const customData = [
//   {
//     id: 1,
//     name: "John Doe",
//     rating: 4.5,
//     country: "USA",
//     dateCreated: new Date("2023-10-30"),
//     isAdmin: false,
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     rating: 3.8,
//     country: "Canada",
//     dateCreated: new Date("2023-10-28"),
//     isAdmin: true,
//   },
//   // Add more objects as needed
// ];

// export default function BasicExampleDataGrid() {
//   const { data } = useDemoData({
//     dataSet: "Employee",
//     visibleFields: VISIBLE_FIELDS,
//     rowLength: 50,
//   });

//   // Replace the demo data with your custom data
//   data.rows = customData;

//   return (
//     <div className="flex items-center justify-center">
//       <div className="w-[80%] h-[800px] ">
//         <DataGrid {...data} slots={{ toolbar: GridToolbar }} />
//       </div>
//     </div>
//   );
// }

import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { randomTraderName, randomEmail } from "@mui/x-data-grid-generator";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const columns = [
  { field: "id", headerName: "ID", width: 80 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "email", headerName: "Email", width: 150 },
  { field: "age", headerName: "Age", type: "number" },
];

const rows = [
  { id: 1, name: randomTraderName(), email: randomEmail(), age: 25 },
  { id: 2, name: randomTraderName(), email: randomEmail(), age: 36 },
  { id: 3, name: randomTraderName(), email: randomEmail(), age: 19 },
  { id: 4, name: randomTraderName(), email: randomEmail(), age: 28 },
  { id: 5, name: randomTraderName(), email: randomEmail(), age: 23 },
  { id: 6, name: randomTraderName(), email: randomEmail(), age: 27 },
  { id: 7, name: randomTraderName(), email: randomEmail(), age: 18 },
  { id: 8, name: randomTraderName(), email: randomEmail(), age: 31 },
  { id: 9, name: randomTraderName(), email: randomEmail(), age: 24 },
  { id: 10, name: randomTraderName(), email: randomEmail(), age: 35 },
];

export default function QuickFilteringExcludeHiddenColumns() {
  const [filterModel, setFilterModel] = React.useState({
    items: [],
    quickFilterExcludeHiddenColumns: true,
    quickFilterValues: [""],
  });

  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({});

  return (
    <div className="flex items-center justify-center">
      <div className="w-[80%] ">
        <Box sx={{ width: 1 }}>
          <FormControlLabel
            checked={columnVisibilityModel.id !== false}
            onChange={(event) =>
              setColumnVisibilityModel(() => ({ id: event.target.checked }))
            }
            control={<Switch color="primary" size="large" />}
            label="Show ID column"
          />
          <FormControlLabel
            checked={filterModel.quickFilterExcludeHiddenColumns}
            onChange={(event) =>
              setFilterModel((model) => ({
                ...model,
                quickFilterExcludeHiddenColumns: event.target.checked,
              }))
            }
            control={<Switch color="primary" size="large" />}
            label="Exclude hidden columns"
          />
          <Box sx={{ height: 700 }}>
            <DataGrid
              columns={columns}
              rows={rows}
              disableColumnFilter
              disableDensitySelector
              slots={{ toolbar: GridToolbar }}
              filterModel={filterModel}
              onFilterModelChange={(newModel) => setFilterModel(newModel)}
              slotProps={{ toolbar: { showQuickFilter: true } }}
              columnVisibilityModel={columnVisibilityModel}
              onColumnVisibilityModelChange={(newModel) =>
                setColumnVisibilityModel(newModel)
              }
            />
          </Box>
        </Box>
      </div>
    </div>
  );
}

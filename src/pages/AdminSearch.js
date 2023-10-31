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
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";

const VISIBLE_FIELDS = ["name", "rating", "country", "dateCreated", "isAdmin"];

export default function BasicExampleDataGrid() {
  const { data } = useDemoData({
    dataSet: "Employee",
    visibleFields: VISIBLE_FIELDS,
    rowLength: 100,
  });

  return (
    <div className="flex items-center justify-center">
      <div className="w-[80%] h-[800px] ">
        <DataGrid {...data} slots={{ toolbar: GridToolbar }} />
      </div>
    </div>
  );
}

/* eslint-disable */
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { randomTraderName, randomEmail } from "@mui/x-data-grid-generator";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useEffect } from "react";
import { getGameHistory } from "../services/getGameHistory";

import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const columns = [
  { field: "id", headerName: "ID", width: 80 },
  { field: "game_id", headerName: "Game ID", width: 150 },
  { field: "game_history_id", headerName: "History ID", width: 150 },
  { field: "result_data", headerName: "Result", width: 150 },
  { field: "createdAt", headerName: "Created At", width: 150 },
  { field: "updatedAt", headerName: "Updated At", width: 150 },
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

export default function AdminGameHistory() {
  const [filterModel, setFilterModel] = React.useState({
    items: [],
    quickFilterExcludeHiddenColumns: true,
    quickFilterValues: [""],
  });

  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({});
  const [data, setData] = React.useState([]);

  const userToken = Cookies.get("userToken");
  const navigate = useNavigate();
  const { authToken } = useAuth();

  useEffect(() => {
    //CHECK IF THE USER HAS TOKEN
    if (!authToken) {
      // alert("Please check your credentials.");
      navigate("/");
    } else {
      const baseUrl = process.env.REACT_APP_BACKEND_URL;
      const headers = {
        Authorization: `Bearer ${userToken}`,
      };
      axios
        .get(`${baseUrl}/user/check/session`, { headers })
        .then((response) => {
          if (response.status === 200) {
            setUserId(response.data.userSessionDets.user_id);
          } else {
            console.log("User session is not active.");
          }
        })
        .catch((error) => {
          console.error("Error checking user session:", error);
          console.log("Error checking user session.");
        });
    }
  }, []);

  useEffect(() => {
    const getAllData = async () => {
      try {
        const { result } = await getGameHistory();
        setData(result);
        // console.log(userList);
      } catch (error) {
        console.error("Error:", error.message);
        window.alert("An error occurred. Please try again later.");
      }
    };
    getAllData();
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div className="w-[80%] ">
        <h1 className=" w-full text-3xl font-semibold text-center uppercase underline">
          game history table
        </h1>
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
              rows={data}
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

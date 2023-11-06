/* eslint-disable */
import React, { useState, useEffect } from "react";
import OBSWebSocket from "obs-websocket-js";
import Cookies from "js-cookie";
import axios from "axios";

import "../components/style.css";

import StreamInfo from "../components/StreamInfo";
import LiveStreamFrame from "../components/LiveStreamFrame";
import { AdminProvider } from "../context/AdminContext";
import AdminButtons from "../components/AdminButtons";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const AdminPage = () => {
  const obsAddress = "ws://127.0.0.1:4455";
  const obs = new OBSWebSocket();
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

  return (
    <AdminProvider obsAddress={obsAddress} obs={obs}>
      <div className=" h-screen flex flex-col items-center">
        <h1 className=" w-full text-3xl font-semibold text-center mb-5 underline">
          GAME LIVE STREAM MASTER CONTROLLER
        </h1>
        <div className=" flex flex-col ">
          <div className="flex justify-center ">
            <div className="flex justify-center items-center border-2 border-blue-600 w-[45%]">
              <LiveStreamFrame />
            </div>
            <AdminButtons />
          </div>
          <h2 className=" w-full uppercase text-2xl font-bold text-center my-6">
            stream information:{" "}
          </h2>
          <StreamInfo />
        </div>
      </div>
    </AdminProvider>
  );
};

export default AdminPage;

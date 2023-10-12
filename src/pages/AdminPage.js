/* eslint-disable */
import React, { useState, useEffect } from "react";
import OBSWebSocket from "obs-websocket-js";
import NetworkCheckIcon from "@mui/icons-material/NetworkCheck";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import VideoSettingsIcon from "@mui/icons-material/VideoSettings";
import CenterFocusWeakIcon from "@mui/icons-material/CenterFocusWeak";
import { Button } from "@mui/material";
import "../components/style.css";
import {
  Stat,
  Featured,
  FeaturedItem,
  FeaturedTitle,
  FeaturedName,
  Hr,
} from "../components/style";

const AdminPage = () => {
  const obsAddress = "ws://127.0.0.1:4455";
  const obs = new OBSWebSocket();

  const [winningColor, setWinningColor] = useState("");

  const colors = [
    "red",
    "green",
    "yellow",
    "blue",
    "violet",
    "orange",
    "pink",
    "cyan",
    "gold",
  ];
  const [redButton, setRedButton] = useState(false);
  const [greenButton, setGreenButton] = useState(false);
  const [yellowButton, setYellowButton] = useState(false);
  const [blueButton, setBlueButton] = useState(false);
  const [violetButton, setVioletButton] = useState(false);
  const [orangeButton, setOrangeButton] = useState(false);
  const [pinkButton, setPinkButton] = useState(false);
  const [cyanButton, setCyanButton] = useState(false);
  const [goldButton, setGoldButton] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await obs.connect(obsAddress);
        console.log(`Connected to OBS`);

        const buttons = [
          { sceneItemId: 4, sceneItemEnabled: redButton },
          { sceneItemId: 5, sceneItemEnabled: greenButton },
          { sceneItemId: 6, sceneItemEnabled: yellowButton },
          { sceneItemId: 7, sceneItemEnabled: blueButton },
          { sceneItemId: 8, sceneItemEnabled: violetButton },
          { sceneItemId: 9, sceneItemEnabled: orangeButton },
          { sceneItemId: 10, sceneItemEnabled: pinkButton },
          { sceneItemId: 11, sceneItemEnabled: cyanButton },
          { sceneItemId: 12, sceneItemEnabled: goldButton },
        ];

        await Promise.all(
          buttons.map(async (button) => {
            await obs.call("SetSceneItemEnabled", {
              sceneName: "Results n Rewards",
              ...button,
            });
          })
        );
      } catch (error) {
        console.error("Failed to connect", error.code, error.message);
      }
    })();
  }, [
    redButton,
    greenButton,
    yellowButton,
    blueButton,
    violetButton,
    orangeButton,
    pinkButton,
    cyanButton,
    goldButton,
  ]);

  // const onCurrentSceneChanged = (event) => {
  //     console.log('Current scene changed to: ', event.sceneName);
  // };

  const buttonVisibilityHandler = (color) => {
    console.log(color);
    setWinningColor(color);
    const buttonStates = {
      red: setRedButton,
      green: setGreenButton,
      yellow: setYellowButton,
      blue: setBlueButton,
      violet: setVioletButton,
      orange: setOrangeButton,
      pink: setPinkButton,
      cyan: setCyanButton,
      gold: setGoldButton,
    };

    Object.keys(buttonStates).forEach((buttonColor) => {
      buttonStates[buttonColor](buttonColor === color);
    });

    // Set all buttons to false after 5 seconds
    setTimeout(() => {
      Object.keys(buttonStates).forEach((buttonColor) => {
        buttonStates[buttonColor](false);
      });
    }, 5000);
  };

  obs.once("ExitStarted", () => {
    console.log("OBS started shutdown");

    // Just for example, not necessary should you want to reuse this instance by re-connect()
    obs.off("CurrentProgramSceneChanged", onCurrentSceneChanged);
  });

  return (
    <div className=" h-screen flex flex-col items-center">
      <h1 className=" w-full text-3xl font-bold m-16 text-center">
        GAME LIVE STREAM MASTER CONTROLLER
      </h1>
      <div className=" flex flex-col ">
        <div className="flex justify-center ">
          <div>
            <iframe
              className=""
              frameborder="0"
              allowfullscreen
              width="1000"
              height={(1000 / 16) * 9} // 16:9 aspect ratio
              src="https://demo.nanocosmos.de/nanoplayer/embed/1.3.3/nanoplayer.html?group.id=9b1e7c55-1db0-40e9-b443-07f0b5290dd3&options.adaption.rule=deviationOfMean2&startIndex=0&playback.latencyControlMode=classic"
            ></iframe>
          </div>
          <div className=" flex flex-col justify-center">
            <h1 className="m-6 uppercase text-xl font-bold text-center">
              select the winning color to be displated
            </h1>
            <div className="grid grid-cols-4 gap-2 mx-4">
              {colors.map((color, index) => (
                <Button
                  key={index}
                  variant="contained"
                  className={color === "gold" ? "col-span-4" : ""}
                  style={{
                    fontSize: "1.5rem",
                    backgroundColor: color,
                    color: color === "yellow" ? "black" : "white", // Corrected the syntax here
                    height: 75,
                    width: color !== "gold" ? 150 : null,
                  }}
                  onClick={() => buttonVisibilityHandler(color)}
                >
                  {color}
                </Button>
              ))}
            </div>
            <div className="flex justify-center items-center gap-4 m-6 ">
              <h2 className="uppercase font-bold text-md text-center">
                winning color:
              </h2>
              <div
                className="w-32 h-12 rounded-md"
                style={{ backgroundColor: winningColor }}
              ></div>
            </div>
          </div>
        </div>
        <h2 className=" w-full uppercase text-2xl font-bold text-center my-6">
          stream information:{" "}
        </h2>
        <div className="">
          <Stat>
            <Featured className=" flex justify-center items-center">
              <FeaturedItem>
                <VideoSettingsIcon />
                <FeaturedName id="status">Playing</FeaturedName>
                <Hr />
                <FeaturedTitle>Player State</FeaturedTitle>
              </FeaturedItem>
              <FeaturedItem>
                <CenterFocusWeakIcon />
                <FeaturedName id="streamName">Stream-XYZ</FeaturedName>
                <Hr />
                <FeaturedTitle>Current Stream</FeaturedTitle>
              </FeaturedItem>
              <FeaturedItem>
                <AspectRatioIcon />
                <FeaturedName id="resolution">000x000</FeaturedName>
                <Hr />
                <FeaturedTitle>Resolution</FeaturedTitle>
              </FeaturedItem>
              <FeaturedItem>
                <NetworkCheckIcon />
                <FeaturedName id="playLatency">0.00s</FeaturedName>
                <Hr />
                <FeaturedTitle>Play Latency</FeaturedTitle>
              </FeaturedItem>
              <FeaturedItem>
                <AutoAwesomeMotionIcon />
                <FeaturedName id="framerate">0.00fps</FeaturedName>
                <Hr />
                <FeaturedTitle>Framerate</FeaturedTitle>
              </FeaturedItem>
              <FeaturedItem>
                <GraphicEqIcon />
                <FeaturedName id="bitrate">0.000kbps</FeaturedName>
                <Hr />
                <FeaturedTitle>Bitrate</FeaturedTitle>
              </FeaturedItem>
            </Featured>
          </Stat>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

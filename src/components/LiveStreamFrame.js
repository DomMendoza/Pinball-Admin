import React from "react";

function LiveStreamFrame() {
  return (
    <iframe
      className=""
      allow="fullscreen"
      width="1000"
      height={(1000 / 16) * 9} // 16:9 aspect ratio
      // src="https://demo.nanocosmos.de/nanoplayer/embed/1.3.3/nanoplayer.html?group.id=9b1e7c55-1db0-40e9-b443-07f0b5290dd3&options.adaption.rule=deviationOfMean2&startIndex=0&playback.latencyControlMode=classic"
    ></iframe>
  );
}

export default LiveStreamFrame;

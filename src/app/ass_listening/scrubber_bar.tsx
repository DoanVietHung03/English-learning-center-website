import React from 'react';
import ReactAudioPlayer from 'react-audio-player';

function Audio() {
  return (
      <ReactAudioPlayer
        src={"./84_we.mp3"}
        controls
      />
  );
}

export default Audio;
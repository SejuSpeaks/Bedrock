import { useRef, useState } from "react";
import AudioContent from "./AudioContent";
import AudioBar from "./AudioBar";
import PlayPauseButton from "./PlayPauseButton";
//url of song
//maybe array of all songs to play them

import './index.css';

const AudioComponent = ({ songPlaying, isPlaying, setIsPlaying }) => {
    const audioRef = useRef();
    const progressBarRef = useRef();

    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);


    return (
        <div>
            <div className="inner-audio-component">
                <AudioContent songPlaying={songPlaying} audioRef={audioRef} setDuration={setDuration} progressBarRef={progressBarRef} />
                <PlayPauseButton isPlaying={isPlaying} setIsPlaying={setIsPlaying} audioRef={audioRef} songPlaying={songPlaying} progressBarRef={progressBarRef} duration={duration} setProgress={setProgress} />
                <AudioBar songPlaying={songPlaying} progressBarRef={progressBarRef} audioRef={audioRef} progress={progress} duration={duration} />
            </div>
        </div>
    )
}

export default AudioComponent;

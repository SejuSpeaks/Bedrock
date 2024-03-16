import { useEffect, useState, useCallback } from "react"
import { useRef } from "react";
import { formatTime } from "./AudioContent";

const PlayPauseButton = ({ isPlaying, setIsPlaying, audioRef, progressBarRef, duration, setProgress }) => {
    // const [isPlaying, setIsPlaying] = useState(false)
    const playAnimationRef = useRef();

    const repeat = useCallback(() => {
        try {
            const currentTime = audioRef.current.currentTime
            setProgress(formatTime(currentTime))
            progressBarRef.current.value = currentTime;
            playAnimationRef.current = requestAnimationFrame(repeat);
        } catch (error) {
            console.log(error)
            console.log('No Audio File')
        }

    });

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play()
        }
        else {
            audioRef.current.pause()
        }
        playAnimationRef.current = requestAnimationFrame(repeat)

        return () => { cancelAnimationFrame(playAnimationRef.current); }
    }, [isPlaying, audioRef, repeat])

    return (
        <div>
            <div className="play-button-container">
                {!isPlaying && (<><svg onClick={() => setIsPlaying(true)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 22v-20l18 10-18 10z" /></svg></>)}
                {isPlaying && (<><svg onClick={() => setIsPlaying(false)} xmlns="http://www.w3.org/2000/svg" width="30" height="24" viewBox="0 0 24 24"><path d="M11 22h-4v-20h4v20zm6-20h-4v20h4v-20z" /></svg></>)}
            </div>
        </div>
    )
}

export default PlayPauseButton;

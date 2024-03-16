
export const formatTime = (time) => {
    if (time && !isNaN(time)) {
        const minutes = Math.floor(time / 60);
        const formatMinutes =
            minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(time % 60);
        const formatSeconds =
            seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${formatMinutes}:${formatSeconds}`;
    }
    return '00:00';
};

const AudioContent = ({ songPlaying, audioRef, setDuration, progressBarRef }) => {


    const onLoadedMetadata = () => {
        const seconds = audioRef.current.duration
        const songDuration = formatTime(seconds)
        setDuration(songDuration)
        progressBarRef.current.max = seconds
    }

    return (
        <audio ref={audioRef} src={songPlaying.url} onLoadedMetadata={onLoadedMetadata} />
    )
}


export default AudioContent


import './index.css'

const AudioBar = ({ songPlaying, progressBarRef, audioRef, duration, progress }) => {

    const drag = () => {
        audioRef.current.currentTime = progressBarRef.current.value;
    }

    return (
        <div className="progress">
            <div className='time-stamps-songs'>
                <span style={{ marginRight: "10px" }}>{songPlaying.name}</span>
                <span className="time current">{progress}</span>
                /
                <span className="time">{duration}</span>
            </div>
            <input className='range' onChange={() => drag()} type="range" ref={progressBarRef} defaultValue={0} />
        </div>
    )
}

export default AudioBar;

import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import WaveSurfer from 'wavesurfer.js'

import './index.css'

const AudioPlayer = ({ album, isPlaying, setIsPlaying }) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const containerRef = useRef()
    console.log(isPlaying, 'IS ALBUM PLAYING')
    const audio = album ? album.songs[0] : "nothing"
    console.log(audio)

    const waveSurferRef = useRef({
        isPlaying: () => false,
    })

    useEffect(() => {
        const waveSurfer = WaveSurfer.create({
            container: containerRef.current,
            responsive: true,
            cursorWidth: 0,
            barWidth: 1,
            barHeight: 0.3,
        })
        waveSurfer.load(audio.url)
        waveSurfer.on('ready', () => {
            waveSurferRef.current = waveSurfer
        })

        return () => {
            waveSurfer.destroy()
        }

    }, [audio])


    return (
        <div>
            <div className='button-album-details-container'>
                {album && (
                    <div>
                        <p>{audio.name}</p>
                        <p>from {album.title}</p>
                        <p>by {album.artist_username}</p>
                    </div>
                )}

                <div>
                    <button
                        className='play-button-audio-player'
                        onClick={() => {
                            waveSurferRef.current.playPause()
                            setIsPlaying(waveSurferRef.current.isPlaying())
                        }}
                        type="button"
                    >
                        {isPlaying ? <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M10 24h-6v-24h6v24zm10 0h-6v-24h6v24zm-11-23h-4v22h4v-22zm10 0h-4v22h4v-22z" /></svg> : <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M23 12l-22 12v-24l22 12zm-21 10.315l18.912-10.315-18.912-10.315v20.63z" /></svg>}
                    </button>
                </div>

            </div>
            <div className='audio-waveform-audio-componenet' ref={containerRef}></div>
        </div>
    );

    AudioPlayer.propTypes = {
        audio: PropTypes.string.isRequired,
    }
}

export default AudioPlayer;

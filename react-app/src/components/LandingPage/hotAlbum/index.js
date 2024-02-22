import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAlbumsByTag, fetchAllAlbums } from '../../../store/albums'
import { useHistory } from "react-router-dom";

import './index.css'
import AudioPlayer from "../../AudioPlayer/AudioPlayer";
const HotAlbum = ({ selectedtab, selectedAlbum, isPlaying, setIsPlaying }) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const history = useHistory();
    const dispatch = useDispatch()
    const scrollRef = useRef(null)

    useEffect(() => {

        if (selectedtab == 'all genres') {
            dispatch(fetchAllAlbums()).then(() => setIsLoaded(true))
        }
        else {
            dispatch(fetchAlbumsByTag(selectedtab))
                .then(() => setIsLoaded(true))
        }

    }, [selectedtab])


    const handleWheel = (event) => {
        const { current } = scrollRef;

        if (current && event.deltaY > 0) {
            current.scrollBy(0, 10);

        }
    };


    return (

        <div>
            {isLoaded && (
                <>
                    <div className='hot-album-container' ref={scrollRef} onWheel={(e) => handleWheel(e)}>
                        <img className="hot-album-album-cover" src={selectedAlbum?.cover} />
                        <div>
                            <AudioPlayer album={selectedAlbum} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
                            {/* <audio controls src={hotAlbum?.songs[0].url}></audio> */}
                        </div>

                        <div className="hot-albums-buttons-container">
                            <button onClick={() => history.push(`/artists/${selectedAlbum.artist_id}/albums/${selectedAlbum.id}`)} id="go-to-album-button">Go to album</button>
                            <button onClick={() => history.push(`/artists/${selectedAlbum.artist_id}/albums/`)} className="hot-album-wishlist-button" type="button">
                                {/* <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="16"
                                    height="16"
                                    stroke='black'
                                    fill='none'
                                >
                                    <path
                                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                    />
                                </svg> */}
                                Artist Albums
                            </button>

                        </div>

                        <div>

                        </div>
                    </div>
                    <div className="space-under-hot-album">

                    </div>


                </>
            )}
        </div>
    );
}

export default HotAlbum;

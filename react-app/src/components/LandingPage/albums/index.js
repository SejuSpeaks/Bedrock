import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAlbumsByTag, fetchAllAlbums } from "../../../store/albums";
import { useHistory } from "react-router-dom";

import './index.css'

const Albums = ({ selectedtab, setSelectedAlbum, selectedAlbum }) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const history = useHistory();
    const albums = useSelector(state => state.albums)
    const dispatch = useDispatch()
    const scrollRef = useRef(null)

    useEffect(() => {

        if (selectedtab == 'all genres') {
            dispatch(fetchAllAlbums()).then((res) => setSelectedAlbum(Object.values(res)[0])).then(() => setIsLoaded(true))
        }
        else {
            dispatch(fetchAlbumsByTag(selectedtab)).then((res) => setSelectedAlbum(Object.values(res)[0])).then(() => setIsLoaded(true))
        }

    }, [selectedtab, selectedAlbum])

    const albumClicked = (artist_id, album_id) => {
        history.push(`artists/${artist_id}/albums/${album_id}`)
    }

    const allAlbums = Object.values(albums).map(album => {
        return (
            <div className="landing-page-album-container" key={album.id} onClick={() => albumClicked(album.artist_id, album.id)}>
                <div className="image-and-play-button">
                    <img className="landing-page-album-img" src={album.cover} />
                    <button onClick={(e) => {
                        e.stopPropagation()
                        setSelectedAlbum({ ...album })
                    }}
                        className="landing-page-album-img-buttons">
                        <i class="fa-solid fa-play"></i>
                    </button>
                </div>
                <p className="landing-page-album-title">{album.title} <br /> by {album.artist_username}</p>
            </div>
        );
    })

    const handleWheel = (event) => {
        const { current } = scrollRef;

        // If the user scrolls up (negative deltaY), scroll the content down
        if (current && event.deltaY > 0) {
            current.scrollBy(0, 10);
            // event.preventDefault()
        }
    };



    return (
        <div className="landing-page-albums-page-container">
            {isLoaded && (
                <>
                    <div ref={scrollRef} onWheel={(e) => handleWheel(e)} className="landing-page-album-list-container">
                        {allAlbums}
                    </div>
                </>
            )}
        </div>
    );
}

export default Albums;

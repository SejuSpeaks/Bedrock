

//dispatch album details
//artist all albums
//artist location
//artist name
//album images
//songs

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetAlbum } from "../../store/albums";
import { useParams } from "react-router-dom";

import './index.css'
import ProfileHeader from "../ProfileHeader";

const AlbumDetails = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [songPlaying, setSongPlaying] = useState('')
    const { albumid } = useParams()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user.info)
    const album = useSelector(state => state.albums[albumid])

    useEffect(() => {
        dispatch(fetchGetAlbum(albumid))
            .then(() => setIsLoaded(true))
    }, [dispatch])


    const allSongs = isLoaded && album?.songs.map(song => {
        return (
            <div className="album-details-song-container">
                <button onClick={() => setSongPlaying(song.url)}>Play</button>
                <p>{song.name}</p>
            </div>
        );
    })

    return (
        <div className="album-details-page-container">
            {isLoaded &&
                <>
                    <div className="album-images-container">
                        <img src="example.com" alt="album visual" />
                        <audio controls src={songPlaying} />
                    </div>

                    <div className="album-details-container">
                        <div>
                            <p>{album.details.title}</p>
                            <p>by {user.artist_name}</p>
                            <img className='album-form-image' src={album.details.cover} />
                            <p>Wishlist</p>
                        </div>


                        <div>
                            <p>{allSongs}</p>
                        </div>
                    </div>

                    <div>
                        <ProfileHeader />
                    </div>
                </>
            }
        </div>
    );
}

export default AlbumDetails;

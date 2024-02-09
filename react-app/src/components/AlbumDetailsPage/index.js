

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

const AlbumDetails = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const { albumid } = useParams()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const album = useSelector(state => state.albums[albumid])

    const allSongs = album.songs.map(song => {
        return (
            <div className="album-details-song=-container">
                <button>Play</button>
                <p>{song.name}</p>
            </div>
        );
    })

    useEffect(() => {
        dispatch(fetchGetAlbum(albumid))
            .then(() => setIsLoaded(true))
    }, [dispatch])

    return (
        <div>
            {isLoaded &&
                <>
                    <div className="album-images-container">
                        <img src={album.details.cover} alt="album visual" />
                    </div>

                    <div className="album-details-container">
                        <div>
                            <p>{album.details.title}</p>
                            <p>by {user.artist_name}</p>
                            <img src="albumcover.com" alt="album cover" />
                            <p>Wishlist</p>
                        </div>


                        <div>
                            <p>{allSongs}</p>
                        </div>
                    </div>
                </>
            }
        </div>
    );
}

export default AlbumDetails;

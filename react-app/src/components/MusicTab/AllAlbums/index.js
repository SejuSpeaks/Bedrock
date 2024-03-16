import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { fetchGetArtist } from "../../../store/artist";


const AllAlbums = () => {

    const [isLoaded, setIsLoaded] = useState(false)
    const { artistid } = useParams()

    const albums = useSelector(state => state.artist.albums)

    const dispatch = useDispatch()
    const history = useHistory();

    useEffect(() => {
        dispatch(fetchGetArtist(artistid))
            .then(() => setIsLoaded(true))
    }, [dispatch])


    const allAlbums = isLoaded && Object.values(albums).map(album => {
        return (
            <div key={album.id} onClick={() => history.push(`/artists/${artistid}/albums/${album.id}`)} className="music-tab-album-info-container">
                <div className="album-cover-wrapper-all-albums">
                    <img className="music-tab-album-display" src={album.cover} />
                </div>
                <p>{album.title}</p>
            </div>
        );
    })

    return (

        <div>
            {isLoaded && (
                <div className="all-albums-container">
                    {allAlbums}
                </div>
            )}
        </div>
    );
}

export default AllAlbums;

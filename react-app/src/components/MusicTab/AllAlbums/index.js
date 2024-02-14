import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { fetchGetArtist } from "../../../store/artist";


const AllAlbums = () => {

    const [isLoaded, setIsLoaded] = useState(false)
    const { artistid } = useParams()

    const albums = useSelector(state => state.artist.albums)
    console.log(albums, 'albums from arttist state')

    const dispatch = useDispatch()
    const history = useHistory();

    useEffect(() => {
        dispatch(fetchGetArtist(artistid))
            .then(() => setIsLoaded(true))
    }, [dispatch])


    const allAlbums = isLoaded && Object.values(albums).map(album => {
        return (
            <div key={album.id} onClick={() => history.push(`/artists/${artistid}/albums/${album.id}`)} className="music-tab-album-info-container">
                <img className="music-tab-album-display" src={album.cover} />
                <p>{album.title}</p>
            </div>
        );
    })

    return (

        <div>
            {isLoaded && (
                <div className="music-tab-page-container">
                    {allAlbums}
                </div>
            )}
        </div>
    );
}

export default AllAlbums;

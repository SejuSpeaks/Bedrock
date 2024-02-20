import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { fetchGetArtist } from "../../../store/artist";


const AllAlbums = () => {

    const [isLoaded, setIsLoaded] = useState(false)
    const { artistid } = useParams()

    const albums = useSelector(state => state.artist.albums)
<<<<<<< HEAD
<<<<<<< HEAD
    console.log(albums, 'albums from arttist state')
=======
>>>>>>> 207fad1617ac56749c0160b847c7270a1a1343a3
=======
>>>>>>> 7b101935324880b3d94c82a8fe5a306252da7140

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

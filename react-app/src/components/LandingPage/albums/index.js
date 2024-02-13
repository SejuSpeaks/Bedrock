import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAlbumsByTag, fetchAllAlbums } from "../../../store/albums";
import { useHistory } from "react-router-dom";



const Albums = ({ selectedtab }) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const history = useHistory();
    const albums = useSelector(state => state.albums)
    const dispatch = useDispatch()

    useEffect(() => {

        if (selectedtab == 'all genres') {
            dispatch(fetchAllAlbums()).then(() => setIsLoaded(true))
        }
        else {
            dispatch(fetchAlbumsByTag(selectedtab))
                .then(() => setIsLoaded(true))
        }

    }, [selectedtab])

    const albumClicked = (artist_id, album_id) => {
        history.push(`artists/${artist_id}/albums/${album_id}`)
    }

    const allAlbums = Object.values(albums).map(album => {
        return (
            <div onClick={() => albumClicked(album.artist_id, album.id)}>
                <img src={album.cover} />
            </div>
        );
    })

    return (
        <div>
            {isLoaded && (
                <div>
                    {allAlbums}
                </div>
            )}
        </div>
    );
}

export default Albums;

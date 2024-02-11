import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAlbumsByTag, fetchAllAlbums } from "../../../store/albums";



const Albums = ({ selectedtab }) => {
    const [isLoaded, setIsLoaded] = useState(false)
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

    const allAlbums = Object.values(albums).map(album => {
        return (
            <div>
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

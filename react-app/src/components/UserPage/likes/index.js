
import { useDispatch, useSelector } from "react-redux";
import { fetchGetLikes } from "../../../store/albumLikes";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import './index.css'


const Likes = () => {

    const [isLoaded, setIsLoaded] = useState(false)
    const userLoggedIn = useSelector(state => state.session.user)
    const likes = useSelector(state => state.albumLikes)

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        if (!userLoggedIn) return history.push('/')

        dispatch(fetchGetLikes())
            .then(() => setIsLoaded(true))
    }, [])

    const allAlbums = isLoaded && Object.values(likes).map(like => {
        return (
            <div onClick={() => history.push(`/artists/${like.artist_id}/albums/${like.id}`)} key={like.id}>
                <img className="album-image" src={like.cover} />
                <p>{like.title}</p>
            </div>
        )
    })

    return (
        <div>
            {isLoaded && (<>
                <div className="all-likes-container">
                    {allAlbums}
                </div>
            </>)}
        </div>
    );
}

export default Likes;

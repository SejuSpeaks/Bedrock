import { useEffect, useState } from "react";
import { fetchGetArtist } from "../../store/artist";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";


const FollowWall = () => {
    const { artistid } = useParams()
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()

    const artist = useSelector(state => state.artist)

    useEffect(() => {
        dispatch(fetchGetArtist(artistid))
            .then(() => setIsLoaded(true))
    }, [dispatch])

    return (
        <div>
            {isLoaded && (<>
                <p>
                    Follow {artist.artist_name} to join the conversation.<br />
                    When you follow {artist.artist_name},<br />
                    you’ll get access to exclusive messages from the artist and comments from fans.
                </p>
            </>)}
        </div>
    )
}

export default FollowWall;

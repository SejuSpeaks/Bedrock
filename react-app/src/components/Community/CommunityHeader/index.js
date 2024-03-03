import { useParams } from "react-router-dom";
import { fetchGetArtist } from "../../../store/artist";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkFollow } from "../followArtist";

import './index.css';

const CommunityHeader = ({ isFollowing, setIsFollowing, followArtist }) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const { artistid } = useParams();
    const dispatch = useDispatch();

    const artist = useSelector(state => state.artist)

    const followConditional = isFollowing ? "Following" : "Follow"

    useEffect(() => {
        dispatch(fetchGetArtist(artistid))
            .then(() => setIsLoaded(true))
    }, [dispatch, artistid])

    return (
        <div className="community-header-whole">
            {isLoaded && (<>
                <img className="community-header-profile-picture" src={artist.profile_picture} />
                <p>{artist.artist_name}</p>
                <p>Location</p>
                <button onClick={() => followArtist(isFollowing, setIsFollowing, artistid)}>{followConditional}</button>
                <p style={{ width: '40%' }}>{artist.bio}</p>
            </>)}
        </div>
    )
}

export default CommunityHeader;

import { useEffect, useState } from "react";
import { followArtist, checkFollow } from "./followArtist";
import CommunityHeader from "./CommunityHeader";
import CommunityPosts from "./CommunityPosts";
import ArtistPageNav from "../Navs/ArtistPageNav";
import ProfileHeader from '../ProfileHeader'
import PostModal from "./PostModal";
import { fetchGetArtist } from "../../store/artist";
import OpenModalButton from "../OpenModalButton"
import FollowWall from "./FollowWall";
import { useParams } from "react-router-dom";

import './index.css';
import { useSelector } from "react-redux";

const Community = () => {
    const { artistid } = useParams()
    const [posted, setIsPosted] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const [isFollowing, setIsFollowing] = useState(false)

    const artist = useSelector(state => state.artist)
    const user = useSelector(state => state.session.user)

    const validateUser = () => {
        if (!user) return false
        if (artist.community_id === user.community_id || isFollowing) return true
        else return false;
    }

    useEffect(() => {
        checkFollow(setIsFollowing, artistid)
            .then(() => fetchGetArtist(artistid))
            .then(() => setIsLoaded(true))
    }, [isFollowing, posted])

    return (
        <div className="community-page-whole-fr" >
            {isLoaded && (<>

                <div className="community-page-whole">

                    <div className="post-modal-community-posts-container">
                        <ArtistPageNav />
                        {!isFollowing && !validateUser() && <FollowWall />}
                        <PostModal artist={artist} setIsPosted={setIsPosted} isFollowing={isFollowing} />
                        <CommunityPosts posted={posted} isFollowing={isFollowing} />
                    </div>

                    {/* <div>
                        <ProfileHeader followArtist={followArtist} followsArtist={isFollowing} setIsFollowing={setIsFollowing} />
                    </div> */}

                </div>

                {/* <OpenModalButton modalComponent={<PostModal />} buttonText={"Post"} className={"post-button"}></OpenModalButton> */}
            </>)}
        </div>
    )
}

export default Community;

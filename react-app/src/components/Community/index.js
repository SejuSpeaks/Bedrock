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

    useEffect(() => {
        checkFollow(setIsFollowing, artistid)
            .then(() => fetchGetArtist(artistid))
            .then(() => setIsLoaded(true))
    }, [isFollowing, posted])

    return (
        <div >
            {isLoaded && (<>
                <ArtistPageNav />

                <div className="community-page-whole">

                    <div>
                        {!isFollowing && <FollowWall />}
                        <PostModal artist={artist} setIsPosted={setIsPosted} />
                        <CommunityPosts posted={posted} isFollowing={isFollowing} />
                    </div>

                    <div>
                        <ProfileHeader followArtist={followArtist} followsArtist={isFollowing} setIsFollowing={setIsFollowing} />
                        {/* <CommunityHeader isFollowing={isFollowing} setIsFollowing={setIsFollowing} followArtist={followArtist} /> */}
                    </div>
                </div>

                {/* <OpenModalButton modalComponent={<PostModal />} buttonText={"Post"} className={"post-button"}></OpenModalButton> */}
            </>)}
        </div>
    )
}

export default Community;

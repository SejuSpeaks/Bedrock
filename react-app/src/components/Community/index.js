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
import Navigation from "../Navs/Navigation";

const Community = ({ lastScrollY, setLastScrollY, setShowHeader, showHeader }) => {
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
        if (isLoaded) {
            const scrollableElement = document.querySelector('.community-page-whole');

            const handleScroll = (scrollableElement, setShowHeader) => {
                const currWindowScroll = scrollableElement.scrollTop;
                console.log(currWindowScroll)

                if (currWindowScroll > lastScrollY) {
                    setShowHeader(false)

                }
                else {
                    setShowHeader(true)
                }
                setLastScrollY(currWindowScroll)
            }

            scrollableElement.addEventListener('scroll', () => handleScroll(scrollableElement, setShowHeader));

            return () => {
                scrollableElement.removeEventListener('scroll', handleScroll);
            };
        }
    }, [isLoaded, lastScrollY]);


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
                        <div className="nav-container-posts">
                            <ArtistPageNav />
                        </div>


                        {!isFollowing && !validateUser() && <FollowWall />}
                        <PostModal artist={artist} setIsPosted={setIsPosted} isFollowing={isFollowing} />
                        <CommunityPosts posted={posted} isFollowing={isFollowing} lastScrollY={lastScrollY} setLastScrollY={setLastScrollY} setShowHeader={setShowHeader} showHeader={showHeader} />
                    </div>
                </div>

            </>)}
        </div>
    )
}

export default Community;

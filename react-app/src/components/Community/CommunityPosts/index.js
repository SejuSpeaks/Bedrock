import { fetchAllPosts } from "../../../store/posts";
import { fetchGetArtist } from "../../../store/artist";
import { useEffect, useRef, useState } from "react";
import { findLike, pressedHeart } from "../PostModal/post-utils";
import { useDispatch, useSelector } from "react-redux";
// import { handleScroll } from "./utils/handleScroll";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

import './index.css';
import Post from "../Feed/post";
import { handleScroll } from "./utils/handleScroll";
import { handle } from "express/lib/application";


const CommunityPosts = ({ isFollowing, posted, lastScrollY, setLastScrollY, setShowHeader, showHeader }) => {
    console.log(showHeader)
    const { artistid } = useParams()
    const [isLoaded, setIsLoaded] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const bodyRef = useRef();

    const posts = useSelector(state => state.posts)
    const artist = useSelector(state => state.artist)
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(fetchGetArtist(artistid))
            .then((artist) => dispatch(fetchAllPosts(artist.community_id)))
            .then(() => setIsLoaded(true))
            .then(() => setIsLoading(false))

    }, [dispatch, posted])



    const userValidation = () => {
        if (!user) return false
        if (artist.community_id === user.community_id || isFollowing) return true
        else return false;
    }

    const allPosts = Object.values(posts).map(post => {
        let images;
        if (post.post_images && post.post_images.length) {
            images = post.post_images
        }

        return (
            <Post post={post} images={images} />
        )
    })

    return (
        <div className="all-posts-container-whole-page">
            {isLoading && <><div className="loader"></div></>}

            {isLoaded && userValidation() && (<>
                <div ref={bodyRef} className="all-posts-container">
                    {allPosts}
                </div>
            </>)}
        </div>
    );
}

export default CommunityPosts;

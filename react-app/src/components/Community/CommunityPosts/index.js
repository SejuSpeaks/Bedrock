import { fetchAllPosts } from "../../../store/posts";
import { fetchGetArtist } from "../../../store/artist";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { handleScroll } from "./utils/handleScroll";
import { useParams, useHistory } from "react-router-dom";

import './index.css';
import Post from "../Feed/post";
import { handleScroll } from "./utils/handleScroll";


const CommunityPosts = ({ isFollowing, posted }) => {
    const { artistid } = useParams()
    const [isLoaded, setIsLoaded] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const history = useHistory();
    const bodyRef = useRef();

    const posts = useSelector(state => state.posts)
    const artist = useSelector(state => state.artist)
    const user = useSelector(state => state.session.user)

    //FETCHING DATA SETTING LOADING STATES
    useEffect(() => {
        dispatch(fetchGetArtist(artistid))
            .then((artist) => dispatch(fetchAllPosts(artist.community_id)))
            .then(() => setIsLoaded(true))
            .then(() => setIsLoading(false))

    }, [dispatch, posted])


    useLayoutEffect(() => {
        if (!isLoading) {
            console.log('session sotrage item', sessionStorage.getItem("scrollposition"))
            window.scrollTo(0, sessionStorage.getItem('scrollposition'))
        }
    }, [isLoading])




    const postClicked = (post) => {
        history.push(`/artists/${artist.id}/community/${post.id}/`)
        sessionStorage.setItem("scrollposition", window.scrollY)
        return
    }


    //VALIDATE USER IS LOGGED IN AND BELONGS TO COMMUNITY
    const userValidation = () => {
        if (!user) return false
        if (artist.community_id === user.community_id || isFollowing) return true
        else return false;
    }

    //MAP OF ALL POSTS MAKING A POST INSTANCE FOR EACH
    //ex:[POST,POST,POST,]
    const allPosts = Object.values(posts).map((post, index) => {
        let images;
        if (post.post_images && post.post_images.length) {
            images = post.post_images
        }

        return (
            <div key={index} onClick={() => postClicked(post)}>
                <Post post={post} images={images} />
            </div>
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

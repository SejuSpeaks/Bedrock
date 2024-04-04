import { useDispatch, useSelector } from "react-redux";
import ProfileHeader from "../../ProfileHeader";
import ArtistPageNav from "../../Navs/ArtistPageNav";
import { useEffect, useState } from "react";
import { fetchGetAPost } from "../../../store/posts";
import { useParams } from "react-router-dom";
import { fetchGetArtist } from "../../../store/artist";

import './index.css'
import Comments from "../Comments";

const PostDetails = ({ posts }) => {
    const { artistid, postid } = useParams()
    const dispatch = useDispatch()

    const [isLoaded, setIsLoaded] = useState(false)

    let artist = useSelector(state => state.artist)
    const post = useSelector(state => state.posts)


    useEffect(() => {
        dispatch(fetchGetArtist(artistid))
            .then((res) => dispatch(fetchGetAPost(res.community_id, postid)))
            .then(() => setIsLoaded(true))
    }, [])


    return (
        <div className="post-details-page">
            <div className="post-details-nav-bar-div">
                <ArtistPageNav />
            </div>
            {isLoaded && (
                <div className="post-details-continaer">
                    <div className="post-details-post-container">
                        <div className="post-details-inner">
                            <div className="post-details-post-container-header">
                                <div className="picture-and-at-container">
                                    <div className="post-details-profile-picture-container">
                                        <img className='post-profile-picture' src={post.owner_profile_picture} />
                                    </div>
                                    <div>
                                        <p>{post.owner_username}</p>
                                        <p className="user_at">@{post.owner_at}</p>
                                    </div>
                                </div>

                                <div className="menu-button">
                                    <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" height={20} width={20} stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m16.5 11.995c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25zm-6.75 0c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25zm-6.75 0c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25z" /></svg>
                                </div>

                            </div>
                            <div className="post-details-content">
                                <p>{post.text}</p>
                                <img className="post-details-image" src={post.post_images.length ? post.post_images[0].url : ""} />
                            </div>
                        </div>
                    </div>
                    <Comments artist={artist} />
                </div>
            )}

        </div>
    );
}

export default PostDetails;

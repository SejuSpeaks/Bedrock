import { useDispatch, useSelector } from "react-redux";
import ProfileHeader from "../../ProfileHeader";
import ArtistPageNav from "../../Navs/ArtistPageNav";
import { useEffect, useState } from "react";
import UpdateDeletePost from "./UpdateDeletePost";
import { fetchGetAPost } from "../../../store/posts";
import { useParams } from "react-router-dom";
import { fetchGetArtist } from "../../../store/artist";

import './index.css'
import Comments from "../Comments";
import { useHistory } from "react-router-dom";

const PostDetails = ({ posts }) => {
    const { artistid, postid } = useParams()
    const [changed, setChanged] = useState(false);
    const dispatch = useDispatch()
    const history = useHistory();

    const [isLoaded, setIsLoaded] = useState(false)

    let artist = useSelector(state => state.artist)
    const post = useSelector(state => state.posts)


    useEffect(() => {
        dispatch(fetchGetArtist(artistid))
            .then((res) => dispatch(fetchGetAPost(res.community_id, postid)))
            .then(() => setIsLoaded(true))
    }, [changed])

    const backButtonPressed = () => {

    }


    return (
        <div className="post-details-page">


            {isLoaded && (

                <div className="post-details-continaer">

                    <div className="post-details-nav-bar-div">
                        <ArtistPageNav />
                    </div>

                    <div className="post-details-post-container">


                        <div className="post-details-inner">
                            {/* post header */}
                            <div className="post-header-back-button">
                                <div className="post-header-inner">
                                    <div className="back-arrow-container-post">
                                        <svg onClick={() => history.push(`/artists/${artist.id}/community`)} width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z" /></svg>
                                    </div>
                                    <p className="post-header-heading">Post</p>
                                </div>
                            </div>

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
                                <UpdateDeletePost post={post} setChanged={setChanged} />
                            </div>

                            <div className="post-details-content">
                                <p className="post-text">{post.text}</p>
                                <img className="post-details-image" src={post.post_images.length ? post.post_images[0].url : ""} />
                            </div>

                        </div>

                    </div>

                    <div className="comments-container-post-details">
                        <Comments artist={artist} />
                    </div>

                </div>
            )}

        </div>
    );
}

export default PostDetails;

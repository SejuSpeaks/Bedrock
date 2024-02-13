import { useDispatch, useSelector } from "react-redux";
import ProfileHeader from "../ProfileHeader";
import { useEffect, useState } from "react";
import { fetchGetAPost } from "../../store/posts";
import { useParams } from "react-router-dom";


const PostDetails = ({ posts }) => {
    const { postid } = useParams()
    const dispatch = useDispatch()

    const [isLoaded, setIsLoaded] = useState(false)

    const artist = useSelector(state => state.artist)
    const post = useSelector(state => state.posts[postid])

    console.log('POST', post)

    useEffect(() => {
        // dispatch(fetchGetAPost(artist.community_id, postid))
        //     .then(() => setIsLoaded(true))
    }, [])


    return (
        <div>

            <div className="post-details-post-container">
                <div className="post-details-post-container-header">
                    <img src={post.owner_profile_picture} />
                    <p>{post.owner_username}</p>
                </div>
                <div className="post-details-content">
                    <p>{post.text}</p>
                </div>
            </div>

        </div>
    );
}

export default PostDetails;

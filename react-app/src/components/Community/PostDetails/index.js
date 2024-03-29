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
        <div>
            <ArtistPageNav />
            {isLoaded && (
                <div className="post-details-continaer">
                    <div className="post-details-post-container">
                        <div>

                            <div className="post-details-post-container-header">
                                <img className='post-profile-picture' src={post.owner_profile_picture} />
                                <p>{post.owner_username}</p>
                            </div>
                            <div className="post-details-content">
                                <p>{post.text}</p>
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

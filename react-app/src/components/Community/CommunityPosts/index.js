import { fetchAllPosts } from "../../../store/posts";
import { fetchGetArtist } from "../../../store/artist";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import './index.css';

const CommunityPosts = ({ isFollowing, posted }) => {
    const { artistid } = useParams()
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch();

    const posts = useSelector(state => state.posts)

    useEffect(() => {
        dispatch(fetchGetArtist(artistid))
            .then((artist) => dispatch(fetchAllPosts(artist.community_id)))
            .then(() => setIsLoaded(true))
    }, [dispatch, posted])


    const allPosts = Object.values(posts).map(post => {
        let images;
        if (post.post_images.length) {
            images = post.post_images
        }

        return (
            <div className="post-box" key={post.id}>

                <div>
                    <img className="post-profile-picture" src={post.owner_profile_picture} />
                </div>

                <div className="post-box-content">
                    <div className="post-box-header-info">
                        <p>{post.owner_username}</p>
                        <p>March 16</p>
                    </div>
                    <p>{post.text}</p>
                    <div>
                        <img src={images ? post.post_images[0].url : ""} />
                    </div>

                    <div className="post-action-buttons">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="18"
                            height="18"
                            stroke={'red'}
                            fill={'red'}
                        >
                            <path
                                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                stroke-width="2" // Adjust the stroke width as needed
                            />
                        </svg>

                        <div className="comments-container-post-details">
                            <i class="fa-regular fa-message"></i>


                            <p>Comments</p>
                        </div>
                    </div>

                </div>
            </div>
        )
    })

    return (
        <div >
            {isLoaded && isFollowing && (<>
                <div className="all-posts-container">
                    {allPosts}
                </div>
            </>)}
        </div>
    );
}

export default CommunityPosts;

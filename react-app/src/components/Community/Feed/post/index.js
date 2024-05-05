import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import Heart from "../../../svgs/Heart"

import './index.css'

const Post = ({ post, images }) => {
    const [liked, setLiked] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)

    const artist = useSelector(state => state.artist)
    const history = useHistory()

    const findLike = async () => {
        const response = await fetch(`/api/posts/${artist.community_id}/${post.id}/likes/current`)
        const data = await response.json()
        if (!data.Errors) {
            await setLiked(true)
        }
        setIsLoaded(true)
        return data.like
    }

    const pressedHeart = async (e) => {
        e.stopPropagation()
        const method = liked ? 'DELETE' : "POST"
        const response = await fetch(`/api/posts/${artist.community_id}/${post.id}/likes`, {
            method: method
        })
        if (response.ok) {
            const data = await response.json()
            await setLiked(!liked)
            return data.like
        }
    }

    const postClicked = () => {
        history.push(`/artists/${artist.id}/community/${post.id}/`)
    }

    useEffect(() => {
        findLike()
    }, [liked])

    const heartFill = liked ? "red" : "none"
    const heartStroke = liked ? "none" : "black"

    return (
        <div>
            {isLoaded && (
                <div className="post-box" onClick={() => postClicked()}>
                    <div className="profile-picture-container">
                        <img className="post-profile-picture" src={post.owner_profile_picture} />
                    </div>
                    <div>
                        <div className="post-header">
                            <div className="post-box-header-info">
                                <p className="user_username">{post.owner_username}</p>
                                <p className="user_at">@{post.owner_at}</p>
                            </div>
                        </div>
                        <div className="post-box-content">
                            <p className="post-text">{post.text}</p>
                            <div className={images ? "post-image-container" : 'no-image'}>
                                <img className="post-image" src={images ? post.post_images[0].url : ""} />
                            </div>
                        </div>
                        <div className="like-comment-container-post-details">
                            <div className="likes-likescounter-container">
                                <div className="inner-likes-comments" onClick={(e) => { pressedHeart(e) }}>
                                    <div className="heart-container">
                                        <Heart heartFill={heartFill} heartStroke={heartStroke} />
                                    </div>
                                    <div onClick={() => postClicked()} className="comments-container-post-details">
                                        <i className="fa-regular fa-message"></i>
                                        <p>Comments</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            )}
        </div>
    )
}

export default Post;

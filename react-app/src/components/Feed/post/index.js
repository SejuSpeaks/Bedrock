import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import TrashSvg from '../../Comments/TrashSvg'
import DeletePost from "../DeletePostModal"


import './index.css'

const Post = ({ post, setPostDeleted }) => {
    const [liked, setLiked] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)

    const artist = useSelector(state => state.artist)
    const user = useSelector(state => state.session.user)

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

    const pressedHeart = async () => {
        const method = liked ? 'DELETE' : "POST"
        console.log(method, 'MWTHOD')
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

                <div className="post-container" >
                    <div onClick={() => postClicked()}>

                        <div className="post-container-user-img-username-container">
                            <div className="post-container-img-trash-container">
                                <img className="post-profile-picture" src={post.owner_profile_picture} />
                            </div>
                            <p>{post.owner_username}</p>
                        </div>
                        <p>{post.text}</p>
                    </div>
                    <div className="post-action-buttons-container-post-details">
                        <div className="like-comment-container-post-details">

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="16"
                                height="16"
                                stroke={heartStroke}
                                fill={heartFill}
                                onClick={() => { pressedHeart() }}
                            >
                                <path
                                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                />
                            </svg>
                            <div className="comments-container-post-details">
                                <p>Comment</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 3.532 10 7.874 0 4.162-3.627 6.72-7.893 7.721l-2.107 2.958-2.107-2.958c-4.304-1.011-7.893-3.617-7.893-7.721 0-4.342 4.486-7.874 10-7.874zm0-2c-6.627 0-12 4.42-12 9.874 0 4.512 3.678 8.317 8.701 9.496l3.299 4.63 3.299-4.63c5.023-1.18 8.701-4.985 8.701-9.496 0-5.454-5.373-9.874-12-9.874z" /></svg>
                            </div>
                        </div>
                        {user.id === post.post_owner && (

                            <div className="trash-edit-post-details">
                                <TrashSvg modalComponent={<DeletePost post_id={post.id} setPostDeleted={setPostDeleted} />} />
                            </div>
                        )}
                    </div>

                </div>
            )}
        </div>
    )
}

export default Post;

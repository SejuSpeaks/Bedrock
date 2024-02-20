import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import TrashSvg from '../../Comments/TrashSvg'
import SvgModalUpdate from "../../Comments/svgModalButtonUpdate"
import DeletePost from "../DeletePostModal"
import UpdatePost from "../UpdatePostModal"


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

                <div className="post-container" >
                    <div className="post-inner-container">

                        <div className="post-text-user-profile-container">
                            <div className="post-container-user-img-username-container" onClick={() => postClicked()}>
                                <img className="post-profile-picture" src={post.owner_profile_picture} />
                                <div>
                                    <p id="post-username">@{post.owner_username}</p>

                                    <p className="post-text">{post.text}</p>

                                    <div className="like-comment-container-post-details">
                                        <div className="likes-likescounter-container">
                                            <div style={{ display: "flex" }} onClick={(e) => { pressedHeart(e) }}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    width="18"
                                                    height="18"
                                                    stroke={heartStroke}
                                                    fill={heartFill}
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


                                            {user.id === post.post_owner && (

                                                <div className="trash-edit-post-details" onClick={(e) => e.stopPropagation()}>
                                                    <TrashSvg modalComponent={<DeletePost post_id={post.id} setPostDeleted={setPostDeleted} />} />
                                                    <SvgModalUpdate modalComponent={<UpdatePost post={post} />} />
                                                </div>
                                            )}
                                        </div>
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

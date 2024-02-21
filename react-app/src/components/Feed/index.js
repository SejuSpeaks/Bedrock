import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchGetArtist } from "../../store/artist"
import Post from "./post"

import './index.css'
import { fetchAllPosts } from "../../store/posts"
import { useParams } from "react-router-dom"

const Feed = ({ followsArtist }) => {
    const { artistid } = useParams()
    const [isLoaded, setIsLoaded] = useState(false)
    const [postDeleted, setPostDeleted] = useState(false)

    const posts = useSelector(state => state.posts)
    const user = useSelector(state => state.session.user)

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchGetArtist(artistid))
            .then((res) => dispatch(fetchAllPosts(res.community_id)))
            .then(() => setIsLoaded(true))
    }, [postDeleted])


    const allPosts = Object.values(posts).map(post => {
        return (
            <div key={post.id}>
                <Post post={post} setPostDeleted={setPostDeleted} />
            </div>

        );
    })

    const userValid = followsArtist || user && user.id === Number(artistid);

    return (
        <div>

            {/* <p className="all-posts-feed-heading">Feed</p> */}
            <div className="all-posts-container">
                {userValid ? (
                    <>
                        <div>
                            {isLoaded && (
                                <div>
                                    {allPosts}
                                </div>
                            )}
                        </div>
                    </>
                ) :
                    (
                        <div>
                            FOLLOW TO SEE
                        </div>
                    )}
            </div>
        </div>
    )
}

export default Feed

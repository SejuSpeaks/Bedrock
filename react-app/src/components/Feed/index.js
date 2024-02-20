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


    return (
        <div>

<<<<<<< HEAD
<<<<<<< HEAD
            <p>Feed</p>
            <div>
=======
            {/* <p className="all-posts-feed-heading">Feed</p> */}
            <div className="all-posts-container">
>>>>>>> 207fad1617ac56749c0160b847c7270a1a1343a3
=======
            {/* <p className="all-posts-feed-heading">Feed</p> */}
            <div className="all-posts-container">
>>>>>>> 7b101935324880b3d94c82a8fe5a306252da7140
                {followsArtist ? (
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

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Post from "./post"

import './index.css'
import { fetchAllPosts } from "../../store/posts"
import { useParams } from "react-router-dom"

const Feed = ({ followsArtist }) => {
    const { artistid } = useParams()
    const [isLoaded, setIsLoaded] = useState(false)

    const posts = useSelector(state => state.posts)

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchAllPosts(artistid))
            .then(() => setIsLoaded(true))
    }, [])


    const allPosts = Object.values(posts).map(post => {
        return (

            <Post post={post} />

        );
    })


    return (
        <div>

            <p>Feed</p>
            <div>
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

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Post from "./post"

import './index.css'

const Feed = ({ artist, followsArtist, posts }) => {


    const allPosts = Object.values(posts).map(post => {
        return (
            <Post post={post} artist={artist} />
        );
    })


    return (
        <div>
            <p>Feed</p>
            <div>
                {followsArtist ? (
                    <>
                        <div>
                            {allPosts}
                        </div>
                    </>
                ) :
                    (
                        <>
                            <div>
                                FOLLOW TO SEE
                            </div>
                        </>
                    )}
            </div>
        </div>
    )
}

export default Feed

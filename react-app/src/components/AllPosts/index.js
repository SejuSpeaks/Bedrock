
import { useState } from "react";
import Feed from "../Feed";
import ProfileHeader from "../ProfileHeader";
import ArtistPageNav from "../ArtistPageNav";
import PostBox from "../PostBox";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom"

import './index.css'



const AllPosts = () => {
    const { artistid } = useParams()
    const [followsArtist, setFollowsArtist] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()

    //CHECK IF USER FOLLOWS ARTIST
    const checkUserFollowingStatus = async id => {
        const response = await fetch(`/api/current/following/${id}`)

        if (response.ok) {
            const data = await response.json()
            setFollowsArtist(true)
            return data
        }
        else {
            const data = await response.json()
            console.log('UhOh', data)
        }
    }

    //FOLLOW AN ARTIST FUNCTION
    const followArtist = async (id) => {
        const response = await fetch(`/api/current/following/${id}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (response.ok) {
            const data = await response.json()
            setFollowsArtist(!followsArtist)
            console.log(followsArtist, 'after change')
            return data
        }
        else {
            const data = await response.json()
            console.log('UhOh', data)
        }
    }

    //get the artist
    useEffect(() => {
        checkUserFollowingStatus(artistid)
            .then(() => setIsLoaded(true))
    }, [followsArtist])

    return (
        <div>
            <ArtistPageNav />

            <div className="all-posts-page-container">
                <div className="all-posts-feed-post-box-container">
                    <PostBox />
                    <Feed followsArtist={followsArtist} />
                </div>

                <ProfileHeader followArtist={followArtist} followsArtist={followsArtist} />
            </div>


        </div>
    );
}

export default AllPosts

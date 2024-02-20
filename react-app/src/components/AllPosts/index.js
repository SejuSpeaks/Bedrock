
import { useState } from "react";
import Feed from "../Feed";
import ProfileHeader from "../ProfileHeader";
import ArtistPageNav from "../ArtistPageNav";
import PostBox from "../PostBox";
<<<<<<< HEAD
import { useDispatch } from "react-redux";
=======
>>>>>>> 207fad1617ac56749c0160b847c7270a1a1343a3
import { useEffect } from "react";
import { useParams } from "react-router-dom"

import './index.css'



const AllPosts = () => {
    const { artistid } = useParams()
    const [followsArtist, setFollowsArtist] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
<<<<<<< HEAD
    const dispatch = useDispatch()
=======
>>>>>>> 207fad1617ac56749c0160b847c7270a1a1343a3

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
<<<<<<< HEAD
            console.log('UhOh', data)
=======
>>>>>>> 207fad1617ac56749c0160b847c7270a1a1343a3
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
<<<<<<< HEAD
            console.log(followsArtist, 'after change')
=======
>>>>>>> 207fad1617ac56749c0160b847c7270a1a1343a3
            return data
        }
        else {
            const data = await response.json()
<<<<<<< HEAD
            console.log('UhOh', data)
=======
>>>>>>> 207fad1617ac56749c0160b847c7270a1a1343a3
        }
    }

    //get the artist
    useEffect(() => {
        checkUserFollowingStatus(artistid)
            .then(() => setIsLoaded(true))
<<<<<<< HEAD
    }, [followsArtist])
=======
    }, [followsArtist, artistid])
>>>>>>> 207fad1617ac56749c0160b847c7270a1a1343a3

    return (
        <div>
            <ArtistPageNav />
<<<<<<< HEAD

            <div className="all-posts-page-container">
                <div className="all-posts-feed-post-box-container">
                    <PostBox followsArtist={followsArtist} />
                    <Feed followsArtist={followsArtist} />
                </div>

                <ProfileHeader followArtist={followArtist} followsArtist={followsArtist} />
            </div>
=======
            {isLoaded && (<>
                <div className="all-posts-page-container">
                    <div className="all-posts-feed-post-box-container">
                        <div className="all-posts-post-box-container">
                            <PostBox followsArtist={followsArtist} />
                        </div>

                        <Feed followsArtist={followsArtist} />
                    </div>

                    <ProfileHeader followArtist={followArtist} followsArtist={followsArtist} />
                </div>
            </>)}
>>>>>>> 207fad1617ac56749c0160b847c7270a1a1343a3


        </div>
    );
}

export default AllPosts

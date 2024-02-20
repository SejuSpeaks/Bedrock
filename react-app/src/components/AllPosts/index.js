
import { useState } from "react";
import Feed from "../Feed";
import ProfileHeader from "../ProfileHeader";
import ArtistPageNav from "../ArtistPageNav";
import PostBox from "../PostBox";
<<<<<<< HEAD
<<<<<<< HEAD
import { useDispatch } from "react-redux";
=======
>>>>>>> 207fad1617ac56749c0160b847c7270a1a1343a3
=======
>>>>>>> 7b101935324880b3d94c82a8fe5a306252da7140
import { useEffect } from "react";
import { useParams } from "react-router-dom"

import './index.css'



const AllPosts = () => {
    const { artistid } = useParams()
    const [followsArtist, setFollowsArtist] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
<<<<<<< HEAD
<<<<<<< HEAD
    const dispatch = useDispatch()
=======
>>>>>>> 207fad1617ac56749c0160b847c7270a1a1343a3
=======
>>>>>>> 7b101935324880b3d94c82a8fe5a306252da7140

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
<<<<<<< HEAD
            console.log('UhOh', data)
=======
>>>>>>> 207fad1617ac56749c0160b847c7270a1a1343a3
=======
>>>>>>> 7b101935324880b3d94c82a8fe5a306252da7140
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
<<<<<<< HEAD
            console.log(followsArtist, 'after change')
=======
>>>>>>> 207fad1617ac56749c0160b847c7270a1a1343a3
=======
>>>>>>> 7b101935324880b3d94c82a8fe5a306252da7140
            return data
        }
        else {
            const data = await response.json()
<<<<<<< HEAD
<<<<<<< HEAD
            console.log('UhOh', data)
=======
>>>>>>> 207fad1617ac56749c0160b847c7270a1a1343a3
=======
>>>>>>> 7b101935324880b3d94c82a8fe5a306252da7140
        }
    }

    //get the artist
    useEffect(() => {
        checkUserFollowingStatus(artistid)
            .then(() => setIsLoaded(true))
<<<<<<< HEAD
<<<<<<< HEAD
    }, [followsArtist])
=======
    }, [followsArtist, artistid])
>>>>>>> 207fad1617ac56749c0160b847c7270a1a1343a3
=======
    }, [followsArtist, artistid])
>>>>>>> 7b101935324880b3d94c82a8fe5a306252da7140

    return (
        <div>
            <ArtistPageNav />
<<<<<<< HEAD
<<<<<<< HEAD
=======
            {isLoaded && (<>
                <div className="all-posts-page-container">
                    <div className="all-posts-feed-post-box-container">
                        <div className="all-posts-post-box-container">
                            <PostBox followsArtist={followsArtist} />
                        </div>
>>>>>>> 7b101935324880b3d94c82a8fe5a306252da7140

                        <Feed followsArtist={followsArtist} />
                    </div>

                    <ProfileHeader followArtist={followArtist} followsArtist={followsArtist} />
                </div>
<<<<<<< HEAD

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
=======
            </>)}
>>>>>>> 7b101935324880b3d94c82a8fe5a306252da7140


        </div>
    );
}

export default AllPosts

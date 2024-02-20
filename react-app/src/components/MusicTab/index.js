import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import ProfileHeader from "../ProfileHeader";
import ArtistPageNav from "../ArtistPageNav";
import AllAlbums from "./AllAlbums";

import './index.css'

const MusicTab = () => {
    //HEADER SUBSCRIBER FUNCTIONS
    const [followsArtist, setFollowsArtist] = useState(false)

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

    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        if (user) {
            checkUserFollowingStatus(user.id)
        }
    }, [followsArtist])

    return (
        <div>
            <ArtistPageNav />
            <div className="music-tab-page-container">
                <AllAlbums />
                <ProfileHeader followsArtist={followsArtist} />
            </div>
        </div>
    )
}

export default MusicTab

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

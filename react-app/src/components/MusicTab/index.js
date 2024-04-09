import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { followArtist, checkFollow } from "../Community/followArtist";

import ProfileHeader from "../ProfileHeader";
import ArtistPageNav from "../Navs/ArtistPageNav";
import AllAlbums from "./AllAlbums";

import './index.css'

const MusicTab = () => {
    //HEADER SUBSCRIBER FUNCTIONS
    const [isFollowing, setIsFollowing] = useState(false)

    // const checkUserFollowingStatus = async id => {
    //     const response = await fetch(`/api/current/following/${id}`)

    //     if (response.ok) {
    //         const data = await response.json()
    //         setIsFollowing(true)
    //         return data
    //     }
    //     else {
    //         const data = await response.json()
    //     }
    // }

    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const artist = useSelector(state => state.artist)

    useEffect(() => {
        if (user) {
            checkFollow(setIsFollowing, artist.id)
        }
    }, [isFollowing])

    return (
        <div className="music-tab-page-container">
            <div className="inner-music-tab">
                <ArtistPageNav />
                <div className="header-and-all-albums-container">
                    <AllAlbums />
                    <div className="profile-header-container-music-tab">
                        <ProfileHeader followArtist={followArtist} followsArtist={isFollowing} setIsFollowing={setIsFollowing} />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default MusicTab

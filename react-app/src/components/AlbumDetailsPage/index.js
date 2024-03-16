
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchGetAlbum } from "../../store/albums";
import { useParams } from "react-router-dom";
import { findLike } from "./findLike";
import { likeAlbum } from "./likeAlbum";
import { followArtist, checkFollow } from '../Community/followArtist'

import './index.css'
import AudioComponent from "./AudioComponent";
import ProfileHeader from "../ProfileHeader";
import ArtistPageNav from "../Navs/ArtistPageNav";

const AlbumDetails = () => {
    const user = useSelector(state => state.session.user)
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

    // //FOLLOW AN ARTIST FUNCTION
    // const followArtist = async (id) => {
    //     if (!user) return

    //     const response = await fetch(`/api/current/following/${id}`, {
    //         method: 'POST',
    //         headers: {
    //             "Content-Type": "application/json"
    //         }
    //     })

    //     if (response.ok) {
    //         const data = await response.json()
    //         setFollowsArtist(!followsArtist)
    //         return data
    //     }
    //     else {
    //         const data = await response.json()
    //     }
    // }


    const { albumid } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const [isLoaded, setIsLoaded] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [liked, setLiked] = useState(false)
    const album = useSelector(state => state.albums)
    const [songPlaying, setSongPlaying] = useState('')
    const artist = useSelector(state => state.albums.artist)
    let artistId;
    let firstSong;
    const audioRef = React.createRef()
    //get album by id
    //if album not found push to 404
    useEffect(() => {

        dispatch(fetchGetAlbum(albumid))
            .then(res => {
                if (res.Errors) return history.push('/404')
                artistId = (res.album.artist.id)
                firstSong = res.album.songs[0]
                setSongPlaying(firstSong)
            })

            .then(() => checkFollow(setIsFollowing, artistId))
            .then(() => findLike(albumid, setLiked))

            .then(() => setIsLoaded(true))


    }, [liked])

    // useEffect(() => {

    // }, [])


    const play = (song) => {
        setSongPlaying(song)
        setIsPlaying(true)
    }



    //every song on album
    const allSongs = isLoaded && album?.songs.map((song, index) => {
        const songNumber = index + 1;
        return (
            <div key={song.id} className="album-details-song-container">
                <div className="play-button-container-song">
                    {!isPlaying && (<div className="play-pause-box"><i onClick={() => play(song)} class="fa-solid fa-play fa-2xs"></i></div>)}
                    {isPlaying && (<div className="play-pause-box"><i onClick={() => setIsPlaying(false)} class="fa-solid fa-pause fa-2xs"></i></div>)}
                </div>
                {/* <button >Play</button> */}
                <p>{songNumber}. {song.name}</p>
            </div>
        );
    })

    //element states
    const heartFill = liked ? "red" : "none"
    const heartStroke = liked ? "none" : "black"

    return (
        <div>
            {isLoaded &&
                <>
                    <div className="page-container-album-details" >
                        <ArtistPageNav />
                        <div className="content-container-album-details">


                            <div className="left-side-album-details">

                                <div className="album-container-album-details">
                                    <img className='album-details-image' src={album.details.cover} alt="album cover" />
                                    {user && (

                                        <div className="album-details-wishlist-container">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                width="16"
                                                height="16"
                                                stroke={heartStroke}
                                                fill={heartFill}
                                                onClick={() => { likeAlbum(albumid, setLiked, liked, dispatch) }}
                                            >
                                                <path
                                                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                                />
                                            </svg>
                                            <p style={{ fontSize: '12px' }}>Wishlist</p>
                                        </div>
                                    )}
                                </div>

                                <div className="album-images-container">
                                    <div className="album-title-and-owner-container">
                                        <p className="album-details-album-title">{album.details.title}</p>
                                        <p>by {artist.artist_name}</p>
                                    </div>
                                    {/* <audio ref={audioRef} controls src={songPlaying} /> */}
                                    <div>

                                    </div>
                                    <AudioComponent songPlaying={songPlaying} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
                                    <div className="all-songs-container">
                                        {allSongs}
                                    </div>
                                </div>

                            </div>
                            <ProfileHeader followArtist={followArtist} followsArtist={isFollowing} setIsFollowing={setIsFollowing} />


                        </div>

                    </div>



                </>
            }

        </div>
    );

}

export default AlbumDetails;

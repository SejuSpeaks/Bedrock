import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";

import { fetchGetArtist } from "../../store/artist";
import { fetchAllPosts } from "../../store/posts";
import { fetchPostPost } from "../../store/posts";

import Feed from "../Feed";
import ArtistPageNav from "../ArtistPageNav";
import ProfileHeader from "../ProfileHeader";
import AlbumDetails from "../AlbumDetailsPage";
import PostBox from "../PostBox";
import PostDetails from "../PostDetails";


import './index.css'

const CommunityTab = () => {
    const { artistid } = useParams();
    const [isLoaded, setIsLoaded] = useState(false)
    const [followsArtist, setFollowsArtist] = useState(false)
    const [tab, setTab] = useState('')
    const dispatch = useDispatch();

    const artist = useSelector(state => state.artist)
    const posts = useSelector(state => state.posts)


    //POST A POST
    const submitPost = (post) => {
        dispatch(fetchPostPost(artist.community_id, post))
    }

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
        dispatch(fetchGetArtist(artistid))
            .then(() => checkUserFollowingStatus(artistid))
            .then(() => {
                if (followsArtist) dispatch(fetchAllPosts(artist.community_id))
            })
            .then(() => setIsLoaded(true))
    }, [followsArtist])



    return (
        <div>
            <ArtistPageNav artist={artist} />
            <Switch>

                <Route path='/artists/:artistid/community/:postid'>
                    <ProfileHeader artist={artist} followArtist={followArtist} followsArtist={followsArtist} />
                    <PostDetails />
                </Route>

                <Route path='/artists/:artistid/community'>

                    <div className="artist-community-page">
                        <div className="artist-community-page-posts">
                            <PostBox submitPost={submitPost} />
                            <Feed artist={artist} followsArtist={followsArtist} posts={posts} />
                        </div>
                        <ProfileHeader artist={artist} followArtist={followArtist} followsArtist={followsArtist} />
                    </div>

                </Route>

                <Route path='/artists/:artistid/albums/:albumid'>

                    <div className="album-details-page">
                        <AlbumDetails />
                        <ProfileHeader artist={artist} followArtist={followArtist} followsArtist={followsArtist} />
                    </div>

                </Route>

                <Route path='/artists/:artistid/albums'>
                    <div>
                        albums
                    </div>
                </Route>

            </Switch>


        </div>
    )
}

export default CommunityTab

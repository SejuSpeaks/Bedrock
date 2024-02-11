import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchGetArtist } from "../../store/artist";
import { useParams } from "react-router-dom";
import ProfileHeader from "../ProfileHeader";
import ArtistPageNav from "../ArtistPageNav";




const CommunityTab = () => {
    const { artistid } = useParams();
    const [isLoaded, setIsLoaded] = useState(false)
    const [tab, setTab] = useState('')
    const dispatch = useDispatch();

    const artist = useSelector(state => state.artist)


    useEffect(() => {
        dispatch(fetchGetArtist(artistid))
            .then(() => setIsLoaded(true))
    }, [])

    return (
        <div>
            <ArtistPageNav artist={artist} />
            <ProfileHeader artist={artist} />
        </div>
    )
}

export default CommunityTab

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetTags } from "../../store/tags";
import { useHistory } from "react-router-dom";
import { fetchAlbumsByTag } from "../../store/albums";

import Tags from "./tags";
import './index.css'
import Albums from "./albums";
import HotAlbum from "./hotAlbum";



const LandingPage = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedTab, setSelectedTab] = useState('all genres');
    const [selectedAlbum, setSelectedAlbum] = useState({})
    const tags = useSelector(state => state.tags)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchGetTags())
            .then(() => setIsLoaded(true))
    }, [])

    return (
        <>
            {isLoaded && (
                <div className="landing-page-container">
                    <div className="landing-page-tags-container">
                        <Tags tags={tags} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                    </div>
                    <div className="landing-page-albums-container">

                        <div>
                            <Albums selectedtab={selectedTab} setSelectedAlbum={setSelectedAlbum} />
                        </div>

                        <div className="hot-album-component-container">
                            <HotAlbum selectedtab={selectedTab} selectedAlbum={selectedAlbum} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default LandingPage;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetTags } from "../../store/tags";
import { useHistory } from "react-router-dom";
import { fetchAlbumsByTag } from "../../store/albums";

import Tags from "./tags";
import './index.css'
import Albums from "./albums";



const LandingPage = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedTab, setSelectedTab] = useState('all genres');
    const tags = useSelector(state => state.tags)
    const albums = useSelector(state => state.albums)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchGetTags())
            .then(() => setIsLoaded(true))
    }, [albums])

    return (

        <div>
            {isLoaded && (

                <div>
                    <Tags tags={tags} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                    <Albums selectedtab={selectedTab} />
                </div>
            )}
        </div>
    );
}

export default LandingPage;

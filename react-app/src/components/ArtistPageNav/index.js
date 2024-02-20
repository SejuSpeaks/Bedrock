import { NavLink, useParams } from "react-router-dom";

import './index.css'

const ArtistPageNav = () => {
    const { artistid } = useParams()
    return (
        <div className="nav-links-container-artist">
            <NavLink className='navlinks' to={`/artists/${artistid}/albums`} >music</NavLink>
            <NavLink className='navlinks' to={`/artists/${artistid}/community`} >community</NavLink>
        </div>
    );
}

export default ArtistPageNav;

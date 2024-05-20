import { NavLink, useParams } from "react-router-dom";

import './index.css'

const ArtistPageNav = () => {
    const { artistid } = useParams()
    return (
        <div className="nav-links-container-artist">

            <div className="inner-nav-links">

                <div className="nav-link-container-nav">
                    <div className="inner-navlink-container">
                        <NavLink className='navlinks' to={`/artists/${artistid}/albums`} >music</NavLink>
                    </div>
                </div>

                <div className="nav-link-container-nav">
                    <div className="inner-navlink-container">
                        <NavLink className='navlinks' to={`/artists/${artistid}/community`} >community</NavLink>
                    </div>
                </div>

            </div>


        </div>
    );
}

export default ArtistPageNav;

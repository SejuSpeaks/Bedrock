import { NavLink } from "react-router-dom/cjs/react-router-dom.min";



const ArtistPageNav = ({ artist }) => {
    return (
        <div>
            <NavLink to={`/artists/${artist.id}/albums`} >music</NavLink>
            <NavLink to={`/artists/${artist.id}/community`} >community</NavLink>
        </div>
    );
}

export default ArtistPageNav;

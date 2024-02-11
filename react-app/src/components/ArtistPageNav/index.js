import { NavLink } from "react-router-dom/cjs/react-router-dom.min";



const ArtistPageNav = ({ artist }) => {
    return (
        <div>
            <NavLink to='' >music</NavLink>
            <NavLink to='' >community</NavLink>
        </div>
    );
}

export default ArtistPageNav;

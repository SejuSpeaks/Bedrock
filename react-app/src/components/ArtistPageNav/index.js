import { NavLink, useParams } from "react-router-dom";



const ArtistPageNav = () => {
    const { artistid } = useParams()
    return (
        <div>
            <NavLink to={`/artists/${artistid}/albums`} >music</NavLink>
            <NavLink to={`/artists/${artistid}/community`} >community</NavLink>
        </div>
    );
}

export default ArtistPageNav;

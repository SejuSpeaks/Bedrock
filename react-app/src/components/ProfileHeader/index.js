

import './index.css'

const ProfileHeader = ({ artist, followArtist, followsArtist }) => {
    const albums = artist.albums


    const allAlbums = albums ? albums.map(album => {
        return (
            <div>
                <img className="profile-header-album-cover" src={album.cover} alt="cover" />
                <p>{album.title}</p>
                <p>{album.release_date}</p>
            </div>
        );
    }) : "no albums"

    const followButtonClass = followsArtist ? 'profile-header-follow-button-active' : 'profile-header-follow-button'


    return (
        <div>

            <div>
                <img className="profile-header-image" src={artist.profile_picture} alt="profilepicture" />
                <p>{artist.artist_name}</p>
                <button onClick={() => followArtist(artist.id)} className={followButtonClass}>{followsArtist ? 'Followed' : 'Follow'}</button>
            </div>

            <div>
                <p>disography</p>
                {allAlbums}
            </div>


        </div>
    );
}

export default ProfileHeader;

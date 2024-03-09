import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/session";
import { useHistory } from "react-router-dom";

function ProfileButton({ isLoaded, user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    return history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <div>
      {isLoaded && (<>
        <div className="user-profile-picture-container">
          <img className="user-profile-picture" onClick={openMenu} src={user.profile_picture} />
        </div>

        <div className={ulClassName} ref={ulRef}>
          {user && (
            <>
              <div className="dropdown-container">
                <li>Hello {user.username}</li>
                <li>{user.email}</li>

                <div className="profile-buttons-profile-dropdown">
                  <button className="profile-buttons" onClick={() => history.push('/current')}>Profile</button>
                  {user.artist_account && (<button className="profile-buttons" onClick={() => history.push(`/artists/${user.id}/community`)}>Community</button>)}
                  <button className="profile-buttons" onClick={handleLogout}>Log Out</button>
                </div>

              </div>
            </>
          )}
        </div>
      </>)}
    </div>
  );
}

export default ProfileButton;

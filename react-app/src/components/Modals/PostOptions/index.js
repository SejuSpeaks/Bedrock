import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import SvgModalUpdate from '../../Community/Comments/svgModalButtonUpdate';
import EditComment from '../../Community/EditCommentModal';
import TrashSvg from '../../Community/Comments/TrashSvg';
import './index.css';
import ConfirmDelete from '../ConfirmDelete';
import { useSelector } from 'react-redux';

function PostOptions({ comment, updateComment, deleteComment }) {
    const history = useHistory();
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef();

    const user = useSelector(state => state.session.user)

    const toggleMenu = () => {
        setShowMenu(prevState => !prevState);
    };

    const closeMenu = () => {
        setShowMenu(false);
    };

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        if (showMenu) {
            document.addEventListener('click', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [showMenu]);

    return (
        <div className="post-options-container">

            {user.id === comment.user_id && (<>
                <div className="menu-button" onClick={toggleMenu}>
                    <svg className="post-options-svg" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" height={20} width={20} strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="m16.5 11.995c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25zm-6.75 0c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25zm-6.75 0c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25z" />
                    </svg>
                </div>
            </>)}

            {showMenu && (

                <div ref={menuRef}>

                    <div className="menu-content-posts">

                        <div className="profile-buttons-profile-dropdown">

                            <div className="post-options-option">
                                <SvgModalUpdate className={"post-options-option"} modalComponent={<EditComment comment={comment} updateComment={updateComment} />} />
                            </div>

                            <div className="post-options-option">
                                <TrashSvg className={"post-options-option"} modalComponent={<ConfirmDelete comment={comment} deleteComment={deleteComment} />} />
                            </div>

                        </div>

                    </div>

                </div>

            )}
        </div>
    );
}

export default PostOptions;

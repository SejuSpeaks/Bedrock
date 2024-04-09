import { useEffect, useRef, useState } from "react";
import TrashSvg from "../Comments/TrashSvg";
import SvgModalUpdate from "../Comments/svgModalButtonUpdate";
import UpdatePost from "../Feed/UpdatePostModal";
import DeletePost from "../Feed/DeletePostModal";
import { useSelector } from "react-redux";


const UpdateDeletePost = ({ post, setChanged }) => {
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef()
    const user = useSelector(state => state.session.user)

    const toggleMenu = () => {
        setShowMenu(prevState => !prevState)
    }

    useEffect(() => {

        const handleOutsideClick = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        }

        if (showMenu) {
            document.addEventListener('click', handleOutsideClick)
        }

        return () => {
            document.removeEventListener('click', handleOutsideClick)
        }

    }, [showMenu])

    return (
        <div className="options-menu-popup-outer">
            {user.id === post.post_owner && !showMenu && (<>

                <div className="menu-button" >
                    <svg className="post-options-svg" onClick={() => toggleMenu()} clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" height={20} width={20} strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="m16.5 11.995c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25zm-6.75 0c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25zm-6.75 0c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25z" />
                    </svg>
                </div>
            </>)}

            {showMenu && (<>
                <div ref={menuRef}>
                    <div className="menu-content-posts">

                        <div onClick={() => setShowMenu(false)}>
                            <SvgModalUpdate className={'post-options-option'} modalComponent={<UpdatePost post={post} setChanged={setChanged} />} />
                        </div>

                        <div onClick={() => setShowMenu(false)}>
                            <TrashSvg className='post-options-option' modalComponent={<DeletePost post={post} />} />
                        </div>

                    </div>
                </div>
            </>)}


        </div>
    )
}

export default UpdateDeletePost;

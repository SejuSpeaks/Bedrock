import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchDeleteComment, fetchGetComments, fetchPostComment, fetchUpdateComment } from "../../store/comments";
import SvgModalUpdate from "./svgModalButtonUpdate";
import TrashSvg from "./TrashSvg";
import EditComment from "../EditCommentModal";
import ConfirmDelete from "../ConfirmDelete";


<<<<<<< HEAD
<<<<<<< HEAD
=======
import './index.css'
>>>>>>> 207fad1617ac56749c0160b847c7270a1a1343a3
=======
import './index.css'
>>>>>>> 7b101935324880b3d94c82a8fe5a306252da7140

const Comments = ({ artist }) => {
    const { postid } = useParams()

    const [isLoaded, setIsLoaded] = useState(false)
    const [commentText, setCommentText] = useState('')
    const [commentPosted, setCommentPosted] = useState(false)

    const user = useSelector(state => state.session.user)
    const commentsState = useSelector(state => state.comments)

    const dispatch = useDispatch();
    const communityid = artist.community_id

    useEffect(() => {
        dispatch(fetchGetComments(communityid, postid))
            .then(() => setIsLoaded(true))
<<<<<<< HEAD
<<<<<<< HEAD
    }, [commentPosted])
=======
    }, [commentPosted, dispatch, postid])
>>>>>>> 207fad1617ac56749c0160b847c7270a1a1343a3
=======
    }, [commentPosted, dispatch, postid])
>>>>>>> 7b101935324880b3d94c82a8fe5a306252da7140

    const updateComment = (comment_id, text) => {

        const comment = {
            "user_id": user.id,
            "post_id": postid,
            "text": text
        }

        dispatch(fetchUpdateComment(communityid, postid, comment_id, comment))
            .then(() => setCommentPosted(true))
            .then(() => setCommentPosted(false))
    }

    const submitComment = (e) => {
        e.preventDefault()

        const comment = {
            'user_id': user.id,
            'post_id': postid,
            'text': commentText
        }

        dispatch(fetchPostComment(communityid, postid, comment))
            .then(() => setCommentText(''))
            .then(() => setCommentPosted(true))
            .then(() => setCommentPosted(false))
    }

    const deleteComment = (comment_id) => {
        dispatch(fetchDeleteComment(communityid, postid, comment_id))
            .then(() => setCommentPosted(true))
            .then(() => setCommentPosted(false))

    }

    const comments = Object.values(commentsState).map(comment => {
        return (
            <div className="post-details-comment-container" key={comment.id}>
<<<<<<< HEAD
<<<<<<< HEAD
                <div>
=======
                <div className="user-img-username-container">
>>>>>>> 207fad1617ac56749c0160b847c7270a1a1343a3
=======
                <div className="user-img-username-container">
>>>>>>> 7b101935324880b3d94c82a8fe5a306252da7140
                    <img className="post-profile-picture" src={comment.profile_picture} />
                    <p>{comment.username}</p>
                </div>

                <p>{comment.text}</p>
                {user.id === comment.user_id && (
                    <div>
                        <SvgModalUpdate modalComponent={<EditComment comment={comment} updateComment={updateComment} />} />
                        <TrashSvg modalComponent={<ConfirmDelete comment_id={comment.id} deleteComment={deleteComment} />} />
                    </div>
                )}
            </div>
        );
    })


    return (
        <div>
            {isLoaded && (
                <>
<<<<<<< HEAD
<<<<<<< HEAD
                    <div>
                        <p>Comments</p>
                        <form onSubmit={(e) => submitComment(e)}>
                            <input value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="post a comment" />
                            <button>Submit Comment</button>
                        </form>
=======
=======
>>>>>>> 7b101935324880b3d94c82a8fe5a306252da7140
                    <div className="comment-input-container">
                        <div>
                            <i class="fa-regular fa-message fa-lg"></i>
                        </div>
                        <div>
                            <form className="post-comment-form" onSubmit={(e) => submitComment(e)}>
                                <input className="post-comment-form-input" value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="post a comment" />
                            </form>
                        </div>
<<<<<<< HEAD
>>>>>>> 207fad1617ac56749c0160b847c7270a1a1343a3
=======
>>>>>>> 7b101935324880b3d94c82a8fe5a306252da7140
                    </div>
                    <div>
                        {comments}
                    </div>
                </>
            )}
        </div>
    );
}

export default Comments

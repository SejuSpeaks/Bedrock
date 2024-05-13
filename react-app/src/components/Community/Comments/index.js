import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchDeleteComment, fetchGetComments, fetchPostComment, fetchUpdateComment } from "../../../store/comments";
import SvgModalUpdate from "./svgModalButtonUpdate";
import OptionsModal from "../../Modals/PostOptions/OptionsModal";
import TrashSvg from "./TrashSvg";
import PostOptions from "../../Modals/PostOptions";
import EditComment from "../EditCommentModal";
import ConfirmDelete from '../../Modals/ConfirmDelete'


import './index.css'


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
    }, [commentPosted, dispatch, postid])

    //make helper function
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

        if (!commentText) return

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

                <div className="post-details-post-container-header">

                    <div className="picture-and-at-container">

                        <div className="post-details-profile-picture-container">
                            <img className="post-profile-picture" src={comment.profile_picture} />
                        </div>

                        <div className='user-handles-container-comments'>
                            <p>{comment.username}</p>
                            <p className="user_at">@{comment.at}</p>
                        </div>
                    </div>

                    <div className="options-container">
                        <PostOptions comment={comment} updateComment={updateComment} deleteComment={deleteComment} />
                    </div>


                </div>

                <div className="comment-content">
                    <p>{comment.text}</p>
                </div>

                {/* {user.id === comment.user_id && (
                    <div>
                        <SvgModalUpdate modalComponent={<EditComment comment={comment} updateComment={updateComment} />} />
                        <TrashSvg modalComponent={<ConfirmDelete comment_id={comment.id} deleteComment={deleteComment} />} />
                    </div>
                )} */}

            </div>
        );
    })


    return (
        <div className="comments-post-details-whole">
            {isLoaded && (
                <>
                    <div className="comment-input-container">
                        <form className="post-comment-form" onSubmit={(e) => submitComment(e)}>
                            <div className="image-container-post-comment">
                                <img className="comment-input-profile-picture" src={user.profile_picture} />
                            </div>
                            <input className="post-comment-form-input" value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="post a comment" />
                            <button className="post-button">Post</button>

                        </form>
                    </div>

                    <div className="all-comments-container">
                        {comments}
                    </div>
                </>
            )}
        </div>
    );
}

export default Comments

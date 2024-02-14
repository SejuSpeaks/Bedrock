

import { useState } from 'react';
import './index.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostPost } from '../../store/posts';

const PostBox = ({ submitPost }) => {
    const dispatch = useDispatch()
    const [text, setText] = useState('')
    const user = useSelector(state => state.session.user.info)
    const artist = useSelector(state => state.artist)

    const finishedPost = (e) => {
        e.preventDefault()

        const post = {
            'user_id': user.id,
            'community_id': artist.community_id,
            'text': text
        }

        dispatch(fetchPostPost(artist.community_id, post))
        setText('')
    }

    return (
        <div className='post-textarea'>
            <form onSubmit={(e) => finishedPost(e)}>
                <textarea id='post-text-input' value={text} onChange={(e) => setText(e.target.value)} placeholder='Text'></textarea>

                <div className='post-button-container-post-text-box'>
                    <button className='post-button-post-text-box'>Post</button>
                </div>
            </form>

        </div>
    )
}

export default PostBox;

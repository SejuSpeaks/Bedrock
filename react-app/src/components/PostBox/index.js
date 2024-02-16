

import { useEffect, useState } from 'react';
import './index.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostPost } from '../../store/posts';
import { authenticate } from '../../store/session';

const PostBox = ({ submitPost, followsArtist }) => {
    const dispatch = useDispatch()
    const [text, setText] = useState('')
    const [isLoaded, setIsLoaded] = useState(false)
    const user = useSelector(state => state.session.user)
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

    useEffect(() => {
        dispatch(authenticate())
            .then(() => setIsLoaded(true))
    }, [])

    return (
        <div className='post-textarea'>
            {isLoaded && followsArtist ? (

                <form onSubmit={(e) => finishedPost(e)}>
                    <textarea id='post-text-input' value={text} onChange={(e) => setText(e.target.value)} placeholder='Text'></textarea>

                    <div className='post-button-container-post-text-box'>
                        <button className='post-button-post-text-box'>Post</button>
                    </div>
                </form>
            ) : "Sign up for Use"}

        </div>
    )
}

export default PostBox;

import { fetchPostPost } from '../../../store/posts'

export const post = async (dispatch, post, communityid) => {
    const postMade = await dispatch(fetchPostPost(communityid, post))

    return postMade
}


export const postImage = async (community_id, post_id, payload) => {
    const res = await fetch(`http://localhost:3000/api/posts/${community_id}/${post_id}/images`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })

    console.log('resRES', res)

    if (res.ok) {
        const data = await res.json()

        if (data.Errors) {
            console.log(data.Errors)
            return data.Errors
        }
        return data.post_image
    }
}

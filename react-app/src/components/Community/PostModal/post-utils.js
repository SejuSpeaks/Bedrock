import { fetchPostPost } from '../../../store/posts'

export const post = async (dispatch, post, communityid) => {
    const postMade = await dispatch(fetchPostPost(communityid, post))

    return postMade
}


export const postImage = async (community_id, post_id, payload, stateChange) => {


    const formData = new FormData()
    formData.append('file', payload.file)

    const res = await fetch(`/api/posts/${community_id}/${post_id}/images`, {
        method: 'POST',
        body: formData
    })


    if (res.ok) {
        const data = await res.json()
        console.log('fetch for image in post', data)
        stateChange(true)
        if (data.Errors) {
            console.log(data.Errors)
            return data.Errors
        }
        return data.post_image
    }
}

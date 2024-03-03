import { fetchPostPost } from '../../../store/posts'

export const post = async (dispatch, post, communityid) => {
    await dispatch(fetchPostPost(communityid, post))
}


export const postImage = async () => {

}

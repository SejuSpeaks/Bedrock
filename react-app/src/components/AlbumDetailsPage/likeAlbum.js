import { fetchLikeAlbum } from "../../store/albumLikes"

export const likeAlbum = async (album_id, setLiked, liked, dispatch) => {
    dispatch(fetchLikeAlbum(album_id))
        .then(() => setLiked(!liked))
}

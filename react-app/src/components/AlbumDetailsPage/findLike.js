

export const findLike = async (album_id, setLiked) => {
    const response = await fetch(`/api/albums/${album_id}/likes`)

    if (response.ok) {
        const data = await response.json()

        if (data.Errors) {
            return null
        }
        setLiked(true)
        return data.like
    }
}

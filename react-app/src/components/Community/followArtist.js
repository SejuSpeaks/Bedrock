

export const followArtist = async (isFollowing, setIsFollowing, artistId) => {

    const response = await fetch(`/api/current/following/${artistId}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (response.ok) {
        const data = await response.json()

        if (data.Errors) {
            return data.Errors
        }

        setIsFollowing(!isFollowing)
        return data
    }


}


export const checkFollow = async (setIsFollowing, artistId) => {
    const response = await fetch(`/api/current/following/${artistId}`)

    if (response.ok) {
        const data = await response.json()

        if (data.Errors) {
            setIsFollowing(false)
            return data.Errors
        }

        setIsFollowing(true)
        return data
    }
}

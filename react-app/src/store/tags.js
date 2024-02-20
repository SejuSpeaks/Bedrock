const GET_TAGS = '/TAGS/GETTAGS'


/* --Get Tags-- --------------------------------------------- */

//action
const get_tags = (tags) => {
    return {
        type: GET_TAGS,
        tags
    }
}


//thunk
export const fetchGetTags = () => async dispatch => {
    const response = await fetch('/api/tags')

    if (response.ok) {
        const data = await response.json()
        dispatch(get_tags(data.tags))
    }
}





const tags = (state = {}, action) => {
    let newState = {};
    switch (action.type) {
        case GET_TAGS:
            const allTags = action.tags.map(tag => {
                newState[tag.id] = tag
            })
            return newState

        default:
            return state;
    }
}

export default tags

const initState = {
    error: true,
    msg: ''
}

const documentReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_DOCUMENT':
            state = {
                error: action.payload
            }
            return state

        case 'ADD_DOCUMENT_ERROR':
            state = {
                error: true,
                msg: action.payload
            }
            return state

        case 'RESET':
            return initState

        default:
            return state
    }
}

export default documentReducer;
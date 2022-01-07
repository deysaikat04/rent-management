const initState = {
    error: true,
    files: [],
    msg: '',
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

        case 'FETCH_DOCUMENT':
            state = {
                error: false,
                files: [...action.payload],
            }
            return state

        case 'FETCH_DOCUMENT_ERROR':
            state = {
                error: true,
                msg: action.payload,
                files: [],
            }
            return state

        case 'RESET':
            return initState

        default:
            return state
    }
}

export default documentReducer;
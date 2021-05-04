
const initState = {
    userId: ''
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_USER':
            state = {
                userId: action.payload
            }
            return state

        case 'USER_SIGNIN':
            state = {
                userId: action.payload
            }
            return state

        case 'ADD_USER_ERROR':
            return state

        default:
            return state
    }
}

export default authReducer;
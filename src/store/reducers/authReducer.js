
const initState = {
    userId: ''
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_USER':
            state = {
                userId: action.payload
            }
            console.log("USer added")
            return state

        case 'USER_SIGNIN':
            state = {
                userId: action.payload
            }
            console.log(state)
            return state

        case 'ADD_USER_ERROR':
            console.log('Error while adding User.', action.err);
            return state

        default:
            return state
    }
}

export default authReducer;
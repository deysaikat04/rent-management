
const initState = {
    error: true,
    msg: ''
}

const tenantReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_TENANT':
            state = {
                error: action.payload
            }
            return state

        case 'ADD_TENANT_ERROR':
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

export default tenantReducer;
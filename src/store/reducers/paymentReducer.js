const initState = {
    error: true,
    msg: ''
}

const paymentReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_PAYMENT':
            state = {
                error: action.payload
            }
            return state

        case 'ADD_PAYMENT_ERROR':
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

export default paymentReducer;
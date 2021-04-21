const initState = {
    payment: []
}

const paymentReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_PAYMENT':
            console.log('Payment added', action.payment);
            return state

        case 'ADD_PAYMENT_ERROR':
            console.log('Error while adding Payment..', action.err);
            return state

        default:
            return state
    }
}

export default paymentReducer;
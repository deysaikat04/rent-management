
const initState = {
    tenant: [
        {
            name: '',
            address: '',
            adhaarNo: '',
            fromDate: '',
            tenure: '',
            toDate: '',
            rentAmount: '',
            chargePerUnit: '',
            startingUnit: '',
            advancedAmount: ''
        }
    ]
}

const paymentReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_TENANT':
            console.log('TENANT ADDED', action.tenant);
            return state

        case 'ADD_TENANT_ERROR':
            console.log('Error while adding Tenant..', action.err);
            return state


        default:
            return state
    }
}

export default paymentReducer;
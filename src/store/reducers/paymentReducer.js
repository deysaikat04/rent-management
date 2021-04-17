
const initState = {
    projects: [
        { id: '1', monthName: 'November' }
    ]
}

const paymentReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_PAYMENT':
            console.log('Created payment', action.project);
            return state

        case 'CREATE_PROJECT_ERROR':
            console.log('Error while adding Project..', action.err);
            return state

        case 'CREATE_INCOME':
            console.log('Added Income', action.project);
            return state

        case 'CREATE_INCOME_ERROR':
            console.log('Error while adding Income..', action.err);
            return state

        case 'PROJECT_DELETED':
            console.log('Deleted Project Successfully');
            return state

        case 'PROJECT_DELETED_ERROR':
            console.log('Error while deleting project..', action.err);
            return state

        default:
            return state
    }
}

export default paymentReducer;
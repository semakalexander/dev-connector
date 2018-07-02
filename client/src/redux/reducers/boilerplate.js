const SOME_ACTION_TYPE = 'SOME_ACTION_TYPE';

const defaultState = {};

const boilerplate = (state = defaultState, action) => {
    switch(action.type) {
        case SOME_ACTION_TYPE: 
            return {...state };
        default:
            return state;
    }
};

export default boilerplate;
import { actions } from './../action/index';

const initialState = {
    posts: [],
    loading: false,
    error: null
}

const postReducer = (state, action) => {
    switch (action.type) {
        case actions.post.DATA_FETCHING:
            return {
                ...state,
                loading: true
            }
        case actions.post.DATA_FETCHED:
            return {
                ...state,
                loading: false,
                posts: action.payload
            }
        case actions.post.DATA_FETCH_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case actions.post.DATA_CREATED:
            return {
                ...state,
                loading: false,
                posts: [action.payload, ...state.posts]
            }
        case actions.post.DATA_CREATE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        // case actions.post.DATA_EDITED:
        //     return {
        //         ...state,
        //         posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post)
        //     }
        // case actions.post.POST_DELETED:
        //     return {
        //         ...state,
        //         posts: state.posts.filter(post => post._id !== action.payload)
        //     }
        // case actions.post.POST_LIKED:
        //     return {
        //         ...state,
        //         posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post)
        //     }
        // case actions.post.POST_COMMENTED:
        //     return {
        //         ...state,
        //         posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post)
        //     }
        default:
            return state

    }


}
export { initialState, postReducer };
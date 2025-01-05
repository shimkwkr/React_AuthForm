export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"

const initialState = {
    isLogin: false,
    id:"",
    nickname:"",
    email:"",
}

const authReducer = (state = initialState, action) => {
    switch (action.type){
        case LOGIN:
            return {
                ...state,
                isLogin: true,
                id: action.payload.id,
                nickname: action.payload.nickname,
                email: action.payload.email,
            }

        case LOGOUT:
            return {
                ...state,
                isLogin: false,
                id:"",
                nickname:"",
                email:"",
            }

        default:
            return state
    }
}


export default authReducer
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { LOGOUT } from '../reducer/authReducer'

import '../styles/components/authheader.css'

const AuthHeader = () => {
    const isLogin = useSelector(state => state.userInfo.isLogin)
    const nickname = useSelector(state => state.userInfo.nickname)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logOut = () => {
        dispatch({type:  LOGOUT})
        navigate('/')
    }

    return (
        <div className='authbar'>
            {!isLogin ? (
                <>
                    <Link to="/login">로그인</Link>
                    &nbsp;|&nbsp;    
                    <Link to="/signup">회원가입</Link>
                </>
            )
            :
            (
                <>
                    <span>{nickname}</span>
                    <Link to="/" onClick={logOut}>로그아웃</Link>
                </>
            )}
        </div>
    );
};

export default AuthHeader;
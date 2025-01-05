import React, { useState } from 'react';
import AuthInput from '../../../components/AuthInput';
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { LOGIN } from '../../../reducer/authReducer';

const LoginPage = () => {
    const [state, setState] = useState({
        value : {id: "", password: ""},
        error : {id: "", password: ""},
    })

    const [touched, setTouched] = useState({
        id: false,
        password: false,
    })

    const navigate = useNavigate()
    const dispatch = useDispatch();


    const validate = (name, value) => {
        switch(name) {
            case 'id':
                return /^[a-zA-Z][a-zA-Z0-9]{3,19}$/.test(value) ? "" : "아이디가 유효하지 않습니다.";
            case 'password':
                return /^(?=.*[a-zA-Z])(?=.*[!@#$%^+=-])(?=.*[0-9]).{8,16}$/.test(value) ? "" : "비밀번호가 유효하지 않습니다.";
            default:
                return "";
        }
    }

    const handleChange = (event) => {
        setState({
            ...state,
            value:{
                ...state.value,
                [event.target.name] : event.target.value
            }
        })
    }

    const handleBlur = (event) => {
        setTouched({
            ...touched,
            [event.target.name]: true
        })
        setState({
            ...state,
            error: {
                ...state.error,
                [event.target.name]: validate(event.target.name, event.target.value)
            }
        })
    }

    const HandleSubmit = async (event) => {
        event.preventDefault();
    
        setTouched({
            id: true,
            password: true,
        })
    
        Object.keys(state.value).forEach((key) => {
            validate(key, state.value[key])
        })
    
        // 모든 필드 검증
        const errors = {
            id: validate('id', state.value.id),
            password: validate('password', state.value.password),
        }
    
        setState(prev => ({
            ...prev,
            error: errors
        }))
    
        // 에러가 하나도 없는지 확인
        const hasNoErrors = Object.values(errors).every(error => error === "")
    
        if (hasNoErrors) {
            const isSuccess = await logIn(state.value)
    
            if (isSuccess) {
                const payload = await getProfile(state.value.id)
                dispatch({type: LOGIN, payload})
                navigate('/')
            } else {
                alert('로그인중 오류가 발생했습니다. 나중에 다시 시도해 주세요.')
            }
        }
    }
    
    const logIn = async (userData) => {
        console.log("로그인중");
        
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
    
            if (!response.ok) {
                console.log("로그인 실패");
                return false
            } else {
                console.log("로그인 성공");
                return true
            }
    
        } catch(error) {
            console.log('로그인중 오류 발생', error);
            return false
        }
    }

    const getProfile = async (id) => {
        const response = await fetch(`/api/profile/${id}`).then((res) => res.json())
        return response
    }

    return (
        <>
            <h1>로그인 페이지</h1>
            <form noValidate onSubmit={HandleSubmit}>
                <AuthInput
                    label="아이디"
                    type="text"
                    name="id"
                    value={state.value.id}
                    error={state.error.id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched= {touched.id}
                    autoFocus
                />
                <AuthInput
                    label="비밀번호"
                    type="password"
                    name="password"
                    value={state.value.password}
                    error={state.error.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched= {touched.password}
                />
                <button>로그인</button>
            </form>
        </>
    );
};

export default LoginPage;

import React, { useState } from 'react';
import AuthInput from '../../../components/AuthInput';
import {useNavigate} from 'react-router-dom'

// 나중에 pinia설정후 url입력으로 signup페이지 들어왔을때 value에 값이 있는지 확인
// 값이 남아 있다면 useEffect로 MOUNT될때 초기화 시켜주기!!

// 로그인시 아이디로 프로필을 조회하므로 회원가입시 아이디는 중복되지 않도록 해야함


const SignupPage = () => {
    const [state, setState] = useState({
        value: { nickname: "", id: "", password: "", email: ""},
        error: { nickname: "", id: "", password: "", email: ""}
    })

    const [touched, setTouched] = useState({
        nickname: false,
        id: false,
        password: false,
        email: false,
    })

    const navigate = useNavigate()

    const validate = (name, value) => {
        switch(name) {
            case 'nickname':
                return /^\w+$/.test(value) ? "" : "닉네임이 유효하지 않습니다.";
            case 'id':
                return /^[a-zA-Z][a-zA-Z0-9]{3,19}$/.test(value) ? "" : "아이디가 유효하지 않습니다.";
            case 'password':
                return /^(?=.*[a-zA-Z])(?=.*[!@#$%^+=-])(?=.*[0-9]).{8,16}$/.test(value) ? "" : "비밀번호가 유효하지 않습니다.";

            case 'email':
                return /^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value) ? "" : "이메일이 유효하지 않습니다.";
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
        event.preventDefault()
    
        setTouched({
            nickname: true,
            id: true,
            password: true,
            email: true,
        })
    
        // 모든 필드 검증
        const errors = {
            nickname: validate('nickname', state.value.nickname),
            id: validate('id', state.value.id),
            password: validate('password', state.value.password),
            email: validate('email', state.value.email)
        }
    
        setState(prev => ({
            ...prev,
            error: errors
        }))
    
        // 에러가 하나도 없는지 확인
        const hasNoErrors = Object.values(errors).every(error => error === "")
    
        if (hasNoErrors) {
            const isSuccess = await signUp(state.value)
    
            if (isSuccess) {
                navigate('/login')
            } else {
                alert("회원가입중 오류가 발생했습니다. 나중에 다시 시도해 주세요.")
            }
        }
    }
    
    const signUp = async (userData) => {
        console.log("회원가입중");
    
        try {
            const response = await fetch("/api/signup", {
                method: 'POST',
                headers : {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
    
            // 상태 코드가 200~299 범위를 벗어나면 에러 처리
            if (!response.ok) {
                console.log("회원가입 실패");
                return false
            } else {
                console.log("회원가입 성공");
                return true
            }
    
        } catch (error) {
            console.log("회원가입 중 오류 발생", error);
            return false
        }
    }

    return (
        <>
            <h1>회원가입 페이지</h1>
            <form noValidate onSubmit={HandleSubmit}>
                <AuthInput
                    label="닉네임"
                    type="text"
                    name="nickname"
                    value={state.value.nickname}
                    error={state.error.nickname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched= {touched.nickname}
                    required
                    autoFocus
                />
                <AuthInput
                    label="아이디"
                    type="text"
                    name="id"
                    value={state.value.id}
                    error={state.error.id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched= {touched.id}
                    required
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
                    required
                />
                <AuthInput
                    label="이메일"
                    type="text"
                    name="email"
                    value={state.value.email}
                    error={state.error.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched= {touched.email}
                />
                <button>회원가입</button>
            </form>
        </>
    );
};

export default SignupPage;
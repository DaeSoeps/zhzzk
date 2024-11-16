'use client'
import Link from "next/link";
import "./style.css";
import React, { useState } from 'react';
import api from "../utils/api";
import { useRouter } from 'next/navigation';


const LoginForm: React.FC = () => {
    const router = useRouter();
    
    // 상태 관리
    const [id, setId] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [idError, setIdError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');

    // 입력 검증 함수
    const validateInputs = (): boolean => {
        let isValid = true;
        setIdError('');
        setPasswordError('');

        if (id.trim() === '') {
            setIdError('아이디를 입력해 주세요.');
            isValid = false;
        }

        if (password.trim() === '') {
            setPasswordError('비밀번호를 입력해 주세요.');
            isValid = false;
        }

        return isValid;
    };

    // 폼 제출 핸들러
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); // 폼 제출 기본 동작 방지

        if (validateInputs()) {
            // 로그인 요청 처리
            console.log('로그인 요청을 처리합니다.');
            // 여기에 서버 요청 코드 추가 가능
            try {
                const response = await api.post('http://localhost:3030/auth/login', {username: id, password}, {
                  headers: { 'Content-Type': 'application/json' },
                });
          
                if (response.status === 201) {
                  // JWT 토큰 저장 (예: localStorage)
                  localStorage.setItem('token', response.data.token);
          
                  // 대시보드 페이지로 이동
                  router.push('/');
                }
              } catch (error: any) {
                if (error.response) {
                  // 서버에서 반환한 에러 메시지 처리
                  alert(error.response.data.message || '로그인에 실패했습니다.');
                } else {
                  // 네트워크 에러 또는 기타 에러 처리
                  alert('서버와 통신에 실패했습니다.');
                }
            }
        }
    };

    return (
        <>
            <div className="logo">ZHZZK</div>
            <div className="login-container">
                <h2>로그인</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="id">아이디</label>
                        <input
                            type="text"
                            id="id"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                        />
                        {idError && <span className="error-message">{idError}</span>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">비밀번호</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {passwordError && <span className="error-message">{passwordError}</span>}
                    </div>
                    <button type="submit" className="login-button">로그인</button>
                </form>
                <div className="link-container">
                    <a href="#" className="link">아이디 찾기</a>
                    <a href="#" className="link">비밀번호 찾기</a>
                    <Link href="/register">
                        <span className="link">회원가입</span>
                    </Link>
                </div>
            </div>
        </>
    )

}

export default LoginForm;
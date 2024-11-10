'use client'
import Link from "next/link";
import "./style.css";
import React, { useState } from 'react';


const LoginForm: React.FC = () => {
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
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault(); // 폼 제출 기본 동작 방지

        if (validateInputs()) {
            // 로그인 요청 처리
            console.log('로그인 요청을 처리합니다.');
            // 여기에 서버 요청 코드 추가 가능
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
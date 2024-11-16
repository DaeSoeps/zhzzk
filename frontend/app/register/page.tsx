'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import api from '../utils/api';

const RegisterPage: React.FC = () => {
    const router = useRouter();

    // 폼 필드 상태 관리
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        name: '',
    });

    const [errors, setErrors] = useState({
        username: '',
        password: '',
        email: '',
        name: '',
    });

    // 입력 필드 값 변경 처리
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' }); // 입력 시 해당 필드의 에러 초기화
        console.log("handleChange formData : ", formData, errors)
    };

    // 입력 값 유효성 검사
    const validate = () => {
        const newErrors = { username: '', password: '', email: '', name: ''};
        let isValid = true;

        if (!formData.username) {
            newErrors.username = '아이디는 필수 항목입니다.';
            isValid = false;
        }
        if (formData.password.length < 6) {
            newErrors.password = '비밀번호는 최소 6자 이상이어야 합니다.';
            isValid = false;
        }
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = '유효한 이메일 주소를 입력해 주세요.';
            isValid = false;
        }
        // if (!formData.name) {
        //     newErrors.name = '이름은 필수 항목입니다.';
        //     isValid = false;
        // }
        // if (!formData.phone) {
        //     newErrors.phone = '휴대전화번호는 필수 항목입니다.';
        //     isValid = false;
        // }

        setErrors(newErrors);
        return isValid;
    };

    // 폼 제출 처리
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validate()) return;
        console.log("formData : ", formData)
        try {

            const response = await api.post('/auth/register', formData);
            if (response.status === 201) {
                alert('회원가입이 완료되었습니다.');
                router.push('/login');  // 회원가입 후 로그인 페이지로 이동
            }
        } catch (error) {
            console.error('회원가입 실패:', error);
            alert(`회원가입에 실패했습니다. 다시 시도해 주세요.`);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-center text-2xl font-bold text-green-600 mb-6">ZHZZK</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">아이디</label>
                        <div className="relative mt-1">
                            <input
                                type="text"
                                name="username"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-green-500 text-black"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="아이디"
                                required
                            />
                            {/* <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">@naver.com</span> */}
                        </div>
                        {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">비밀번호</label>
                        <input
                            type="password"
                            name="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-green-500 text-black"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="비밀번호"
                            required
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">이메일</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-green-500 text-black"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="이메일 주소"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    {/* <div>
                        <label className="block text-sm font-medium text-gray-700">이름</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-green-500 text-black"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="이름"
                            required
                        />
                    </div> */}

                    {/* <div>
            <label className="block text-sm font-medium text-gray-700">휴대전화번호</label>
            <div className="flex space-x-2 mt-1">
              <select className="w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-green-500 text-black">
                <option>대한민국 +82</option>
                <option>미국 +1</option>
                <option>일본 +81</option>
              </select>
              <input
                type="tel"
                className="w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-green-500"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="휴대전화번호"
                required
              />
            </div>
          </div> */}

                    <button
                        type="submit"
                        className="w-full py-2 mt-6 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700"
                    >
                        회원가입
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
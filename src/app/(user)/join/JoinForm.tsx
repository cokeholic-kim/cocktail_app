"use client"
import { BASE_URL } from '@/app/(common)/common';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { logWarn } from '@/app/(common)/safeLogger';

type JoinPayload = {
    name: string;
    email: string;
    password: string;
};

function trimText(value: string): string {
    return value.trim();
}

function buildJoinPayload(formData: FormData): JoinPayload {
    return {
        name: trimText(String(formData.get("name") ?? "")),
        email: trimText(String(formData.get("email") ?? "")),
        password: String(formData.get("password") ?? ""),
    };
}

function isValidJoinResponsePayload(
    response: unknown,
): response is { result: { resultCode: number; resultMessage?: string }; body?: string } {
    if (!response || typeof response !== "object" || response === null) {
        return false;
    }

    const typed = response as {
        result?: { resultCode?: unknown; resultMessage?: unknown };
        body?: unknown;
    };

    if (!typed.result || typeof typed.result !== "object") {
        return false;
    }

    if (typeof typed.result.resultCode !== "number") {
        return false;
    }

    if ("body" in typed && typed.body !== undefined && typeof typed.body !== "string") {
        return false;
    }

    return true;
}

function JoinForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const router = useRouter();

    const isValid = !nameError && !emailError && !passwordError && name.length > 0 && email.length > 0 && password.length > 0;
  
    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setValid(isValidName, setNameError, newName);
        setName(newName);
      };
      
      const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setValid(isValidEmail, setEmailError, newEmail);
        setEmail(newEmail);
      };

    const onChangePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setValid(isValidPassword, setPasswordError, newPassword)
        setPassword(newPassword);
    }

    function setValid(
      validFunction: (value: string) => boolean,
      setError: React.Dispatch<React.SetStateAction<boolean>>,
      validData: string
    ) {
      const isValid = validFunction(validData);
      setError(!isValid);
    }

    function isValidName(name: string) {
      const nicknameRegex = /^[가-힣a-zA-Z0-9_-]+$/;
      return name.trim() !== "" && nicknameRegex.test(name);
    }

    function isValidEmail(email: string) {
      if (!email.includes("@") || email.trim() === "") {
        return false;
      }
      return true;
    }

    function isValidPassword(password: string) {
      // 최소 길이 8자 검사
      if (password.length < 8) {
        return false;
      }

      // 대문자, 소문자, 숫자, 특수문자 포함 여부 검사
      const hasUppercase = /[A-Z]/.test(password);
      const hasLowercase = /[a-z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

      if (!hasUppercase || !hasLowercase || !hasNumber || !hasSpecialChar) {
        return false;
      }

      return true;
    }
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const formData = new FormData(e.currentTarget);
        const data = buildJoinPayload(formData);

        if (!isValidName(data.name) || !isValidEmail(data.email) || !isValidPassword(data.password)) {
            alert("입력값 형식이 잘못되었습니다.");
            return;
        }
    
        try {
            const response = await fetch(`${BASE_URL}/join`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                alert("회원가입 요청이 실패했습니다. 잠시 후 다시 시도해주세요.");
                return;
            }

            const contentType = response.headers.get("content-type") || "";
            if (!contentType.includes("application/json")) {
                throw new Error("Invalid response content type");
            }

            const text = await response.text();
            if (!text.trim()) {
                throw new Error("Empty response body");
            }

            const parsed = JSON.parse(text);
            if (!isValidJoinResponsePayload(parsed)) {
                throw new Error("Invalid API response format");
            }

            const { result, body } = parsed;

            if (result.resultCode !== 200) {
                alert("회원가입 처리에 실패했습니다. 입력값을 다시 확인해주세요.");
                return;
            }

            alert(typeof body === "string" ? body : "회원가입이 완료되었습니다.");
            router.push("/");
        } catch (error) {
            logWarn("Join request error", error);
            alert("회원가입 처리 중 오류가 발생했습니다.");
        }
    };

  return (
    <div className="bg-gray-200 flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-xl mb-4">회원 가입</h1>
        <form id="signup-form" method='post'  action={`${BASE_URL}/join`} onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              닉네임
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              onChange={(e)=>onChangeName(e)}
              required
            />
            <p id="name-error" className={`text-red-500 text-xs ${!nameError && "hidden"}`}>
            닉네임은 한글,영어,숫자 특수문자 _ - 만 입력가능합니다
            </p>
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              이메일
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              onChange={(e)=>onChangeEmail(e)}
              required
            />
            <p id="email-error" className={`text-red-500 text-xs ${!emailError && "hidden"}`}>
              유효한 이메일 주소를 입력하세요.
            </p>
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              onChange={(e)=>onChangePassword(e)}
              required
            />
            <p id="password-error" className={`text-red-500 text-xs ${!passwordError && "hidden"}`}>
              패스워드는 8글자 이상, 대문자 소문자 숫자 특수문자를 포함하여야 합니다.
            </p>
          </div>
          <button
            type="submit"
            id="submit-button"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-300"
            disabled = {!isValid}
          >
            제출
          </button>
        </form>
      </div>
    </div>
  )
}

export default JoinForm

"use client"

import { BASE_URL } from "@/app/(common)/common";
import { useLoginContext } from "@/app/(context)/LoginContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { logWarn, logInfo } from "@/app/(common)/safeLogger";

type LoginPayload = {
    username: string;
    password: string;
};

function trimText(value: string): string {
    return value.trim();
}

function buildLoginPayload(formData: FormData): LoginPayload {
    return {
        username: trimText(String(formData.get("username") ?? "")),
        password: trimText(String(formData.get("password") ?? "")),
    };
}

function isSafeLoginPayload(payload: LoginPayload): boolean {
    return payload.username.length >= 3 && payload.password.length >= 8;
}

function extractSafeErrorMessage(rawValue: string | null): string {
    if (!rawValue) {
        return "로그인 처리 중 오류가 발생했습니다.";
    }

    const decoded = safeDecodeURIComponent(rawValue);
    const sanitized = decoded
        .replace(/[\r\n]/g, " ")
        .slice(0, 100);

    return /token|password|secret|credential|session/i.test(sanitized)
        ? "로그인 처리 중 오류가 발생했습니다."
        : sanitized;
}

function safeDecodeURIComponent(value: string): string {
    try {
        return decodeURIComponent(value);
    } catch {
        return "로그인 처리 중 오류가 발생했습니다.";
    }
}

function LoginForm() {
   const router = useRouter();
   const { isLogin, setIsLogin } = useLoginContext();

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const payload = buildLoginPayload(formData);

        if (!isSafeLoginPayload(payload)) {
            logInfo("Login validation failed");
            alert("아이디 또는 비밀번호 형식이 올바르지 않습니다.");
            return;
        }
        
       try {
          const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
            credentials: 'include'
          });
          
          if (response.ok) {
                setIsLogin(true);
                router.push('/');
            } else {
                alert('로그인에 실패했습니다. 다시 시도해주세요.');
                if (response.status >= 500) {
                    logWarn("Login request failed with server error", response.status);
                }
                return;
            }
        } catch (error) {
            logWarn("Login request error", error);
            alert("로그인 처리 중 오류가 발생했습니다.");
        }
   }

   const onNaverLogin = () => {
    window.location.href = BASE_URL + "/oauth2/authorization/naver";
   }

   const onGoogleLogin = () => {
    window.location.href = BASE_URL + "/oauth2/authorization/google";
   }

   const showErrorAlert = () => {
     const urlParams = new URLSearchParams(window.location.search);
     const error = urlParams.get("error");

     if (error) {
       const message = extractSafeErrorMessage(error);
       alert(message);
     }
   };

   useEffect(() => {
     showErrorAlert();
   }, []);

   return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white w-full max-w-lg py-10 rounded-lg text-center px-5">
        <h3 className="text-3xl text-gray-800">Log In</h3>
        <form className="flex flex-col mt-5" onSubmit={handleSubmit}>
          <input
            placeholder="Email"
            className="bg-gray-100 shadow-inner focus:outline-none border-2 focus:border-opacity-50 focus:border-green-600 mb-3 py-3 px-5 rounded-lg text-black"
            name="username"
          />
          <input
            type="password"
            placeholder="Password"
            className="bg-gray-100 shadow-inner focus:outline-none border-2 focus:border-opacity-50 focus:border-green-600 py-3 px-5 rounded-lg text-black"
            name="password"
          />
          <button type="submit" className="py-3 px-5 bg-gray-800 text-white mt-3 text-lg rounded-lg focus:outline-none hover:opacity-90">
            Log In
          </button>
        </form>
        <hr className="h-1 my-8 bg-gray-200 border-0 dark:bg-gray-700 rounded"></hr>
        <div className="flex flex-col">
          <button onClick={onNaverLogin} className="rounded-lg focus:outline-none hover:opacity-90 flex items-center" style={{ background: "#03c75a" }}>
              <Image
                src={"/assets/naver_icon.png"}
                alt={"네이버 로그인"}
                width={50}
                height={50}
                className="h-full object-contain"
              />
              <p className="text-white ml-32 text-lg">네이버로 로그인</p>
            </button>
            <button onClick={onGoogleLogin} className="py-2 mt-3 rounded-lg focus:outline-none hover:opacity-90 flex items-center border relative">
              <Image
                src={"/assets/google_icon.png"}
                alt={"구글 로그인"}
                width={30}
                height={30}
                className="ml-4 h-full object-contain"
              />
              <p className="ml-40 text-lg">구글 로그인</p>
            </button>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;

"use client"

import { BASE_URL } from "@/app/(common)/common";
import { useLoginContext } from "@/app/(context)/LoginContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function LoginForm() {
   const router = useRouter();
   const { isLogin, setIsLogin } = useLoginContext();

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        
        try {
          const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: 'include'
          });
          
          if (response.ok) {
                const headers = response.headers;
                const jwtToken = headers.get("Authorization");

                setIsLogin(true);
                router.push('/');
            } else {
                alert('Login failed. Please check your credentials');
                window.location.reload();
            }
        } catch (error) {
             alert('Error submitting form: ' + error);
        }
   }

   const onNaverLogin = () => {
    alert(BASE_URL + "/oauth2/authorization/naver")
    window.location.href = BASE_URL + "/oauth2/authorization/naver";
   }

   const onGoogleLogin = () => {
    window.location.href = BASE_URL + "/oauth2/authorization/google";
   }

   const getData = () => {
    fetch(BASE_URL + "/my", {
      method: 'GET',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => { alert(data); })
    .catch(error => alert(error));
   }

   const showErrorAlert = () => {
     const urlParams = new URLSearchParams(window.location.search);
     const error = urlParams.get("error");

     if (error) {
       alert(decodeURIComponent(error)); // 에러 메시지를 alert로 표시
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

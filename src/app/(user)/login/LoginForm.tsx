"use client"
import { BASE_URL } from "@/app/(common)/common";
import { useLoginContext } from "@/app/(context)/LoginContext";
import { setCookie } from "cookies-next";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";

function LoginForm() {
    const router = useRouter()
    const { isLogin , setIsLogin } = useLoginContext();
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
            });

            if(response.ok){
                const headers = response.headers;
                const jwtToken = headers.get("authorization");

                // sessionStorage.setItem('authToken', jwtToken!);
                const cookieExpiration = 60 * 60; // 60분
                setCookie('authToken',jwtToken,{
                  maxAge: cookieExpiration,
                })
                
                
                setIsLogin(true);
                router.push('/');
            }else{
                alert('Login failed. Please check your credentials');
                window.location.reload();
            }
          } catch (error) {
            console.error('Error submitting form:', error);
          }
   }
  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white w-full max-w-lg py-10 rounded-lg text-center">
        <h3 className="text-3xl text-gray-800">Log In</h3>
        <form className="flex flex-col mt-5 px-5" onSubmit={handleSubmit}>
          <input
            placeholder="Email"
            className="bg-gray-100 shadow-inner focus:outline-none border-2 focus:border-opacity-50 focus:border-green-600 mb-3 py-3 px-5 rounded-lg"
            name="username"
          />
          <input
            type="password"
            placeholder="passworld "
            className="bg-gray-100 shadow-inner focus:outline-none border-2 focus:border-opacity-50 focus:border-green-600 py-3 px-5 rounded-lg"
            name="password"
          />
          <button className="py-3 px-5 bg-gray-800 text-white mt-3 text-lg rounded-lg focus:outline-none hover:opacity-90">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm

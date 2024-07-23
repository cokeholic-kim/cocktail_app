import { BASE_URL } from "@/app/(common)/common";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { useState } from "react";

interface IngredientRequset{
    ingredientName: string;
    enName: string;
    image: File;
    description: string;
    category: string;
  }

interface formProps {
  handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>, setNewIngredientPage: React.Dispatch<React.SetStateAction<boolean>>) => Promise<void>;
  setNewIngredientPage: React.Dispatch<React.SetStateAction<boolean>>;
}
function Form({handleChange,handleSubmit,setNewIngredientPage}:formProps){

    return (
        <form id="signup-form" method='post' onSubmit={(event) => handleSubmit(event,setNewIngredientPage)}   
          className='bg-white rounded p-10' style={{width:"48%"}}
        >
            <div className="mb-4">
              <label
                htmlFor="ingredientName"
                className="block text-sm font-medium text-gray-700"
              >
                재료이름
              </label>
              <input
                type="text"
                id="ingredientName"
                name="ingredientName"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                onChange={handleChange}
                required
              />
             
            </div>
            <div className="mb-4">
              <label
                htmlFor="enName"
                className="block text-sm font-medium text-gray-700"
              >
                영문 재료명
              </label>
              <input
                id="enName"
                name="enName"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                onChange={handleChange}
                required
              />
              <p id="enName-error" className={`text-red-500 text-xs hidden`}>
                영어로 입력하여야 합니다.
              </p>
            </div>
            <div className="mb-4">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                카테고리 
              </label>
             
              <select
                id="category"
                name="category" 
                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                onChange={handleChange}
              >
                <option value={""}></option>
                <option value={"술(고도수)"}>술(고도수)</option>
                <option value={"술(저도수)"}>술(저도수)</option>
                <option value={"주스"}>주스</option>
                <option value={"과일"}>과일</option>
                <option value={"기타"}>기타</option>
              </select>
          
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                재료 설명
              </label>
              <textarea
                id="description"
                name="description"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                재료 이미지
              </label>
              <input
                type='file'
                id="image"
                name="image"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 file:bg-slate-800 file:text-white cursor-pointer"
                onChange={handleChange}
                required
              />
             
            </div>
            <button
              type="submit"
              id="submit-button"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-300"
            >
              제출
            </button>
          </form>
    )
}

export default function NewIngredientForm({setNewIngredientPage}:{setNewIngredientPage: React.Dispatch<React.SetStateAction<boolean>>}){
    const [newIngredient,setNewIngredient] = useState<IngredientRequset>({
      ingredientName: "",
      enName: "",
      image:new File([], '') ,
      description: "",
      category: "",
    });
    
    const handleSubmit = async (event:React.FormEvent<HTMLFormElement>,setNewIngredientPage: React.Dispatch<React.SetStateAction<boolean>>) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append("ingredientName", newIngredient.ingredientName);
      formData.append("enName", newIngredient.enName);
      formData.append("image", newIngredient.image);
      formData.append("description", newIngredient.description);
      formData.append("category", newIngredient.category);
      try{
        const authToken = getCookie("authToken")
        const response = await fetch(`${BASE_URL}/user/ingredientRegister`,{
          method: "POST",
          headers: {
            "Authorization": `${authToken}`,
          },
          body: formData,
        })
        if(response.ok) {
          alert(`${newIngredient.ingredientName} 이 저장되었습니다.`)
          setNewIngredientPage(false);
        } else{
          const errorData = await response.json()
          alert(errorData.result.resultMessage)
        }
        
      }catch (error) {
        alert("Error submitting cocktail request:" + error)
      }
    }
  
    const handleChange: React.ChangeEventHandler<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    > = (e) => {
      if(e.target instanceof HTMLInputElement){
        const target = e.target as HTMLInputElement
        setNewIngredient((prevState) => {
            const { name, value } = e.target;
            console.log(prevState);
            if(name === "image"){
                return {
                  ...prevState || {},
                  image: target.files![0],
                };
            }else{
                return {
                    ...prevState || {},
                    [name]: value,
                  }; 
            }
          });
      }else{
          setNewIngredient((prevState) => {
            const { name, value } = e.target;
            console.log(prevState);
            return {
              ...prevState,
              [name]: value,
            };
          });
      }
    };
  
    return (
      <div className="flex w-full justify-between">
        <Form handleChange={handleChange} handleSubmit={handleSubmit} setNewIngredientPage={setNewIngredientPage}/>
        <div className="bg-white rounded  h-full p-10" style={{ width: "48%" }}>
          {newIngredient.image  &&  (
            <div className="w-full mb-4 relative" style={{ height: "30vh" }}>
              <div className="absolute inset-0 bg-slate-300 flex items-center justify-center">
                <Image
                  src={URL.createObjectURL(newIngredient.image)}
                  alt="Uploaded Cocktail"
                  width={400}
                  height={400}
                  className="rounded-t-lg w-full h-full object-contain"
                />
              </div>
            </div>
          )}
            <div className="mb-4">
                { newIngredient.ingredientName && "재료명 : " + newIngredient.ingredientName}
            </div>
            <div className="mb-4">
                {newIngredient.enName && "영어명 : " + newIngredient.enName}
            </div>
            <div className="mb-4">
                {newIngredient.category && "카테고리 : " + newIngredient.category}
            </div>
            <div className="mb-4">
                {newIngredient.description && "설명 " + newIngredient.description}
            </div>
        </div>
      </div>
    );
  }
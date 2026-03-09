import React from 'react'

function SearchBox({placeHolder,setSearchValue}:{placeHolder:string,setSearchValue: 
    React.Dispatch<React.SetStateAction<string>>}) {
  return (
    <nav className="flex items-center px-6 py-5 w-full z-10 transition-all duration-500 bg-black/80">
        <input
          className="bg-gray-800 rounded-md text-white px-3 py-2 w-full focus:outline-none"
          type="text"
          placeholder={placeHolder}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </nav>
  )
}

export default SearchBox

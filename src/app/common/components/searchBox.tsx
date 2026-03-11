import React from 'react'
import { uiTokenStyles } from '@/app/(common)/components/uiTokens';

function SearchBox({placeHolder,setSearchValue}:{placeHolder:string,setSearchValue: 
    React.Dispatch<React.SetStateAction<string>>}) {
  return (
    <nav className={uiTokenStyles.search.wrapper}>
        <input
          className={uiTokenStyles.search.input}
          type="text"
          placeholder={placeHolder}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </nav>
  )
}

export default SearchBox

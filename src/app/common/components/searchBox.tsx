import React from 'react'
import { uiTokenStyles } from '@/app/(common)/components/uiTokens';

function SearchBox({placeHolder,setSearchValue}:{placeHolder:string,setSearchValue: 
    React.Dispatch<React.SetStateAction<string>>}) {
  return (
    <form className={uiTokenStyles.search.wrapper} role="search" onSubmit={(event) => event.preventDefault()}>
        <input
          className={uiTokenStyles.search.input}
          type="text"
          placeholder={placeHolder}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </form>
  )
}

export default SearchBox

import React from 'react'
import InputField from './inputField';

const SearchBox = ({ onChange }) => {
  return (
    <InputField
      placeholder={'Search ...'}
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  )
}

export default SearchBox

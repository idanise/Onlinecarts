import React, { useState, useEffect } from 'react'

const Checkbox = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([])

  const handleToggle = category => () => {
    //return the first index of -1
    const currentCategoryId = checked.indexOf(category)
    const newCheckedCategoryId = [...checked]

    //if currently checked was not already in checked state > push
    /// else pull/take off
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(category)
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1)
    }
    setChecked(newCheckedCategoryId)
    handleFilters(newCheckedCategoryId)
  }

  return categories.map((category, i) => (
    <li key={i} className='list-unstyled'>
      <input
        value={checked.indexOf(category._id === -1)}
        onChange={handleToggle(category._id)}
        type='checkbox'
        className='form-check-input'
      />
      <label className='form-check-label'>{category.name}</label>
    </li>
  ))
}

export default Checkbox

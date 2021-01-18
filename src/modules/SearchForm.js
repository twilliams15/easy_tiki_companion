import React from 'react'

export function SearchForm({onNameChange, onIngredientChange}) {
  return (
    <form id="search">
      <p>Search for a drink</p>
      <label htmlFor="drinkName">by name: </label>
      <input
        id="drinkName"
        type="text"
        autoComplete="off"
        onChange={onNameChange}
      />
      <br />
      <label htmlFor="ingredient">by ingredient: </label>
      <input
        id="ingredient"
        type="text"
        autoComplete="off"
        onChange={onIngredientChange}
      />
      <br />
    </form>
  )
}

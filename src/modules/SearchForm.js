import React from 'react'

export class SearchForm extends React.Component {
  componentDidMount() {
    this.props.onMount();
  }

  render() {
    return (
      <form id="search">
        <p>Search for a drink</p>
        <label htmlFor="drinkName">by name: </label>
        <input
          id="drinkName"
          type="text"
          autoComplete="off"
          onChange={this.props.onNameChange}
        />
        <br/>
        <label htmlFor="ingredient">by ingredient: </label>
        <input
          id="ingredient"
          type="text"
          autoComplete="off"
          onChange={this.props.onIngredientChange}
        />
        <br/>
      </form>
    )
  }
}

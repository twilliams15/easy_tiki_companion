import React from 'react'
import {
  countDrinksMissingMostCommonIngredient,
  mostCommonMissingIngredient,
} from '../support/helpers'

export class Insights extends React.Component {
  constructor(props) {
    super(props)
    this.inStock = props.inStock
  }

  componentDidMount() {
    this.props.onMount()
  }

  render() {
    return (
      <div id="insights">
        {countDrinksMissingMostCommonIngredient(this.inStock) > 1 ? (
          <>
            <p>
              <strong>
                With {mostCommonMissingIngredient(this.inStock)}, you could make{' '}
                {countDrinksMissingMostCommonIngredient(this.inStock)} more drinks!
              </strong>
            </p>
            <p>
              They’re listed below, along with the other drinks missing just 1
              ingredient...
            </p>
          </>
        ) : (
          <p>Here are the drinks missing just 1 ingredient...</p>
        )}
      </div>
    )
  }
}

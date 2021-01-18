import React from 'react'
import {
  countDrinksMissingMostCommonIngredient,
  mostCommonMissingIngredient,
} from '../support/helpers'

export class Insights extends React.Component {
  componentDidMount() {
    this.props.onMount()
  }

  render() {
    const {inStock} = this.props
    return (
      <div id="insights">
        {countDrinksMissingMostCommonIngredient(inStock) > 1 ? (
          <>
            <p>
              <strong>
                With {mostCommonMissingIngredient(inStock)}, you could make{' '}
                {countDrinksMissingMostCommonIngredient(inStock)} more drinks!
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

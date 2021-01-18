import React from 'react'
import allIngredients from '../data/all_ingredients'

export class InStock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {symbol: '+'}
    this.toggleAccordion = this.toggleAccordion.bind(this)
  }

  componentDidMount() {
    this.props.onMount()
  }

  toggleAccordion() {
    [...document.getElementsByClassName('stock')].forEach(this.toggleItemDisplay)
    this.toggleSymbol()
  }

  toggleSymbol() {
    this.state.symbol === '+'
      ? this.setState({symbol: '–'})
      : this.setState({symbol: '+'})
  }

  toggleItemDisplay(item) {
    item.style.display === 'block'
      ? (item.style.display = 'none')
      : (item.style.display = 'block')
  }

  render() {
    return (
      <form id="in-stock">
        <p role="button" className="accordion" onClick={this.toggleAccordion}>
          <strong>
            Current stock <em>({this.state.symbol})</em>
          </strong>
        </p>
        {[...Object.keys(allIngredients)].sort().map((c) => (
          <ul key={c} className="stock">
            ~{c}~
            {[...Object.keys(allIngredients[c])].sort().map((i) => {
              return (
                <li key={allIngredients[c][i]} className="stock">
                  <input
                    id={allIngredients[c][i]}
                    type="checkbox"
                    onChange={this.props.onStockChange}
                    checked={this.props.inStock.includes(`+${allIngredients[c][i]}`)}
                  />
                  <label htmlFor={allIngredients[c][i]}>
                    {allIngredients[c][i]}
                  </label>
                </li>
              )
            })}
          </ul>
        ))}
        <p>With what you have in stock...</p>
      </form>
    )
  }
}

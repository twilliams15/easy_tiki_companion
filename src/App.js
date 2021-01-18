import React from 'react'
import './styles.css'
import allDrinks from './data/all_drinks'
import {
  findDrinksByIngredient,
  findDrinksByName,
  findDrinksMissingOneIngredient,
} from './support/helpers'
import {SearchForm} from './modules/SearchForm'
import {InStock} from './modules/InStock'
import {DrinkList} from './modules/DrinkList'
import {Insights} from './modules/Insights'

export default function App() {
  const [stock, setStock] = React.useState(
    window.localStorage.getItem('easy_tiki_stock') || ''
  )
  const [displayedDrinks, setDisplayedDrinks] = React.useState(
    getAvailableDrinks(stock)
  )

  function getAvailableDrinks(fromStock = stock) {
    return allDrinks.filter((d) =>
      d.ingredients.every((i) => fromStock.includes(i))
    )
  }

  function handleStockChange(e) {
    let tempStock = stock
    const item = e.target;
    const addItemToTempStock = () => tempStock += item.id
    const removeItemFromTempStock = () => tempStock = tempStock.replace(item.id, '')
    item.checked
      ? addItemToTempStock()
      : removeItemFromTempStock()
    setStock(tempStock)
    window.localStorage.setItem('easy_tiki_stock', tempStock)
    setDisplayedDrinks(getAvailableDrinks(tempStock))
  }

  function displayInStock() {
    document.getElementById('in-stock').style.display = 'block'
    document.getElementById('drink-list').style.display = 'block'
    ;[
      document.getElementById('search'),
      document.getElementById('insights'),
    ].forEach((m) => {
      m.style.display = 'none'
    })
    setDisplayedDrinks(getAvailableDrinks())
  }

  function displaySearch() {
    document.getElementById('search').style.display = 'block'
    document.getElementById('drink-list').style.display = 'block'
    ;[
      document.getElementById('in-stock'),
      document.getElementById('insights'),
    ].forEach((m) => {
      m.style.display = 'none'
    })
    setDisplayedDrinks([])
  }

  function displayInsights() {
    document.getElementById('insights').style.display = 'block'
    document.getElementById('drink-list').style.display = 'block'
    ;[
      document.getElementById('search'),
      document.getElementById('in-stock'),
    ].forEach((m) => {
      m.style.display = 'none'
    })
    setDisplayedDrinks(findDrinksMissingOneIngredient(stock))
  }

  return (
    <div>
      <h1>Easy Tiki Companion</h1>
      <nav>
        <ul>
          <li onClick={displayInStock}>In Stock</li>
          <li onClick={displaySearch}>Search</li>
          <li onClick={displayInsights}>Insights</li>
        </ul>
      </nav>
      <InStock
        onStockChange={handleStockChange}
        inStock={stock}
      />
      <SearchForm
        onNameChange={(e) => setDisplayedDrinks(findDrinksByName(e.target.value))}
        onIngredientChange={(e) =>
          setDisplayedDrinks(findDrinksByIngredient(e.target.value))
        }
      />
      <Insights
        inStock={stock}
      />
      <DrinkList drinks={displayedDrinks} inStock={stock} />
      <footer />
    </div>
  )
}

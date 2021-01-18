import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom'
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
    window.localStorage.getItem('easy_tiki_stock') || '',
  )
  const [displayedDrinks, setDisplayedDrinks] = React.useState(
    getAvailableDrinks(stock),
  )

  function getAvailableDrinks(fromStock = stock) {
    return allDrinks.filter((d) =>
      d.ingredients.every((i) => fromStock.includes(`+${i}`)),
    )
  }

  function handleStockChange(e) {
    let tempStock = stock
    const item = e.target
    const addItemToTempStock = () => tempStock += `+${item.id}`
    const removeItemFromTempStock = () => tempStock = tempStock.replace(`+${item.id}`, '')
    item.checked
      ? addItemToTempStock()
      : removeItemFromTempStock()
    setStock(tempStock)
    window.localStorage.setItem('easy_tiki_stock', tempStock)
    setDisplayedDrinks(getAvailableDrinks(tempStock))
  }

  function displayInStock() {
    setDisplayedDrinks(getAvailableDrinks())
  }

  function displaySearch() {
    setDisplayedDrinks([])
  }

  function displayInsights() {
    setDisplayedDrinks(findDrinksMissingOneIngredient(stock))
  }

  return (
    <div>
      <h1>Easy Tiki Companion</h1>
      <Router>
        <nav>
          <ul>
            <Link to="/">In Stock</Link>
            <Link to="/search">Search</Link>
            <Link to="/insights">Insights</Link>
          </ul>
        </nav>
        <Switch>
          <Route path="/insights">
            <Insights
              onMount={displayInsights}
              inStock={stock}
            />
          </Route>
          <Route path="/search">
            <SearchForm
              onMount={displaySearch}
              onNameChange={(e) => setDisplayedDrinks(findDrinksByName(e.target.value))}
              onIngredientChange={(e) =>
                setDisplayedDrinks(findDrinksByIngredient(e.target.value))
              }
            />
          </Route>
          <Route path="/">
            <InStock
              onMount={displayInStock}
              onStockChange={handleStockChange}
              inStock={stock}
            />
          </Route>
        </Switch>
      </Router>
      <DrinkList drinks={displayedDrinks} inStock={stock}/>
      <footer/>
    </div>
  )
}

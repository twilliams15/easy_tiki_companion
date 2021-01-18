import React from 'react'
import {Drink, DrinkList} from '../DrinkList'
import {mount} from 'cypress-react-unit-test'
import i from '../../data/all_ingredients'
import '../../styles.css'

const drinks = [
  {
    name: 'Donga Punch',
    page: 61,
    ingredients: [
      i.rums.aged_martinique,
      i.juices.lime,
      i.misc.donns_mix,
    ],
  },
  {
    name: 'Mai Tai',
    page: 77,
    ingredients: [
      i.rums.aged_jamaican,
      i.liqueurs.curacao,
      i.juices.lime,
      i.syrups.demerara,
      i.syrups.orgeat,
    ],
  },
]

const inStock = [
  i.rums.aged_martinique,
  i.misc.donns_mix,
  i.rums.aged_jamaican,
  i.liqueurs.curacao,
  i.syrups.demerara,
  i.syrups.orgeat,
  i.juices.lime,
]

before(() => {
  mount(<DrinkList drinks={drinks} inStock={inStock}/>)
})

it('displays the number of drinks found', () => {
  cy.contains(`${drinks.length} drinks found`).should('be.visible')
})

it('lists the drinks', () => {
  cy.get('.drink').should('have.length', 2)
  drinks.forEach(drink => {
    cy.contains(drink.name).should('be.visible')
  })
})
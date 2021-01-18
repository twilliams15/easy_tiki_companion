import React from 'react'
import {Insights} from '../Insights'
import {mount} from 'cypress-react-unit-test'
import '../../styles.css'
import i from '../../data/all_ingredients'

const inStock = [
  i.rums.aged_martinique,
  i.misc.donns_mix,
  i.rums.aged_jamaican,
  i.liqueurs.curacao,
  i.syrups.demerara,
  i.syrups.orgeat,
]

const onMount = () => {}

it('tells user about drinks missing 1 ingredient', () => {
  mount(<Insights inStock={[]} onMount={onMount}/>)
  cy.contains(/here are the drinks missing just 1 ingredient/i).should('be.visible')
})

it('tells user about multiple drinks missing the same ingredient', () => {
  mount(<Insights inStock={inStock} onMount={onMount}/>)
  cy.contains(/with lime juice, you could make 2 more drinks/i).should('be.visible')
  cy.contains(/they’re listed below, along with the other drinks missing just 1 ingredient/i).should('be.visible')
})
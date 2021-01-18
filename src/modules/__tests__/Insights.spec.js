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
  i.juices.lime,
]

before(() => {
  mount(<Insights inStock={inStock} />)
})

it('', () => {
  cy.contains(/here are the drinks missing just 1 ingredient/i).should('be.visible')
})
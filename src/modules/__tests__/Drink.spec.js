import {Drink} from '../Drink'
import React from 'react'
import {mount} from 'cypress-react-unit-test'
import i from "../../data/all_ingredients"
import '../../styles.css'

const drink = {
    name: 'Donga Punch',
    page: 61,
    ingredients: [
        i.rums.aged_martinique,
        i.juices.lime,
        i.misc.donns_mix,
    ],
};

const inStock = [
    i.rums.aged_martinique,
    i.misc.donns_mix,
]

before(() => {
    mount(<Drink drink={drink} inStock={inStock} />)
})

it('renders a title, page number, and list of ingredients', () => {
    cy.get('h2').should('have.text', `${drink.name}  p. ${drink.page}`)
    cy.get('.ingredients li').should('have.length', drink.ingredients.length)
    drink.ingredients.forEach(ingredient => {
        cy.get('.ingredients').should('contain.text', ingredient)
    })
})

it('adds an asterisk to missing ingredients', () => {
    drink.ingredients.forEach(ingredient => {
        if (!inStock.includes(ingredient)) {
            cy.get('.ingredients').should('contain.text', `${ingredient} *`)
        }
    })
})
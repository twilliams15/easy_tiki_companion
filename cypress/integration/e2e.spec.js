beforeEach(() => {
  cy.viewport('iphone-x')
  cy.visit('/')
})

describe('keeping stock', () => {
  it('expanding stock shows stock items', () => {
    cy.get('.stock').should('not.be.visible')
    cy.get('.accordion').click()
    cy.get('.stock').should('be.visible')
  })

  it('stores stock in local storage', () => {
    cy.get('.accordion').click()
    cy.get('#orgeat')
      .check()
      .then(() => {
        expect(localStorage.getItem('easy_tiki_stock')).to.equal('orgeat')
      })
  })

  it('reads stock from local storage', () => {
    localStorage.setItem('easy_tiki_stock', 'orgeat')
    cy.reload()
    cy.get('.accordion').click()
    cy.get('#orgeat').should('be.checked')
  })

  it('search by stock returns correct drinks', () => {
    cy.get('.accordion').click()
    cy.contains('orange juice').click()
    cy.contains('lime juice').click()
    cy.contains('donn\'s spices #2').click()
    cy.contains('cane syrup').click()
    cy.contains('cinnamon syrup').click()
    cy.contains('honey syrup').click()
    cy.contains('passion fruit syrup').click()
    cy.contains('aged blended rum').click()
    cy.contains('unaged blended rum').click()
    cy.contains('demerara rum').click()
    cy.get('.drink')
      .should('have.length', 2)
      .and('include.text', 'Nui Nui')
      .and('include.text', 'Puka-Puka Punch')
  })
})

describe('searching for drinks', () => {
  beforeEach(() => {
    cy.contains('Search').click()
  })

  it('search for drink returns correct drink', () => {
    cy.get('#drinkName').type('donga')
    cy.get('.drink').should('have.length', 1).and('include.text', 'Donga Punch')
  })

  it('search for ingredient returns correct drinks', () => {
    cy.get('#ingredient').type('passion')
    cy.get('.drink')
      .each((d) => d.children())
      .should('include.text', 'passion fruit')
  })
})

describe.skip('insights', () => {
  beforeEach(() => {
    cy.get('.accordion').click()
    cy.contains('lime juice').click()
    cy.contains('demerara syrup').click()
    cy.contains('allspice dram').click()
    cy.contains('blended aged rum (3)').click()
    cy.contains('angostura bitters').click()

    cy.contains('Insights').click()
  })

  it('find drinks missing 1 ingredient returns correct drinks', () => {
    cy.get('.drink')
      .should('have.length', 5)
      .and('include.text', 'Grog')
      .and('include.text', 'Rum Flip')
      .and('include.text', 'Daiquiri No. 1')
      .and('include.text', 'Corn & Oil')
      .and('include.text', 'Paniolo Old-Fashioned')
  })

  it('suggestions appear when more than 1 drink can be made with 1 additional ingredient', () => {
    cy.contains('In Stock').click()
    cy.contains('lime juice').click()
    cy.contains('Insights').click()
    cy.contains('With lime juice, you could make 2 more drinks!').should(
      'be.visible'
    )
  })
})

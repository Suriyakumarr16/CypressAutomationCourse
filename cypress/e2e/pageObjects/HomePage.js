class HomePage
{
getSearchBox()
{
    return cy.get('input#small-searchterms')
}

getSearchBtn()
{
    return cy.get('#small-search-box-form > .button-1')
}

getLoginBtn()
{
    return cy.get('a[href*="login"]')
}

getMyAccountBtn()
{
    return cy.get('.ico-account')
}
}

export default HomePage;
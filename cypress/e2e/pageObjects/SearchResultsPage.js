class SearchResultsPage
{
getProductItems()
{
    return cy.get('.product-item')
}

getProductTitle()
{
    return cy.get('h2.product-title a')
}

getAddToCartBtn()
{
    return cy.get('.product-box-add-to-cart-button')
}


}

export default SearchResultsPage;
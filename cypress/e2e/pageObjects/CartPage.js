class CartPage
{
getTotalAmtTxt()
{
    return cy.get('.order-total .value-summary')
}

}

export default CartPage;
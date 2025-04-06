class ProductDetailsPage
{
getPriceofProduct()
{
    return cy.get('.product-price span')
}

getQtyTextBox()
{
    return cy.get('input#product_enteredQuantity_4')
}

getAddToCartBtn()
{
    return cy.get('button#add-to-cart-button-4')
}

getShoppingCartLnk()
{
    return cy.get('#topcartlink a[href="/cart"]')
}

}

export default ProductDetailsPage;
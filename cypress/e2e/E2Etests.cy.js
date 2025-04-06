/// <reference types="Cypress" />
import HomePage from "./pageObjects/HomePage"
import SearchResultsPage from "./pageObjects/SearchResultsPage"
import LoginPage from "./pageObjects/LoginPage"
import RegisterPage from "./pageObjects/RegisterPage"
import ProductDetailsPage from "./pageObjects/ProductDetailsPage"
import CartPage from "./pageObjects/CartPage"



const homePage = new HomePage()
const searchResultsPage = new SearchResultsPage()
const loginPage = new LoginPage()
const registerPage = new RegisterPage()
const productDetailsPage = new ProductDetailsPage()
const cartPage = new CartPage()

describe('E2Etests', function()
{

beforeEach(function()
{
    cy.fixture('example').then(function(data)
    {
        this.data=data
    }
    )
})

it('Add To Cart', function()
{
    
    cy.visit(Cypress.env('url'))
    homePage.getSearchBox().type(this.data.product)
    homePage.getSearchBtn().click()

    searchResultsPage.getProductItems().each(($el,index,$list) =>
    {
        if($el.text().includes('Apple MacBook'))
        {
            searchResultsPage.getAddToCartBtn().eq(index).trigger("click")
    }
})
     var expectedprice=0
     productDetailsPage.getPriceofProduct().then(function(priceofoneqty)
    {
      const pricetext = priceofoneqty.text()
       expectedprice = pricetext.split("$")
      expectedprice = expectedprice[1].replace(/\D/g, '')
      expectedprice = Number(expectedprice)*2
    }
    ).then(function()
    {
    cy.log('expected price ' + '= ' + expectedprice)
    })
    productDetailsPage.getQtyTextBox().clear()
    productDetailsPage.getQtyTextBox().type(this.data.quantity)
    productDetailsPage.getAddToCartBtn().click()

    productDetailsPage.getShoppingCartLnk().click()
    cartPage.getTotalAmtTxt().then(function(subtotal)  {
        const actualtotalpricetext = subtotal.text()
        var actualtotalprice = actualtotalpricetext.split("$")
        actualtotalprice = actualtotalprice[1].replace(/\D/g, '')
       expect(Number(actualtotalprice)).to.equal(expectedprice)
    }
    )

})

var validmailid
it('Registration', function()
{
    cy.visit(Cypress.env('url')+"login?returnUrl=%2")
    loginPage.getRegisterBtn().click()
    registerPage.getGenderRdoBtn().check().should('be.checked')
    registerPage.getFirstNameTextBox().type(this.data.firstname)
    registerPage.getLastNameTextBox().type(this.data.lastname)
    registerPage.getDayDrpdown().select(this.data.day).should('have.value','16')
    registerPage.getMonthDrpdown().select(this.data.month).should('have.value','6')
    registerPage.getYearDrpdown().select(this.data.year).should('have.value','1998')
    const randomnum = () => Cypress._.random(0, 1e6)
    const num = randomnum()
    validmailid = `test${num}@test.com`
    this.data.mailid = validmailid
    registerPage.getEmailTextBox().type(this.data.mailid)
    registerPage.getCompanyTextBox().type(this.data.company)
    registerPage.getNewsLetterRdoBtn().uncheck().should('not.be.checked')
    registerPage.getNewsLetterRdoBtn().check().should('be.checked')
    registerPage.getPasswordTextBox().type(this.data.password)
    registerPage.getConfirmPasswordTextBox().type(this.data.confirmpassword)
    registerPage.getRegisterBtn().click()
    registerPage.getRegistrationText().should('have.text',this.data.regconfirmationtext)

    
     
}
)


it('ValidLogin', function()
{
    cy.visit(Cypress.env('url'))
    homePage.getLoginBtn().click()
    this.data.authemail=validmailid
    cy.login(this.data.authemail,this.data.authpassword)
    homePage.getMyAccountBtn().should('be.visible')
})

it('InvalidLogin', function()
{
    cy.visit(Cypress.env('url'))
    homePage.getLoginBtn().click()
    cy.login(this.data.invalidemail,this.data.invalidpassword)
    loginPage.getLoginErrorMsg().should('be.visible')
})

it('XHRResponseMockTesting', function()
{
    cy.visit(Cypress.env('url'))
    
cy.intercept(
    {
        method : 'GET',
        url : 'https://demo.nopcommerce.com/catalog/searchtermautocomplete?term=Apple'
    },
    {
        statusCode : 200,
        body : [
            {
                
                    "label": "Apple iCam",
                    "producturl": "/apple-icam",
                    "productpictureurl": null,
                    "showlinktoresultsearch": false
                
            }
        ]
    }
).as('searchretreivals')
cy.get('.search-box-text').type('Apple')
cy.wait('@searchretreivals').then(({request,response}) =>
{
    cy.get('.ui-menu-item').should('have.length',response.body.length)
})
cy.get('.ui-menu-item').should("have.text","Apple iCam")

//Demonstrate on Mocking API with stub response using Cypres
}
)

it('XHRAPITest',function()
{
    cy.request('POST', 'https://reqres.in/api/users?page=2',
    {
      "email": "george.edwards@reqres.in",
      "first_name": "George",
      "last_name": "Edwards",
      "avatar": "https://reqres.in/img/faces/11-image.jpg"
    }).then((response) =>
    {
        expect(response.status).to.equal(201)
        expect(response.body).to.have.property("first_name", "George")
    })


    //Handle API call directly without involving browser with cypres
})


}


)
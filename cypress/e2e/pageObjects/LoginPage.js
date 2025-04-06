class LoginPage
{
getRegisterBtn()
{
    return cy.get('.register-button')
}

getLoginErrorMsg()
{
    return cy.get('.message-error')
}

getEmailTxtBox()
{
    return cy.get('#Email')
}

}

export default LoginPage;
class RegisterPage
{
getGenderRdoBtn()
{
    return cy.get('#gender-male')
}

getFirstNameTextBox()
{
    return cy.get('#FirstName')
}

getLastNameTextBox()
{
    return cy.get('#LastName')
}

getDayDrpdown()
{
    return cy.get('select[name="DateOfBirthDay"]')
}

getMonthDrpdown()
{
    return cy.get('select[name="DateOfBirthMonth"]')
}

getYearDrpdown()
{
    return cy.get('select[name="DateOfBirthYear"]')
}

getEmailTextBox()
{
    return cy.get('#Email')
}

getCompanyTextBox()
{
    return cy.get('#Company')
}

getNewsLetterRdoBtn()
{
    return cy.get('input#Newsletter')
}

getPasswordTextBox()
{
    return cy.get('#Password')
}

getConfirmPasswordTextBox()
{
    return cy.get('#ConfirmPassword')
}

getRegisterBtn()
{
    return cy.get('.register-next-step-button')
}

getRegistrationText()
{
    return cy.get('.result')
}


}

export default RegisterPage;
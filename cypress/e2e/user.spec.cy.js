import userData from '../fixtures/userData.json'

describe('Orange HRM Tests', () => {

    const selectorsList = {
      usernameField: "[name='username']",
      passwordField: "[name='password']",
      loginButton: "[type='submit']",
      sectionTitleTopBar: ".oxd-topbar-header-breadcrumb-module",
      // dashboardGrid: "oxd-grid-3 orangehrm-dashboard-grid",
      wrongCredentialAlert: "[role='alert']",
      firstNameField: "[name='firstName']",
      midNameField: "[name='middleName']",
      lastNameField: "[name='lastName']",

    }
    
  it.only('User Info Update - Success', () => {
    cy.visit('/auth/login')
    cy.get(selectorsList.usernameField).type(userData.userSuccess.username)
    cy.get(selectorsList.passwordField).type(userData.userSuccess.password)
    cy.get(selectorsList.loginButton).click()
    cy.location('pathname').should('equal', '/web/index.php/dashboard/index')
    cy.get(selectorsList.sectionTitleTopBar).contains('Dashboard')
    cy.get(':nth-child(6) > .oxd-main-menu-item > .oxd-text').click()
    cy.get(selectorsList.firstNameField).clear().type('Teste')
    cy.get(selectorsList.midNameField).clear()
    cy.get(selectorsList.lastNameField).clear().type('Legal')
    cy.get(':nth-child(1) > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input').clear().type('123456')
    cy.get(':nth-child(3) > :nth-child(1) > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').clear().type('654321')
    cy.get(':nth-child(2) > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input').clear().type('223344')
    cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-date-wrapper > .oxd-date-input > .oxd-input').clear().type('2022-20-11')
    cy.get('.--close').click()
    cy.get(':nth-child(1) > .oxd-form > .oxd-form-actions > .oxd-button').click()
    cy.get('.oxd-text--toast-title').contains('Success')
  })
  it('Login Fail', () => {
    cy.visit('/auth/login')
    cy.get(selectorsList.usernameField).type(userData.userFail.username)
    cy.get(selectorsList.passwordField).type(userData.userFail.password)
    cy.get(selectorsList.loginButton).click()
    cy.get(selectorsList.wrongCredentialAlert)
  })
})
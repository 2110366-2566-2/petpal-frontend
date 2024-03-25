/// <reference types="cypress" />

import { When, Then, Given } from "cypress-cucumber-preprocessor/steps";

// Given -------------------------------------------------------------------------------
Given("Open the website", () => {
  cy.visit("http://localhost:3000/");
});

Given("Service provider login", () => {
  cy.get("button").contains("LOGIN").click();
  cy.get('input[type="email"]').type("0@svcp.com");
  cy.get('input[type="password"]').type("password");
  cy.get('select').select("svcp");
  cy.get('button').last().click();
});

Given("Service provider want to edit profile", () => {
  cy.get('a[href="/profile"]').click();
  cy.wait(1500);
  cy.get('button').contains("EDIT PROFILE").click();
});

// When -------------------------------------------------------------------------------
When("Service provider edit {string} to {string}", (topic, value) => {
  cy.get('span').contains(new RegExp(topic, 'i')).next().clear().type(value);
});

When("Service provider click save button", () => {
  cy.get('button').contains("SAVE").click();
})

// Then -------------------------------------------------------------------------------
Then("Service provider should see {string} in the username field", (value) => {
  cy.get('h1[class="text-[32px]"]').should('have.text', value);
})

Then("Service provider should see {string} in the description field", (value) => {
  cy.get('p[class="text-[18px]"]').should('have.text', value);
})

Then("Service provider should see {string} in the address field", (value) => {
  const target_value = 'Address: ' + value;
  cy.get('div[class="space-y-[10px] m-auto"]').find('p').first().should('have.text', target_value);
})

Then("Service provider should see {string} in the phone number field", (value) => {
  const target_value = 'Phone: ' + value;
  cy.get('div[class="space-y-[10px] m-auto"]').find('p').last().should('have.text', target_value);
})

Then("Service provider should see {string} in the bank account number field", (value) => {

})

Then("Service provider should see {string} in the bank account name field", (value) => {
  
})
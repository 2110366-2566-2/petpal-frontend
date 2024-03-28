Feature: edit profile

  Scenario: service provider edit username 
    Given Open the website
    And Service provider login
    And Service provider want to edit profile
    When Service provider edit "username" to "newusername"
    And Service provider click save button
    Then Service provider should see "newusername" in the username field

  Scenario: service provider edit description
    Given Open the website
    And Service provider login
    And Service provider want to edit profile
    When Service provider edit "description" to "new description"
    And Service provider click save button
    Then Service provider should see "new description" in the description field

  Scenario: service provider edit address
    Given Open the website
    And Service provider login
    And Service provider want to edit profile
    When Service provider edit "address" to "homeland 123"
    And Service provider click save button
    Then Service provider should see "homeland 123" in the address field

  Scenario: service provider edit phone number
    Given Open the website
    And Service provider login
    And Service provider want to edit profile
    When Service provider edit "phone number" to "0972222222"
    And Service provider click save button
    Then Service provider should see "0972222222" in the phone number field

  Scenario: service provider edit bank account
    Given Open the website
    And Service provider login
    And Service provider want to edit profile
    When Service provider edit "account number" to "123456789"
    And Service provider edit "bank name" to "Kasikorn"
    And Service provider click save button
    Then Service provider should see "1-234-5-6789" in the bank account number field
    And Service provider should see "Kasikorn" in the bank account name field

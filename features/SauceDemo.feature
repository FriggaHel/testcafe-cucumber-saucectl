Feature: SauceDemo
  As User I want to be able to login to SauceDemo shop

  Scenario: Display HomePage
    Given User wants to view the page of SauceDemo Login
    When he clicks the Login button
    Then he should see the "Epic sadface: Username is required" message

  Scenario: Type in invalid username and password
    Given User wants to view the page of SauceDemo Login
    Given User types "locked_out_user" in username and "secret_sauce" in password
    When he clicks the Login button
    Then he should see the "Epic sadface: Sorry, this user has been locked out." message

  Scenario: Type in valid username and password
    Given User wants to view the page of SauceDemo Login
    Given User types "standard_user" in username and "secret_sauce" in password
    When he clicks the Login button
    Then he should see the product list

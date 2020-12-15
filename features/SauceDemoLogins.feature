Feature: SauceDemo Login
  As User I want to be able to login to SauceDemo shop

  Scenario: Display HomePage
    Given User wants to view the page of SauceDemo Login
    When he clicks the Login button
    Then he should see the "Epic sadface: Username is required" message

  Scenario: Type in locked username and password
    Given User wants to view the page of SauceDemo Login
    Given User types "locked_out_user" in username and "secret_sauce" in password
    When he clicks the Login button
    Then he should see the "Epic sadface: Sorry, this user has been locked out." message

  Scenario: Type in empty username and but password
    Given User wants to view the page of SauceDemo Login
    Given User types only "secret_sauce" in "password"
    When he clicks the Login button
    Then he should see the "Epic sadface: Username is required" message

  Scenario: Type in username and not password
    Given User wants to view the page of SauceDemo Login
    Given User types only "standard_user" in "username"
    When he clicks the Login button
    Then he should see the "Epic sadface: Password is required" message

  Scenario: Type in bad username and password
    Given User wants to view the page of SauceDemo Login
    Given User types "user_KO" in username and "KO" in password
    When he clicks the Login button
    Then he should see the "Epic sadface: Username and password do not match any user in this service" message

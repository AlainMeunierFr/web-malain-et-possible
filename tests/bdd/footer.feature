Feature: Footer buttons
  Scenario: User clicks the Email button
    Given the footer is displayed
    When the user clicks the "Email" button
    Then the default mail client opens with my email address

  Scenario: User clicks the YouTube button
    Given the footer is displayed
    When the user clicks the "YouTube" button
    Then YouTube channel opens in a new tab

  Scenario: User clicks the LinkedIn button
    Given the footer is displayed
    When the user clicks the "LinkedIn" button
    Then LinkedIn profile opens in a new tab

  Scenario: User clicks the Site Map button
    Given the footer is displayed
    When the user clicks the "Site Map" button
    Then a popup shows the site map command

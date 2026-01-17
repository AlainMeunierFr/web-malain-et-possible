Feature: Navigation
  Scenario: User clicks on the photo to navigate to "A propos de moi" page
    Given the homepage is displayed
    When the user clicks on the photo
    Then the "A propos de moi" page is displayed
    And it shows the text "a propos de moi"

  Scenario: User clicks on the site map button to navigate to "Plan du site" page
    Given the footer is displayed
    When the user clicks the "Site Map" button
    Then the "Plan du site" page is displayed
    And it shows the text "plan du site"

  Scenario: User navigates to the homepage
    Given any page is displayed
    When the user clicks on the logo
    Then the homepage is displayed
    And it shows the text "Home page"

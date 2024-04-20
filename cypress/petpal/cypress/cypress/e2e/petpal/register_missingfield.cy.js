const fields = ['Username', 'Full name', 'Email address', 'Phone number', 'Address', 'Date of Birth', 'Password', 'Confirm password'];
const fieldsNext = ['input', 'input', 'input', 'input', 'input', 'input[type="date"]', 'input', 'input'];

const userData = [
   ' user293',                  // Username
  'John Johnson',             // Full name
  'user293@example.com',      // Email address
  '5558125678',             // Phone number
  'Park Ave, New York, NY, 10001',  // Address
  '1987-09-15',               // Date of Birth
  'Abc12345',                 // Password
  'Abc12345'                  // Confirm password
]

const weburl = 'http://localhost:3000';


describe('Register Page missing filed test', () => {
    beforeEach(() => {
        // Visit the register page
        cy.visit(weburl + '/register');
        // Assert that the register page loads successfully
        cy.url().should('eq', weburl + '/register');
      });

      userData.forEach((user, index) => {
        it(`reister missing ${fields[index]}`, () => {
    
        userData.forEach((field, user_index) => {
            if(index != user_index)
                if(fields[user_index] == 'Email address')
                    cy.contains(fields[user_index]).next(fieldsNext[user_index]).type(`missing${fields[index]}@example.com`.replace(/ /g, ''));
                else
                    cy.contains(fields[user_index]).next(fieldsNext[user_index]).type(userData[user_index]);
          });
          // Select option in the "Register as" dropdown
          cy.get('button').contains('Register').click();
        //   cy.contains('span', 'Please fill all fields').should('be.visible');
        cy.url().should('eq', weburl + '/login');
    
        });
      });


    })
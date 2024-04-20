
const fields = ['Username', 'Full name', 'Email address', 'Phone number', 'Address', 'Date of Birth', 'Password', 'Confirm password'];
const fieldsNext = ['input', 'input', 'input', 'input', 'input', 'input[type="date"]', 'input', 'input'];
const userData = [[
  'user293',                  // Username
  'John Johnson',             // Full name
  'user777@example.com',      // Email address
  '5558125678',             // Phone number
  'Park Ave, New York, NY, 10001',  // Address
  '1987-09-15',               // Date of Birth
  'Abc12345',                 // Password
  'Abc12345'                  // Confirm password
],
[
  'user498',                  // Username
  'Michael Brown',            // Full name
  'user498@example.com',      // Email address
  '5553859362',             // Phone number
  'Elm St, Chicago, IL, 60601',    // Address
  '1995-03-22',               // Date of Birth
  'Xyz67890',                 // Password
  'Xyz67890'                  // Confirm password
],

[
  'user712',                  // Username
  'Samantha Davis',           // Full name
  'goldenarmorwarrior@example.com',      // Email address
  '5557234891',             // Phone number
  'Main St, Los Angeles, CA, 90001', // Address
  '1982-11-07',               // Date of Birth
  'Hello123',                 // Password
  'Hello123'                  // Confirm password
]]
const weburl = 'http://localhost:3000';


describe('Register Page valid test', () => {


  // afterEach(() => {
  //   cy.url().should('eq', 'http://localhost:3000/login');
  // });
  beforeEach(() => {
    // Visit the register page
    cy.visit(weburl + '/register');
    // Assert that the register page loads successfully
    cy.url().should('eq', weburl + '/register');
  });

  // it('successfully reister 1', () => {
  //   // Fill the input fields
  //   // cy.contains('Username').next('input').type('testuser');
  //   // cy.contains('Full name').next('input').type('John Doe');
  //   // cy.contains('Email address').next('input').type('testuser@example.com');
  //   // cy.contains('Phone number').next('input').type('1234567890');
  //   // cy.contains('Address').next('input').type('123 Main St');
  //   // cy.contains('Date of Birth').next('input[type="date"]').type('1990-01-01');
  //   // cy.contains('Password').next('input').type('testpassword');
  //   // cy.contains('Confirm password').next('input').type('testpassword');

  //   fields.forEach((field, index) => {
  //     cy.contains(field).next(fieldsNext[index]).type(userData[0][index]);
  //   });
  //   // Select option in the "Register as" dropdown
  //   cy.get('button').contains('Register').click();


  // });
  userData.forEach((user, index) => {
    it(`successfully reister ${index}`, () => {

      user.forEach((field, user_index) => {
        cy.contains(fields[user_index]).next(fieldsNext[user_index]).type(userData[index][user_index]);
      });
      // Select option in the "Register as" dropdown
      cy.get('button').contains('Register').click();
      cy.url().should('eq', weburl + '/login');
      cy.contains('Email address').next(fieldsNext['input']).type(userData[index][2]);
      cy.contains('Password').next(fieldsNext['input']).type(userData[index][6]);
      cy.contains('Need an account?').prev('button').click();
      cy.url().should('eq', weburl+'/');

    });
  });


});

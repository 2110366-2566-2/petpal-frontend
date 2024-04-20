const fields = ['Username', 'Full name', 'Email address', 'Phone number', 'Address', 'Date of Birth', 'Password', 'Confirm password'];
const fieldsNext = ['input', 'input', 'input', 'input', 'input', 'input[type="date"]', 'input', 'input'];
const it_name = ['wrong format email',
    'email is  already exists in the system',
    'confirm password is not match password',
    'birthdate is upcoming',
    'fullname contains non alphabetic character(s)',
    'phone number contains non numeric character(s)',
    'phone number is less than 10 characters',
    'phone number is more than 13 characters',
];

const userData = [
    [
        'wrong_format_email',                  // Username
        'John Johnson',             // Full name
        'kkkkk', // Incorrect email format
        '5558125678',             // Phone number
        'Park Ave, New York, NY, 10001',  // Address
        '1995-03-22',               // Date of Birth 
        'Abc12345',                 // Password
        'Abc12345'                  // Confirm password
    ],
    [
        'email_is_already_exists_in_the_system',                  // Username
        'Michael Brown',            // Full name
        'user293@example.com',      // Existing email in the system
        '5553859362',             // Phone number
        'Elm St, Chicago, IL, 60601',    // Address
        '1995-03-22',               // Date of Birth
        'Xyz67890',                 // Password
        'Xyz67890'                  // Confirm password
    ],
    [
        'password_mismatch',                  // Username
        'Samantha Davis',           // Full name 
        'user712@example.com',      // Email address
        '5557234891',             // Phone number
        'Main St, Los Angeles, CA, 90001', // Address
        '1982-11-07',               // Date of Birth
        'Hello123',                 // Password
        'WrongConfirm123'           // Confirm password mismatch
    ],
    [
        'DateofBirt_upcoming',                  // Username
        'Samantha Davis',           // Full name
        'user712@example.com',      // Email address
        '5557234891',             // Phone number
        'Main St, Los Angeles, CA, 90001', // Address
        '2300-11-07',               // Date of Birth (upcoming)
        'Hello123',                 // Password
        'Hello123'           // Confirm password 
    ],
    [
        'Full_name_contains_non_alphabetic',                  // Username
        'Samantha Davis@#$%%%%^&^&*(*(',  // Full name contains non alphabetic
        'useyyyy@example.com',      // Email address
        '5557234891',             // Phone number
        'Main St, Los Angeles, CA, 90001', // Address
        '1982-11-07',               // Date of Birth
        'jajajaja',                 // Password
        'jajajaja'           // Confirm password 
    ],
    [
        'Phone_number_contains_non_numeric_character(s)',                  // Username
        'Samantha Davis',           // Full name
        'kkyx@example.com',      // Email address
        '555sadweqe',             // Phone number contains non numeric character(s)
        'Main St, Los Angeles, CA, 90001', // Address
        '1982-11-07',               // Date of Birth
        'Hellomehuhu',                 // Password
        'Hellomehuhu'           // Confirm password 
    ],
    [
        'Phone_number_less10',                  // Username
        'Alice Smith',              // Full name
        'alice@example.com',        // Email address
        '1234',              // Phone number (less than 10 characters)
        'Broadway St, San Francisco, CA, 94102', // Address
        '1975-12-25',               // Date of Birth
        'P@ssw0rd',                 // Password
        'P@ssw0rd'                  // Confirm password
    ],
    [
        'Phone_number_more_13',                  // Username
        'Robert Johnson',           // Full name
        'robert.johnson@example.com', // Email address
        '55598765436666',             // Phone number (more than 13 characters)
        'Washington St, Seattle, WA, 98101', // Address
        '1990-08-10',               // Date of Birth
        'Secret123',                // Password
        'Secret123'                 // Confirm password
    ]
];


const weburl = 'http://localhost:3000';

describe('Register Page invalid test', () => {

    before(() => {
        cy.visit(weburl + '/register');
        fields.forEach((field, user_index) => {
            cy.contains(fields[user_index]).next(fieldsNext[user_index]).type(userData[1][user_index]);
        });
        cy.get('button').contains('Register').click();
        cy.url().should('eq', weburl + '/login');
    });
    beforeEach(() => {
        // Visit the register page
        cy.visit(weburl + '/register');
        // Assert that the register page loads successfully
        cy.url().should('eq', weburl + '/register');
    });


    userData.forEach((user, index) => {
        it(`register invalid ${it_name[index]}`, () => {

            user.forEach((field, user_index) => {
                cy.contains(fields[user_index]).next(fieldsNext[user_index]).type(userData[index][user_index]);
            });
            // Select option in the "Register as" dropdown
            cy.get('button').contains('Register').click();

            // if (index == 2)
            //     cy.contains('span', 'Passwords do not match. Please try again.').should('be.visible');
            // else cy.contains('span', 'Please fill all fields').should('be.visible');
            cy.url().should('eq', weburl + '/login');

        });
    });

})
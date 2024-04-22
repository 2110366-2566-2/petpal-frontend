const { before } = require("mocha");

const Registerfields = ['Username', 'Full name', 'Email address', 'Phone number', 'Address', 'Date of Birth', 'Password', 'Confirm password'];
const RegisterfieldsNext = ['input', 'input', 'input', 'input', 'input', 'input[type="date"]', 'input', 'input'];

const RegisteruserData = [[
    'user293',                  // Username
    'John Johnson',             // Full name
    'naphatchalermwai@gmail.com',      // Email address
    '5558125678',             // Phone number
    'Park Ave, New York, NY, 10001',  // Address
    '1987-09-15',               // Date of Birth
    'admin',                 // Password
    'admin'                  // Confirm password
],
[
    'user498',                  // Username
    'Michael Brown',            // Full name
    'testhahaha@gmail.com',      // Email address
    '5553859362',             // Phone number
    'Elm St, Chicago, IL, 60601',    // Address
    '1995-03-22',               // Date of Birth
    'notadmin',                 // Password
    'notadmin'                  // Confirm password
]]
const it_name = ['valid login',
    'wrong password',
    'this email is not user and wrong password',
    'wrong email format',
    'password is empty',
    'email is empty',
    'this email is not user',
];
const userData = [
    ["naphatchalermwai@gmail.com", "admin"],
    ["naphatchalermwai@gmail.com", "adminhaha"],
    ["testhahaha@gmail.com", "strongpassword"],
    ["naphathaha", "strongpassword"],
    ["naphatchalermwai@gmail.com", ""],
    ["", "strongpassword"],
    ["testhahaha@gmail.com", "notadmin"]
]


const weburl = 'http://localhost:3000';

describe('login test', () => {
    before(() => {
        // assume we have naphatchalermwai@gmail.com and testhahaha@gmail.com in the system
        RegisteruserData.forEach((user, index) => {
            cy.visit(weburl + '/register');
            Registerfields.forEach((field, user_index) => {
                cy.contains(Registerfields[user_index]).next(RegisterfieldsNext[user_index]).type(RegisteruserData[index][user_index]);
            });
            if(index == 1)
                cy.contains('Register as').next('select').select('Service Provider');
            cy.get('button').contains('Register').click();

            cy.url().should('eq', weburl + '/login');
        });
    })
    beforeEach(() => {
        //go to login page
        cy.visit(weburl + '/login');
        cy.url().should('eq', weburl + '/login');
    });

    userData.forEach((user, index) => {
        it(`login ${it_name[index]}`, () => {
            if (user[0] != "")
                cy.contains('Email address').next('input').type(user[0]);
            if (user[1] != "")
                cy.contains('Password').next('input').type(user[1]);
                cy.contains('Need an account?').prev('button').click();
                // visit home page == valid acual output
            cy.url().should('eq', weburl + '/');
            
        });
    });


})
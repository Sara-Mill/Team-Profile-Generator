const inquirer = require('inquirer');
const fs = require ('fs');
const HTML = require('./generateHTML');

//team profiles
const Employee = require ('./lib/Employee');
const Manager = require ('./lib/Manager');

const teamArray = [];

//Manager propmts
const addManager = () => {
    return inquirer.prompt ([
        {
            type: 'input',
            name: 'name',
            message: 'Who is the manager of this team?',
            validate: nameInput => {
                if(nameInput) {
                    return true;
                } else {
                    console.log ("Please enter the manager's name!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: "Please enter the manager's ID.",
            validate: nameInput => {
                if (isNaN(nameInput)) {
                    console.log ("Please enter the manager's ID")
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "Please enter the manager's email.",
            validates: email => {
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                if (valid) {
                    return true;
                } else {
                    console.log ("please enter an email")
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: "Please enter the manager's office number",
        }
    ]).then(managerInput => {
        const {name, id, email, officeNumber} = managerInput;
        const manager = new Manager (name, id, email, officeNumber);

        teamArray.push(manager);
        writeFile()
        console.log(manager);
    })
}
var stringTeam = JSON.stringify(teamArray)
console.log(stringTeam)
const writeFile = HTML => {
    fs.writeFile("./dist/index.html", stringTeam, err => {
        if(err) {
            console.log(err);
            return;
        } else {
            console.log(teamArray);
            console.log("Your team profile has been successfully created!")
            //console.log(fs.readFileSync("index.html", "UTF8"));
        }
    })
};

addManager()

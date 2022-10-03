const inquirer = require('inquirer');
const fs = require ('fs');
const generateHTML = require('../generateHTML');
const path = require('path');
const DIST_DIR = path.resolve(__dirname, 'dist');
const distPath = path.join(DIST_DIR, 'team.html');
const generateTeam = require('./src/template')

//team profiles
const Employee = require ('./lib/Employee');
const Manager = require ('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

const teamArray = [];


function runApp () {

    function createTeam () {
        inquirer.prompt([{
            type: "list",
            name: "addEmployee",
            message: "What type of employee would you like to add to your team?",
            choices: [
                "Manager",
                "Engineer",
                "Intern",
                "No more team members are needed."
            ]
        }]).then (function (userInput) {
            switch(userInput.addEmployee) {
                case "Manager":
                    addManager();
                    break;
                case "Engineer":
                    addEngineer();
                    break;
                case "Intern":
                    addIntern();
                    break;    

                default:
                    htmlBuilder();    
            }
        })
    }
    //Manager prompts
    function addManager() {
        inquirer.prompt ([
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

        ]).then(answers => {
            const manager = new Manager (answers.name, answers.id, answers.email, answers.officeNumber);
            teamArray.push(manager);
            createTeam();
        });
    }

    function addEngineer() {
        inquirer.prompt([
        
        {
            type: "input",
            name: "name",
            message: "What is the engineer's name?"
        },

        {
            type: "input",
            name: "id",
            message: "What is the engineer's employee ID number?" 
        },

        {
            type: "input",
            name: "email",
            message: "What is the engineer's email address?"
        },

        {
            type: "input",
            name: "github",
            message: "What is the engineer's GitHub username?"
        }

        ]).then(answers => {
        const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
        teamArray.push(engineer);
        createTeam();
        });

    }

    function addIntern() {
        inquirer.prompt([
        
        {
            type: "input",
            name: "name",
            message: "What is the intern's name?"
        },

        {
            type: "input",
            name: "id",
            message: "What is the intern's employee ID number?" 
        },

        {
            type: "input",
            name: "email",
            message: "What is the intern's email address?"
        },

        {
            type: "input",
            name: "school",
            message: "What school does the intern attend?"
        }

        ]).then(answers => {
        const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
        teamArray.push(intern);
        createTeam();
        });

    }

function htmlBuilder() {
    console.log("Team created!")
    fs.writeFileSync(distPath, generateTeam(teamArray), "UTF-8")
}

createTeam();
}

runApp();



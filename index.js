const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

const name = {
    projectTitle: "projectTitle",
    description: "description",
    tableOfContents: "tableOfContents",
    installation: "installation",
    license: "license",
    contributions: "contributions",
    tests: "tests",
    githubUsername: "githubUsername",
}

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "projectTitle",
      message: "What is the title of the Project?"
    },
    {
      type: "input",
      name: "description",
      message: "Give a description of the project."
    },
    {
      type: "input",
      name: "tableOfContents",
      message: "List the Table of Contents"
    },
    {
      type: "input",
      name: "installation",
      message: "How do you install this app?"
    },
    {
      type: "input",
      name: "license",
      message: "If it has a license, list it here."
    },
    {
      type: "input",
      name: "contributions",
      message: "List the contributions."
    },
    {
        type: "input",
        name: "tests",
        message: "List tests."
      },
      {
        type: "input",
        name: "questions",
        message: "Lists questions here."
      },
      {
        type: "input",
        name: "githubUsername",
        message: "What is your Github username?"
      },
  ]);
}

function generateMD(answer) {
  return `
  # ${answer.projectTitle}

${answer.description}

# Table of Contents

${answer.tableOfContents}

# Installing

${answer.installation}

# License

${answer.license}

# Contributing

${answer.contributions}

# Tests

${answer.tests}

# Questions

${answer.questions}

# Authors

${answer.githubUsername}`
};

promptUser()
  .then(function(answer) {
    const readme = generateMD(answer);

    return writeFileAsync("README.md", readme);
  })
  .then(function() {
    console.log("Successfully wrote to README.md");
  })
  .catch(function(err) {
    console.log(err);
  });
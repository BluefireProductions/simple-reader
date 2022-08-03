# Simple Reader

A minimal reader based on create-react-app and R2D2BC v.2

The purpose of this project is to demonstrate a build-time error that is blocking our CI/CD process.

## Running the Reader

In the project directory, run the following:

`npm install`  

`npm run build`  

`npm start`

## Issue

Building this project causes the following warning:  

`Critical dependency: the request of a dependency is an expression`

webpack documentation describes this error here:

https://webpack.js.org/guides/dependency-management/#require-with-expression

As near as I can tell this happens when webpack tries to resolve 'require' calls statically to make a minimal bundle. When a library uses variables in a require call (such as require("module_name"), webpack cannot resolve them statically, so it imports the entire package and throws a warning.







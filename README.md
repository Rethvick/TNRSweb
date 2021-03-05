# TNRS

## How to contribute

This project is written in JavaScript and uses [Node.js](https://nodejs.org/en/) intepreter.
The first step to contribute is to install node in your machine.

You can find help to install node [here](https://nodejs.dev/learn/how-to-install-nodejs).

If you are on MacOSX, cosider downloading 
and installing npm from https://nodejs.org/en/ (mac homebrew package manager doesn't have npm).

Make sure you have `npm` installed before you continue:

```
❯ npm --version 
6.14.8
```

After you install `npm` you can proceed and clone this repository.

The next steps are to run `npm install` inside this folder.
This command will install all the packages listed in `packages.json` that are required by this project.

The command `npm run dev` will start an http server on http:localhost:3000 that should be accessible through your web browser.

After running `npm run dev`, wait a while until you see all of the following:

```
ready - started server on http://localhost:3000
event - compiled successfully
event - build page: /
wait  - compiling...
event - compiled successfully
```

## Development Server

We are currently deploying the project at https://tnrsapi.xyz

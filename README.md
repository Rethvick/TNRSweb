# TNRS

TNRSweb is a web interface for the Taxonomic Name Resolution Service (TNRS), an application for the correction and standardization of scientific names.
The main TNRS application repository is at https://github.com/ojalaquellueva/TNRSbatch. Other TNRS interfaces include the TNRS API (https://github.com/ojalaquellueva/TNRSapi) and the RTNRS R package (https://github.com/EnquistLab/RTNRS).

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

You also need node:

```
❯ node --version
v15.14.0
```

The next steps are to run `npm install` inside this folder.
This command will install all the packages listed in `packages.json` that are required by this project.

The command `npm run dev` will start an http server on http://localhost:3000 that should be accessible through your web browser.

After running `npm run dev`, wait a while until you see all of the following:

```
ready - started server on http://localhost:3000
event - compiled successfully
event - build page: /
wait  - compiling...
event - compiled successfully
```

## Development Server

We are currently deploying the project at https://tnrs.xyz

## How to deploy to Apache

1. Download the deploy.sh script from the repository:

```
wget https://raw.githubusercontent.com/EnquistLab/TNRSweb/main/deploy.sh
```

2. For safety purposes, it is recommended to create a backup of the current version that has been deployed in the Apache folder.

3. Run the script with sudo:

```sh
sudo sh deploy.sh <apache folder>
```

### Project structure

1. We kept the API calls and logic inside the `actions` folder.
2. JSX components were kept inside `components`.
3. To add new routes, add a `js` file inside `pages`.

#### Adding code to the `actions` folder

If you're adding another API call, you can add it to the `api-requests` folder.
Then add the corresponding export to `index.js`
If the code does not contain a call, add it to the root and also add the export to `index.js`.

#### Adding code to `components`

If you need to add new components, add them to the `components` folder.
We prefer to have a folder per container.
For example, if you want to add a custom button, consider adding a folder called `custom-button` to `components`,
and inside `custom-button` a file called `custom-button.jsx`.
Then add the export inside the `index.js` file in the root of `components`.

The export would look like:

```javascript
export * from "./custom-button/custom-button";
```

#### Adding new routes (`pages`)

If you add another file to `pages` it will be accessible trough the HTTP.
For example, adding `new-file.js` to `pages` will make a new route `http://project-addres/new-file`.

There is one component called `layout` that renders the header and footer, and takes children components
that will be rendered between the header and footer.

#### Development

The `next.config.js` controls which version of the API is being used.
There are three instances of the API: development-public, development-private, and production.

To start the development instance, run:

```sh
npm run dev
```

You can edit the port and find more options inside the package.json file under `scripts`.

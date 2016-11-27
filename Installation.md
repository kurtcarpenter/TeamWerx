# Installation Guide

This document details how to set up a development environment for working with TeamWerx. It also outlines how the initial developers intended for the application to be deployed to a production server. See `Future.md` for more details on why this never occurred.

## Prerequisites

To get started developing TeamWerx, you need:

* A computer running Windows, OSX, or Linux
* [Node.js](https://nodejs.org/en/) v4 or higher
* A text editor such as Sublime, Atom, Visual Studio Code, Vim, etc.
* [MongoDB](https://www.mongodb.com/) Server + Client

To test that you have an appropriate version of Node.js installed, run `node -v`. The output should be at least `4.0.0`. At the time of writing, my exact version is `4.4.7`. After installing Node.js, you will also have a command called `npm`. Ensure that your version of `npm` is recent enough by running `npm -v`. The output should be `2.x.x` or `3.x.x`. At the time of writing, my exact version is `2.15.8`.

To ensure MongoDB is installed, type `mongo --version` and `mongod --version`. Both should be v3 or higher. At the time of writing, my exact versions are both `3.2.8`.

Installing a text editor is left as an exercise to the reader.

## Setup

First, download the code into a folder. At the time of writing, that code is hosted in a Git repository and a simple `git clone <url>` suffices. The exact URL is omitted from this document because it is on one of our personal accounts and will probably not be a reliable location after we graduate. Chances are, the client will provide you with a zip archive of the project which should already be extracted to a folder if you're reading this file.

Then open a terminal window (on the OS of your choice) and navigate to the project directory (where this file is). Then type:

    npm install

The very first time you run `npm install`, it may take up a to a minute as it gathers and downloads all dependencies. Like all Node.js applications, those dependencies will be downloaded into the `node_modules` folder. It is current best practice to exclude this folder in Git and we follow this recommendation.


For the uninitiated, NPM provides [a good overview of the `package.json` file](https://docs.npmjs.com/getting-started/using-a-package.json) and managing dependencies through `npm`. Also note that the project currently doesn't have any dependencies that require native code to compile so it is exceedingly unlikely that `npm install` will raise any errors.

## Running TeamWerx for Development

While in the root of the project directory, run:

    npm start

Then open your browser of choice and go to [`http://localhost:3000/`](http://localhost:3000)

`npm start` calls `bin/www` which is the recommended way to run modern Express applications.

## Running TeamWerx in Production

While we never had the opportunity to run TeamWerx in a production setting, the original development is very familiar with running MEAN Stack applications on production servers.

To ensure that the `node_modules` on the server matches the one you're using locally, you should run:

    npm shrinkwrap

Every time you add, update, or remove any dependencies. For the uninitiated, NPM provides [a good overview of how and why to shrinkwrap dependencies](https://docs.npmjs.com/cli/shrinkwrap).

Additionally, it is traditional to set an environment variable in production (such as `NODE_ENV=prod`). With a simple modification to `config.js`, different API keys and connection strings can be used in production.

Beyond that, hosting the application will vary widely depending on what service it is running on top of. The general deployment steps are:

* Download the latest version of the code (from Git or a zip).
* Run `npm install --production` to get the latest version of all non-dev dependencies.
* Run `NODE_ENV=production npm start` to start the server in production.

Depending on the hosting provider, all, some, or none of the above steps may automatically happen when you "deploy".

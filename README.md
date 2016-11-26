# TeamWerx

A webapp for helping professors and students make better teams.

## Installation and Deployment Instructions

Detailed installation instructions can be found in `Installation.md`. Deployment information, which is very similar to developer installations, is included in the same document.

### Quickstart Guide

For people who are comfortable working with Node.js projects, the following instructions should get you up and running quickly. If you are not familiar with Node.js projects, please see `Installation.md` for much more thorough instructions.

  * Install MongoDB
  * `npm install`
  * Go to `localhost:3000` in your browser.

Currently, none of the TeamWerx dependencies require native code so `npm install` should not run into cross-platform issues.

A note for experienced Javascript and webapp developers: This project currently does not include a frontend build pipeline (including buzzwords such as `gulp`, `transpiling`, `es6`, `babel`, `sass`, or `minification`). While these features are very important for large codebases and highly scalable applications, they have a steep learning curve as well. Given that this project was started by students who did not all have previous experience with Javascript and the fact that this project will probably be continued by students who may not have previous experience with Javascript, we opted to exclude these features in favor or a simpler, faster development experience.

## Code Overview

This project follows a very typical layout for a MEAN stack ([MongoDB](https://www.mongodb.com/), [Express](http://expressjs.com/), [AngularJS 1](https://angularjs.org/), [Node.js](https://nodejs.org/en/) app.

The top-level folders are:

* `lib/`: Extra backend utility code
* `models/`: Database models
* `public/`: Folder for all frontend assets
* `routes/`: Backend logic for defining API routes and static assets

Some other notable files include:

* `app.js`: Entry point for backend application
* `config.js`: Single place for all configuration information (such as database connection information and API keys)
* `public/app.html` and `public/app.js`: Entry points for the Angular.js frontend

Inside of the `public/` folder, each page (HTML + JS) is contained in an appropriately named folder.

## Future Work and Existing Bugs

See `Future.md` for additional features that should be implemented and bugs that should be fixed.

Some general information on project design decisions

* All of the Javascript files follow  [Javascript Standard Style](http://standardjs.com) which notably does not include semicolons
* The project has been extensively tested on Node.js versions 4 and 6 (the two LTS releases of Node.js available while this project was being developed)
* AngularJS 1 (vs 2) was used because the team had a significant amount of experience with it. The technical merits of Angular 2 were not considered in this decision.

# Future Work

Like all software projects, "done" is very subjective. While the project is very close to being presentable to both professors and students, it is missing some key features (notably authentication) that will make it much more usable. Additionally, there are a variety of bugs and extra features that have come up during development that we never had to time to address.

## Immediate Work

The two major hurdles to deploying this software to our client is the lack of user authentication and a hosting environment. When both of these are addressed, the application will be ready for real-world testing in the classroom.

### User Authentication

By far, the best user experience for this app will be for professors and students to log in with their existing Georgia Tech credentials. This involves integrating with Georgia Tech's Single Sign On (SSO) provider or Central Authentication Service (CAS). The terms are used interchangeably throughout this project. This integration requires:

* The following form to be filled out https://iam.gatech.edu/gted/data_steward_request.html and finish various administrative hurdles.
* Technically integrate the webapp with CAS.

After contacting Matt Sanders and Russell Clark of GT RNOC, we learned that we need to fill out the above form. Because we found out about this form towards the end of the semester, we opted to skip CAS integration and instead focus on other features. Therefore, we don't know what the process for integration will look like after submitting the above form.

The other issue with login via CAS is the technical side. Unfortunately, we were unable to find any documentation whatsoever on how to technically use CAS to authenticate users. While we're fairly certain it's doable because other webapps use CAS in a similar manner, we don't know where to even begin with the technical aspect of this integration. Note that it is possible that some documentation may be easier to find after filling out the form.

### Hosting

When we were originally scoping out the technical aspects of this project, we spoke to the client about where to host the application when it gets finished. At the time, we planned on using servers provided by Georgia Tech for professors to host projects on. Unfortunately, those servers only support PHP + MySQL and haven't expanded to other backend languages.

To address the hosting problem, we can either wait some length of time for Georgia Tech to support MongoDB and Node.js or spend a small amount of money every month to host it elsewhere. Addressing this issue will be more important when the User Authentication problem has been addressed and the app is ready to be tested in a real classroom.

## Long Term Work

After addressing the two major immediate pieces of work for this project, there are a variety of features and bugs that can be worked on. The bugs were found during the course of the project but were too minor to address immediately. The extra features proposed at the end are useful additions that were talked about during the project but outside of the scope of work for the initial version.

### Known bugs

* Randomized team-finding has some subtle bugs in certain edge cases. Specifically, when several partial teams are left over with no individual students, excess unfilled teams will remain.

### Additional Features

* Implement more advanced team-finding algorithms. Instead of just randomly matching students into groups, take into account their profile information.
* Let students add their scheduling availabilities to their profiles. Additionally, matching students who have lots of common availabilities would help groups work together better.
* Email notifications (in general). Lots of actions in the webapp could be improved if relevant people received emails. Some examples that could use an email:
    * Add a student to a class
    * Accept a student into another group
    * Remind students when a team formation deadline is approaching
    * Remind professors when the team formation deadline has passed and teams should be finalized
* Auto hide classes from previous semesters (professors + students)
* Allow professors to delete classes.
* Allow students to remove themselves from classes.
* Allow professors to mark teams as "Manual" to exclude them from the automatic assignment process (useful for teams that need to be over the maximum team size and teams which have requested to not be completely filled because it's an existing group of friends).

## Pivots and Other Major Areas

The following ideas fall under completely separate categories that could basically be their own projects. However, they are easier to build and more useful when coupled with the teams already formed in TeamWerx.

* Peer evaluations. Doing peer evaluations inside of TeamWerx would be nicer than signing up for CATME.

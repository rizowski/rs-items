# RS-items

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/rizowski/rs-items?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![Build Status](https://travis-ci.org/rizowski/rs-items.svg?branch=master)](https://travis-ci.org/rizowski/rs-items)

This project gives the option to track runescape items using your own database. This project was previously coded using Google Apps Scripting but due to the limitations of the environment it is now being transferred over to a NodeJs project.

## How to run
1. `git clone`
2. cd into project folder
4. `npm install`
5. `npm test` (all tests should pass)

## Helping out
If you are working on a particular issue on the repo please tag it with `#number`. This will help us keep track with what is being worked on.

1. `git co -b featureName`
2. `git push origin featureName`
3. create a pull request for the branch
4. Check to see if your pullrequest build passed [here](https://travis-ci.org/rizowski/rs-items/pull_requests)

When the pull request build passes the pull request will be valid to be pulled in. Tests will be required to be written for new code and enhancements when needed.

### Documenting Code
Please refer to this site for code documentation: [usejsdoc.org](http://usejsdoc.org/)

Format should follow:
```javascript
/**
 * A brief description for the function and what it does
 *
 * @param {Type} varName - description on variable
 * ...
 * @returns {Type} a description of returned object if needed
 */
 function myFunction(){
   // code
 }
```

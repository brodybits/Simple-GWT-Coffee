Simple-GWT-Coffee
=================

The goal of this project is to enable HTML5 application developers to develop GUIs using GWT-like classes in CoffeeScript and other languages that compile to JavaScript. For this project, DOM and certain UI classes are adapted from the Pyjamas project as of September 2010. So far just enough code has been adapted from Pyjamas to make a very simple rendering test work in a WebKit-enabled browser.

**NOTE:** This project is assuming UNIX-like systems such as OSX or Linux for the shell script and testing on WebKit-enabled browsers such as Safari, Firefox, or Chrome. So far no test has been made with IE. Applications written with this Simple-GWT library are expected to run on newer versions of IE since it is more HTML5-compliant.

## Sample project

Within the `src` subdirectory simply run the shell script `render-test-1.coffee` and then open the generated page `test1.html`.


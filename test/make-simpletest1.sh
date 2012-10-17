cat js.start ../src/AJS-Class.js ../src/SGWT-Base.js ../src/SGWT-DOM-*.js ../src/SGWT-UI-*.js js.end simpletest1.coffee > test1.coffee
coffee -c test1.coffee
cat render-test-1.head test1.js render-test-1.tail > test1.html


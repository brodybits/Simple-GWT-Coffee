cat js.start base1.js dom1.js dom2.js ui1.js ui2.js ui3.js ui4.js ui5.js js.end dp1.coffee render1.coffee > test1.coffee
coffee -c test1.coffee
cat test1.head test1.js test1.tail > test1.html


cat js.start Base.js SGWT-DOM-1.js SGWT-DOM-2.js SGWT-UI-1.js SGWT-UI-2.js SGWT-UI-3.js SGWT-UI-4.js SGWT-UI-5.js js.end SGWT-UI-DockPanel.coffee render-test-1.coffee > test1.coffee
coffee -c test1.coffee
cat test1.head test1.js test1.tail > test1.html


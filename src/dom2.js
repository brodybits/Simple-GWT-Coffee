
// Copyright 2010 Chris Brody
//
// Copyright 2006 James Tauber and contributors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// TODO ...

DOM.appendChild = function(parent, child) {
    parent.appendChild(child);
}

DOM.buttonClick = function(button) {
    button.click();
}

// TODO ...

DOM.createButton = function() {
    return DOM.createElement("button");
}

// TODO ...

DOM.createDiv = function() {
    return DOM.createElement("div");
}

// TODO ...

DOM.createTable = function() {
    return DOM.createElement("table");
}

DOM.createTBody = function() {
    return DOM.createElement("tbody");
}

DOM.createTD = function() {
    return DOM.createElement("td");
}

// TODO ...

DOM.createTR = function() {
    return DOM.createElement("tr");
}

// TODO ...

DOM.insertChild = function(parent, toAdd, index) {
    var count = 0;
    var child = parent.firstChild;
    var before = null;
    while (child != null) {
        if (child.nodeType == 1) {
            if (count == index) {
                before = child;
                break;
            }

            count += 1;
        }
        child = child.nextSibling;
    }

    if (before == null)
        parent.appendChild(toAdd);
    else
        parent.insertBefore(toAdd, before);
}

// TODO ...


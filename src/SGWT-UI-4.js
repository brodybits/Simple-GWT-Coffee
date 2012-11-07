
// Copyright 2010 Chris Brody
//
// Copyright 2006 James Tauber and contributors
// Copyright (C) 2009 Luke Kenneth Casson Leighton <lkcl@lkcl.net>
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

gwt.ui.AbsolutePanel = gwt.ui.ComplexPanel.extend({
    constructor : function(opts) {
//alert("new abs panel");
        // TODO: check for Element option
        var element = DOM.createDiv();
        this.setElement(element);
        // TODO ...
        //DOM.setStyleAttribute(self.getElement(), "position", "relative")
        //DOM.setStyleAttribute(self.getElement(), "overflow", "hidden")

        //this.parent(opts);
        this.super__constructor(opts);
    },

    add : function(widget, container) {
//alert("abs panel add");
        //this.parent(widget, this.getElement());
        this.insert(widget, this.getElement(), this.children.length);
        // TODO ...
    },

    // TODO ...
});

gwt.ui.AbsoluteRootPanel = gwt.ui.AbsolutePanel.extend({
    constructor : function(element, opts) {
//alert("new root panel");
        // TODO: AbsolutePanel.init(...)
        //this.parent(opts);
        this.super__constructor(opts);
        if (element === null) {
            //# avoid having CSS styles position:relative and hidden set on body
            //TODO//element = this.getBodyElement();
            element = $doc.body
            this.setElement(element);
        }
        this.onAttach();
    },
    // TODO ...
});

gwt.ui.rootPanels = [];

gwt.ui.manageRootPanel = function(panel, id) {
    // TODO ?
    //if len(gwt.ui.rootPanels) < 1:
    //    panelManager = RootPanelManager()
    //    Window.addWindowCloseListener(panelManager)

    // TODO :
    //gwt.ui.rootPanels[id] = panel;
    gwt.ui.rootPanels[0] = panel;
    return panel;
};

gwt.ui.RootPanel = function(id) {
    element = null;

    // TODO ...

    return gwt.ui.manageRootPanel(new gwt.ui.AbsoluteRootPanel(element), id);
};


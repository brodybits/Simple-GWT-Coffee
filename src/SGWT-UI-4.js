
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

SGWT.UI.AbsolutePanel = SGWT.UI.ComplexPanel.extend({
    constructor : function(opts) {
        // TODO: check for Element option
        var element = DOM.createDiv();
        this.setElement(element);
        // TODO ...
        //DOM.setStyleAttribute(self.getElement(), "position", "relative")
        //DOM.setStyleAttribute(self.getElement(), "overflow", "hidden")

        this.super__constructor(opts);
    },

    add : function(widget, container) {
        //this.parent(widget, this.getElement());
        this.insert(widget, this.getElement(), this.children.length);
        // TODO ...
    },

    // TODO ...
});

SGWT.UI.AbsoluteRootPanel = SGWT.UI.AbsolutePanel.extend({
    constructor : function(element, opts) {
        // TODO: AbsolutePanel.init(...)
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

rootPanels = [];

manageRootPanel = function(panel, id) {
    // TODO ?
    //if len(SGWT.UI.rootPanels) < 1:
    //    panelManager = RootPanelManager()
    //    Window.addWindowCloseListener(panelManager)

    // TODO :
    //rootPanels[id] = panel;
    rootPanels[0] = panel;
    return panel;
};

SGWT.UI.RootPanel = function(id) {
    element = null;

    // TODO ...

    return manageRootPanel(new SGWT.UI.AbsoluteRootPanel(element), id);
};


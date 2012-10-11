
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

gwt.ui.Label = gwt.ui.Widget.extend({
    // TODO: handlers, innertext
    constructor : function(text, wordWrap, opts) {
        //TODO: check for element arg, style

        if (this.getElement() == null) {
            element = DOM.createDiv();
            this.setElement(element);
        }

        this.horzAlign = ""

        //TODO ...

        this.parent(opts);
    },

    // TODO ...

});

gwt.ui.HTML = gwt.ui.Label.extend({
    // TODO: handlers
    constructor : function(html, wordWrap, opts) {
        //TODO: check for element arg, style

        if (this.getElement() == null) {
            var element = DOM.createDiv();
            this.setElement(element);
        }

        if (html != null)
            DOM.setInnerHTML(this.getElement(), html);

        this.parent(null, null, opts); // TODO
    },

    // TODO ...

});

gwt.ui.Button = gwt.ui.Widget.extend({ // TODO, base, focuswidget, etc
    // TODO: handlers
    constructor : function(html, listener, opts) {
        //TODO: check for element arg, style

        if (this.getElement() == null) {
            var element = DOM.createButton();
            this.setElement(element);
        }

        if (html != null)
            DOM.setInnerHTML(this.getElement(), html);

        this.sinkEvents(0x00001 | 0x00002); // TODO

        this.parent(opts); // TODO
    },

    // TODO ...

});


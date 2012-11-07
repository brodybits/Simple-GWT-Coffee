
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

SGWT.UI.Label = SGWT.UI.Widget.extend({
    // TODO: handlers, innertext
    constructor : function(text, wordWrap, opts) {
//alert("new label");
        //TODO: check for element arg, style

        if (this.getElement() == null) {
            element = DOM.createDiv();
            this.setElement(element);
        }

        this.horzAlign = ""

        //TODO ...

        this.super__constructor(opts);
    },

    // TODO ...

});

SGWT.UI.HTML = SGWT.UI.Label.extend({
    // TODO: handlers
    constructor : function(html, wordWrap, opts) {
//alert("new HTML");
        //TODO: check for element arg, style

        if (this.getElement() == null) {
            var element = DOM.createDiv();
            this.setElement(element);
        }

        if (html != null)
            DOM.setInnerHTML(this.getElement(), html);

        this.super__constructor(null, null, opts); // TODO
    },

    // TODO ...

});

SGWT.UI.Button = SGWT.UI.Widget.extend({ // TODO, base, focuswidget, etc
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

        this.super__constructor(opts); // TODO
    },

    // TODO ...

});


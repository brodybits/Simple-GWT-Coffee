
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

SGWT.UI.CellPanel = SGWT.UI.ComplexPanel.extend({

    constructor : function(opts) {
        var element = DOM.createTable();
        this.table = element;
        this.setElement(this.table);

        this.body = DOM.createTBody();
        this.spacing = null;
        this.padding = null;
        DOM.appendChild(this.table, this.body);

        //this.parent(opts);
        this.super__constructor(opts);
    },

    getTable : function() {
        return this.table;
    },

    getBody : function() {
        return this.body;
    },

    // TODO ...

});

SGWT.UI.HorizontalPanel = SGWT.UI.CellPanel.extend({

    constructor : function(opts) {

        //TODO: style/spacing/padding

        //TODO:
        //self.horzAlign = HasHorizontalAlignment.ALIGN_LEFT
        //self.vertAlign = HasVerticalAlignment.ALIGN_TOP

        //this.parent(opts);
        this.super__constructor(opts);

        this.tableRow = DOM.createTR();
        DOM.appendChild(this.getBody(), this.tableRow);
    },

    // TODO ...

    add : function(widget) {
        this.insert(widget, this.getWidgetCount());
    },

    // TODO ...

    insert : function(widget, beforeIndex) {

        widget.removeFromParent();

        var td = DOM.createTD();
        DOM.insertChild(this.tableRow, td, beforeIndex);

        //this.parent(widget, td, beforeIndex);
        SGWT.UI.ComplexPanel.prototype.insert.call(this, widget, td, beforeIndex);

        //TODO //self.setCellHorizontalAlignment(widget, self.horzAlign)
        //self.setCellVerticalAlignment(widget, self.vertAlign)
    },

    /** TODO
    remove : function(widget) {
    },
    */

    // TODO ...

});

SGWT.UI.VerticalPanel = SGWT.UI.CellPanel.extend({

    constructor : function(opts) {

        //TODO: style/spacing/padding

        //TODO:
        //self.horzAlign = HasHorizontalAlignment.ALIGN_LEFT
        //self.vertAlign = HasVerticalAlignment.ALIGN_TOP

        //this.parent(opts);
        this.super__constructor(opts);
    },

    // TODO ...

    add : function(widget) {
        this.insert(widget, this.getWidgetCount());
    },

    // TODO ...

    insert : function(widget, beforeIndex) {

        widget.removeFromParent();

        var tr = DOM.createTR();
        var td = DOM.createTD();

        DOM.insertChild(this.getBody(), tr, beforeIndex);
        DOM.appendChild(tr, td);

        //this.parent(widget, td, beforeIndex);
        SGWT.UI.ComplexPanel.prototype.insert.call(this, widget, td, beforeIndex);

        //TODO //self.setCellHorizontalAlignment(widget, self.horzAlign)
        //self.setCellVerticalAlignment(widget, self.vertAlign)
    },

    /** TODO
    remove : function(widget) {
    },
    */

    // TODO ...

});


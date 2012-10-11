
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

gwt.ui.DockPosition = {
    CENTER  : "center",
    EAST    : "east",
    NORTH   : "north",
    SOUTH   : "south",
    WEST    : "west"
};

gwt.ui.DockPanelTmpRow = function() { // TODO better solution?
    return {
        center  : 0,
        tr      : null
    };
};

gwt.ui.DockLayoutData = function(pos) { // TODO better solution?
    return {
        position    : pos,
        hAlign      : "left",
        height      : "",
        td          : null,
        vAlign      : "top",
        width       : ""
    };
};

gwt.ui.DockPanel = gwt.ui.CellPanel.extend({

    constructor : function(opts) {

        //TODO: style/spacing/padding

        //TODO:
        //self.horzAlign = HasHorizontalAlignment.ALIGN_LEFT
        //self.vertAlign = HasVerticalAlignment.ALIGN_TOP

        this.center = null;
        //this.dock_children = []; // Future TODO: can self.children be used instead?

        this.centerIndex = 0;

        this.parent(opts);
    },

    // Note: splitup between add and insert:
    // * parent insert() must be called from this.insert()
    // * and parent insert() should not be called from outside

    add : function(widget, pos) {
        widget.setLayoutData(gwt.ui.DockLayoutData(pos));

        // TODO:
        //self.setCellHorizontalAlignment(widget, self.horzAlign)
        //self.setCellVerticalAlignment(widget, self.vertAlign)

        this.insert(widget);
    },

    insert : function(widget) {
        //TODO alignment??

        widget.removeFromParent();

        var pos = widget.getLayoutData().position;

        if (pos == gwt.ui.DockPosition.NORTH) {
            var tr = DOM.createTR();
            var td = DOM.createTD();

            DOM.insertChild(this.getBody(), tr, this.centerIndex);
            DOM.appendChild(tr, td);

            //this.parent(widget, td, this.centerIndex++);
            this.parent(widget, td, this.centerIndex);
            ++this.centerIndex;
        } // TODO else (rest)...
    },

    // TODO ...

    /** TODO
    remove : function(widget) {
    },
    */

    // TODO ...

});


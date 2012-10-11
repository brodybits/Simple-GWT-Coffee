
# Copyright 2010 Chris Brody
#
# Copyright 2006 James Tauber and contributors
# Copyright (C) 2009 Luke Kenneth Casson Leighton <lkcl@lkcl.net>
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

`/* START of Javascript */

/*
gwt.ui.DockDirection =
    CENTER  : "center"
    EAST    : "east"
    NORTH   : "north"
    SOUTH   : "south"
    WEST    : "west"
*/

gwt.ui.DockDirection = {
    CENTER  : "center",
    EAST    : "east",
    NORTH   : "north",
    SOUTH   : "south",
    WEST    : "west"
};

gwt.ui.DockTmpRow = function() {
    return {
        center  : 0,
        tr      : null
    };
};

gwt.ui.DockLayoutData = function(dir) {
    return {
        direction   : dir,
        hAlign      : "left",
        height      : "",
        td          : null,
        vAlign      : "top",
        width       : ""
    };
};

/**

makeTmpRow = ->
    return tmpRow =
        center  : 0
        tr      : null

makeLayoutData = (dir) ->
    return tmp =
        direction   : dir
        hAlign      : "left"
        height      : ""
        td          : null
        vAlign      : "top"
        width       : ""
**/

/* END of Javascript */`

#class DockPanel extends gwt.ui.CellPanel
#gwt.ui.DockPanel = class DockPanel extends gwt.ui.CellPanel
class gwt$ui$DockPanel extends gwt.ui.CellPanel

    constructor: (opts) ->
        #TODO: style/spacing/padding

        #TODO:
        #@horzAlign = HasHorizontalAlignment.ALIGN_LEFT
        #@vertAlign = HasVerticalAlignment.ALIGN_TOP

        @center = null
        @dock_children = [] # TODO: can @children be used instead?

        super(opts)

    add : (widget, direction) ->
        if direction == gwt.ui.DockDirection.CENTER
            #TODO: check only 1 center
            @center = widget

        layout = new gwt.ui.DockLayoutData(direction)
        widget.setLayoutData(layout)

        #TODO:
        #@setCellHorizontalAlignment(widget, this.horzAlign)
        #@setCellVerticalAlignment(widget, this.vertAlign)

        @dock_children.push(widget)
        @realizeTable(widget)

    realizeTable : (beingAdded) ->
        bodyElement = this.getBody()

        # TODO:
        #while DOM.getChildCount(bodyElement) > 0:
        #    DOM.removeChild(bodyElement, DOM.getChild(bodyElement, 0))
        while (bodyElement.firstChild)
            bodyElement.removeChild(bodyElement.firstChild)

        rowCount = 1
        colCount = 1
        for child in @dock_children
            dir = child.getLayoutData().direction
            if dir == gwt.ui.DockDirection.NORTH or dir == gwt.ui.DockDirection.SOUTH
                rowCount += 1
            else if dir == gwt.ui.DockDirection.EAST or dir == gwt.ui.DockDirection.WEST
                colCount += 1

        rows = []
        for i in [0..rowCount-1]
            rows.push new gwt.ui.DockTmpRow
            rows[i].tr = DOM.createTR()
            DOM.appendChild(bodyElement, rows[i].tr)

        westCol = 0
        eastCol = colCount - 1
        northRow = 0
        southRow = rowCount - 1
        centerTd = null

        for child in @dock_children
            layout = child.getLayoutData()

            td = DOM.createTD()
            layout.td = td
            DOM.setAttribute(layout.td, "align", layout.hAlign)
            DOM.setStyleAttribute(layout.td, "verticalAlign", layout.vAlign)
            DOM.setAttribute(layout.td, "width", layout.width)
            DOM.setAttribute(layout.td, "height", layout.height)

            if layout.direction == gwt.ui.DockDirection.NORTH
                DOM.insertChild(rows[northRow].tr, td, rows[northRow].center)
                @appendAndMaybeAdopt(td, child.getElement(), beingAdded)
                DOM.setAttribute(td, "colSpan", eastCol - westCol + 1)
                northRow += 1
            else if layout.direction == gwt.ui.DockDirection.SOUTH
                DOM.insertChild(rows[southRow].tr, td, rows[southRow].center)
                @appendAndMaybeAdopt(td, child.getElement(), beingAdded)
                DOM.setAttribute(td, "colSpan", eastCol - westCol + 1)
                southRow -= 1
            else if layout.direction == gwt.ui.DockDirection.WEST
                row = rows[northRow]
                DOM.insertChild(row.tr, td, row.center)
                row.center += 1
                @appendAndMaybeAdopt(td, child.getElement(), beingAdded)
                DOM.setAttribute(td, "rowSpan", southRow - northRow + 1)
                westCol += 1
            else if layout.direction == gwt.ui.DockDirection.EAST
                row = rows[northRow]
                DOM.insertChild(row.tr, td, row.center)
                @appendAndMaybeAdopt(td, child.getElement(), beingAdded)
                DOM.setAttribute(td, "rowSpan", southRow - northRow + 1)
                eastCol -= 1
            else if layout.direction == gwt.ui.DockDirection.CENTER
                centerTd = td

        if @center != null
            row = rows[northRow]
            DOM.insertChild(row.tr, centerTd, row.center)
            @appendAndMaybeAdopt(centerTd, @center.getElement(), beingAdded)

    appendAndMaybeAdopt : (parent, child, beingAdded) ->
        if beingAdded != null
            if DOM.compare(child, beingAdded.getElement())
                #CellPanel.add(beingAdded, parent)
                @insert(beingAdded, parent, @getChildren().length)
                return

        DOM.appendChild(parent, child)

#gwt.ui.DockPanel = gwt$ui$DockPanel;
#gwt.ui.DockPanel = DockPanel;
gwt.ui.DockPanel = gwt$ui$DockPanel;


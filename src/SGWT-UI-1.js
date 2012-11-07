
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

// SGWT-UI Namespace (using this.gwt.ui for now):
this.gwt.ui = this.gwt.ui || { }

gwt.ui.setStyleName = function(element, style, add) {
    var oldStyle = DOM.getAttribute(element, "className");
    if (oldStyle == null) {
        oldStyle = "";
    }

    var idx = oldStyle.find(style);

/** TODO:
    // Calculate matching index
    lastPos = len(oldStyle)
    while idx != -1:
...

    if add:
        if idx == -1:
            DOM.setAttribute(element, "className", oldStyle + " " + style)
    else:
...
TODO **/
}

gwt.ui.Applier = gwt.Base.extend({
    constructor : function(opt) {
        // TODO: apply opt properties
    },
});

gwt.ui.UIObject = gwt.ui.Applier.extend({
    constructor : function(opts) {
        // do not initialise element, here, to null, whatever you do.
        // there are circumstances where UIObject.__init__ is the last
        // thing that is done in derived classes, where this.setElement
        // will _already_ have been called.
        //this.parent(opts);
        this.super__constructor(opts);
    },

    getAbsoluteLeft : function() {
        return DOM.getAbsoluteLeft(this.getElement());
    },

    getAbsoluteTop : function() {
        return DOM.getAbsoluteTop(this.getElement());
    },

    getElement : function() {
        // Get the DOM element associated with the UIObject, if any
        //return this.element;
        return (typeof this.element != "undefined") ? this.element : null;
    },

    // TODO TODO: ...

    setElement : function(element) {
        //Set the DOM element associated with the UIObject.
        this.element = element;
    },

    // TODO TODO: ...

    sinkEvents : function(eventBitsToAdd) {
        // Request that the given events be delivered to the event handler for this
        // element.  The event bits passed are added (using inclusive OR) to the events
        // already "sunk" for the element associated with the UIObject.  The event bits
        // are a combination of values from class L{Event}."""
        var element = this.getElement();
        if (element)
            DOM.sinkEvents(element, eventBitsToAdd | DOM.getEventsSunk(element));
    },

    // TODO TODO: ...

    // also callable as: setVisible(visible)
    setVisible : function(element, visible) {
        if (visible === null) {
            visible = element;
            element = this.element;
        }

        if (visible)
            DOM.setStyleAttribute(element, 'display', "");
        else
            DOM.setStyleAttribute(element, 'display', "none");
    },

    /* TODO:
    unsinkEvents(this. eventBitsToRemove) {
        """Reverse the operation of sinkEvents.  See L{UIObject.sinkevents}."""
        DOM.sinkEvents(this.getElement(), ~eventBitsToRemove & DOM.getEventsSunk(this.getElement()))
    }
     */

});

gwt.ui.Widget = gwt.ui.UIObject.extend({
    //  Base class for most of the UI classes.  This class provides basic services
    //  used by any Widget, including management of parents and adding/removing the
    //  event handler association with the DOM.

    constructor : function(opts) {
        this.attached = false;
        this.Parent = null;
        this.layoutData = null;
        this.contextMenu = null;

        //this.parent(opts);
        this.super__constructor(opts);
    },

    getLayoutData : function() {
        return this.layoutData;
    },

    getParent : function() {
        // Widgets are kept in a hierarchy, and widgets that have been added to a panel
        // will have a parent widget that contains them.  This retrieves the containing
        // widget for this widget.
        return this.Parent;
    },

    isAttached : function() {
        // Return whether or not this widget has been attached to the document.
        return this.attached;
    },

    // TODO : ...

    onBrowserEvent : function(evt) {
        // TODO
    },

    onLoad : function() {
        // pass
    },

    doDetachChildren : function() {
        // pass
    },

    doAttachChildren : function() {
        // pass
    },

    onAttach : function() {
        // Called when this widget has an element, and that element is on the document's
        // DOM tree, and we have a parent widget.
        if (this.isAttached()) {
            return;
        }

        this.attached = true;

        DOM.setEventListener(this.getElement(), this);

        this.doAttachChildren();
        this.onLoad();
    },

    onDetach : function() {
        // Called when this widget is being removed from the DOM tree of the document.
        if (!this.isAttached()) {
            return;
        }

        this.doDetachChildren();
        this.attached = false;
        DOM.setEventListener(this.getElement(), null);
    },

    setLayoutData : function(layoutData) {
        this.layoutData = layoutData;
    },

    setParent : function(parent) {
        // Update the parent attribute.  If the parent is currently attached to the DOM this
        // assumes we are being attached also and calls onAttach().
        oldparent = this.Parent;
        this.Parent = parent;
        if (parent === null) {
            if (oldparent !== null && oldparent.attached)
                this.onDetach();
        }
        else if (parent.attached) {
            this.onAttach();
        }
    },

    removeFromParent : function() {
        // Remove ourself from our parent.  The parent widget will call setParent(None) on
        // us automatically
        if (this.Parent != null && typeof this.Parent["remove"] != "undefined")
            this.Parent.remove(this);
    },

    getID : function() {
        // Get the id attribute of the associated DOM element.
        return DOM.getAttribute(this.getElement(), "id");
    },

    setID : function(id) {
        // Set the id attribute of the associated DOM element.
        DOM.setAttribute(this.getElement(), "id", id);
    },

});


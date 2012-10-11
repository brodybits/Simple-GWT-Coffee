
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

gwt.ui.Panel = gwt.ui.Widget.extend({
    constructor : function(opts) {
        this.children = [];

        this.parent(opts);
    },

    getChildren : function() {
        return this.children;
    },

    add : function() {
        //console.error("This panel does not support no-arg add()")
    },

    clear : function() {
        //# use this method, due to list changing as it's being iterated.
        children = [];
        for (child in this.children)
            children.append(child)

        for (child in children)
            this.remove(child)
    },

    disown : function(widget) {
        if (widget.getParent() != this) {
            //console.error("widget %o is not a child of this panel %o", widget, self)
        } else {
            element = widget.getElement();
            widget.setParent(null);
            parentElement = DOM.getParent(element);
            if (parentElement)
                DOM.removeChild(parentElement, element);
        }
    },

    adopt : function(widget, container) {
        if (container) {
            widget.removeFromParent();
            DOM.appendChild(container, widget.getElement());
        }
        widget.setParent(this);
    },

    remove : function(widget) {
        //pass
    },

    doAttachChildren : function() {
        //for (var child in this.children) {
        for (var i=0; i<this.children.length; i++) {
            var child = this.children[i];
            child.onAttach();
        }
    },

    doDetachChildren : function() {
        for (child in this.children) {
            child.onDetach();
        }
    },

});

gwt.ui.ComplexPanel = gwt.ui.Panel.extend({
    //  Superclass for widgets with multiple children.

    constructor : function(opts) {
        this.parent(opts);
    },

    add : function(widget, container) {
        this.insert(widget, container, this.children.length);
    },

    getWidgetCount : function() {
        return this.children.length;
    },

    getWidget : function(index) {
        return this.children[index];
    },

    getWidgetIndex : function(child) {
        return this.children.index(child);
    },

    getChildren : function() {
        return this.children;
    },

    insert : function(widget, container, beforeIndex) {
        if (widget.getParent() == this)
            return

        this.adopt(widget, container);
        //this.children.insert(beforeIndex, widget);
        if (beforeIndex < this.children.length)
            this.children.splice(beforeIndex, 0, widget);
        else
            this.children.push(widget);

        //# this code introduces an obscure IE6 bug that corrupts its DOM tree!
        //#widget.removeFromParent()
        //#this.children.insert(beforeIndex, widget)
        //#DOM.insertChild(container, widget.getElement(), beforeIndex)
        //#this.adopt(widget, container)
    },

    remove : function(widget) {
        if (!widget in this.children)
            return false;

        this.disown(widget);
        this.children.remove(widget);
        return true;
    },

});


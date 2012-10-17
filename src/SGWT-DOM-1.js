
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

// DOM Namespace (using this.DOM for now):
this.DOM = this.DOM || { }

var gwt$window = parent;

var $wnd = gwt$window;
var $doc = $wnd.document;

DOM.currentEvent = null;
DOM.sCaptureElem = null;
DOM.sEventPreviewStack = [];

DOM.init = function() {
    // Set up capture event dispatchers.
    $wnd.__dispatchCapturedMouseEvent = function(evt) {
        if ($wnd.__dispatchCapturedEvent(evt)) {
            var cap = DOM.getCaptureElement();
            if (cap && cap.__listener) {
                DOM.dispatchEvent(evt, cap, cap.__listener);
                evt.stopPropagation();
            }
        }
    };

    $wnd.__dispatchCapturedEvent = function(evt) {
        if (!DOM.previewEvent(evt)) {
            evt.stopPropagation();
            evt.preventDefault();
            return false;
        }

        return true;
        };

    $wnd.addEventListener(
        'mouseout',
        function(evt){
            var cap = DOM.getCaptureElement();
            if (cap) {
                if (!evt.relatedTarget) {
                    // When the mouse leaves the window during capture, release capture
                    // and synthesize an 'onlosecapture' event.
                    DOM.sCaptureElem = null;
                    if (cap.__listener) {
                        var lcEvent = $doc.createEvent('UIEvent');
                        lcEvent.initUIEvent('losecapture', false, false, $wnd, 0);
                        DOM.dispatchEvent(lcEvent, cap, cap.__listener);
                    }
                }
            }
        },
        true
    );

    $wnd.addEventListener('click', $wnd.__dispatchCapturedMouseEvent, true);
    $wnd.addEventListener('dblclick', $wnd.__dispatchCapturedMouseEvent, true);
/** Future:
    $wnd.addEventListener('mousedown', $wnd.__dispatchCapturedMouseEvent, true);
    $wnd.addEventListener('mouseup', $wnd.__dispatchCapturedMouseEvent, true);
    $wnd.addEventListener('mousemove', $wnd.__dispatchCapturedMouseEvent, true);
**/
    $wnd.addEventListener('keydown', $wnd.__dispatchCapturedEvent, true);
    $wnd.addEventListener('keyup', $wnd.__dispatchCapturedEvent, true);
    $wnd.addEventListener('keypress', $wnd.__dispatchCapturedEvent, true);
    
    $wnd.__dispatchEvent = function(evt) {
    
        var listener, curElem = this;
        
        while (curElem && !(listener = curElem.__listener)) {
            curElem = curElem.parentNode;
        }
        if (curElem && curElem.nodeType != 1) {
            curElem = null;
        }
    
        if (listener) {
            DOM.dispatchEvent(evt, curElem, listener);
        }
    };
}

DOM.init();

// TODO ...

DOM.compare = function(elem1, elem2) {
    return (elem1 == elem2);
};

DOM.createElement = function(tag) {
    return $doc.createElement(tag);
};

// TODO ...

DOM.getCaptureElement = function() {
    return DOM.sCaptureElem;
}

// TODO ...

DOM.getEventsSunk = function(element) {
    // Return which events are currently "sunk" for a given DOM node.  See
    // sinkEvents() for more information.
    return element.__eventBits ? element.__eventBits : 0;
}

// TODO ...

DOM.setAttribute = function(element, attribute, value) {
    element[attribute] = value;
};

// TODO ...

DOM.setEventListener = function(element, listener) {
    // Register an object to receive event notifications for the given
    // element.  The listener's onBrowserEvent() method will be called
    // whenegister an object to receive event notifications for the given
    // element.  The listener's onBrowserEvent() method will be called
    // when a captured event occurs.  To set which events are captured,
    // use sinkEvents().
    element.__listener = listener;
}

DOM.setInnerHTML = function(elem, html) {
    // TODO deal with opera, etc?
    elem.innerHTML = html;
}

// TODO not working?
DOM.setInnerText = function(elem, text) {
    // Remove all children first.
    while (elem.firstChild) {
        elem.removeChild(elem.firstChild);
    }
    // Add a new text node.
    elem.appendChild($doc.createTextNode(text));
}

// TODO ...

DOM.setStyleAttribute = function(element, attr, value) {
    element.style[attr] = value;
};

DOM.sinkEvents = function(element, bits) {
    // Set which events should be captured on a given element and passed to the
    // registered listener.  To set the listener, use setEventListener().
    //
    // @param bits: A combination of bits; see ui.Event for bit values
    element.__eventBits = bits;
    
    element.onclick    = (bits & 0x00001) ? $wnd.__dispatchEvent : null;
    element.ondblclick  = (bits & 0x00002) ? $wnd.__dispatchEvent : null;
    element.onmousedown   = (bits & 0x00004) ? $wnd.__dispatchEvent : null;
    element.onmouseup    = (bits & 0x00008) ? $wnd.__dispatchEvent : null;
    element.onmouseover   = (bits & 0x00010) ? $wnd.__dispatchEvent : null;
    element.onmouseout  = (bits & 0x00020) ? $wnd.__dispatchEvent : null;
    element.onmousemove   = (bits & 0x00040) ? $wnd.__dispatchEvent : null;
    element.onkeydown    = (bits & 0x00080) ? $wnd.__dispatchEvent : null;
    element.onkeypress  = (bits & 0x00100) ? $wnd.__dispatchEvent : null;
    element.onkeyup    = (bits & 0x00200) ? $wnd.__dispatchEvent : null;
    element.onchange      = (bits & 0x00400) ? $wnd.__dispatchEvent : null;
    element.onfocus    = (bits & 0x00800) ? $wnd.__dispatchEvent : null;
    element.onblur      = (bits & 0x01000) ? $wnd.__dispatchEvent : null;
    element.onlosecapture = (bits & 0x02000) ? $wnd.__dispatchEvent : null;
    element.onscroll      = (bits & 0x04000) ? $wnd.__dispatchEvent : null;
    element.onload      = (bits & 0x08000) ? $wnd.__dispatchEvent : null;
    element.onerror    = (bits & 0x10000) ? $wnd.__dispatchEvent : null;
    element.oncontextmenu = (bits & 0x20000) ? $wnd.__dispatchEvent : null;
}

// TODO ...

// TODO: missing dispatchEventAndCatch

DOM.dispatchEvent = function(evt, element, listener) {
    DOM.dispatchEventImpl(evt, element, listener);
}

DOM.previewEvent = function(evt) {
    var ret = true;
    if (DOM.sEventPreviewStack.length > 0) {
        var preview = DOM.sEventPreviewStack[DOM.sEventPreviewStack.length - 1];

        ret = preview.onEventPreview(evt);
        if (!ret) {
            eventCancelBubble(evt, true);
            eventPreventDefault(evt);
        }
    }

    return ret;
}

// TODO
DOM.dispatchEventAndCatch = function(evt, elem, listener, handler) {
    // pass
}

DOM.dispatchEventImpl = function(evt, element, listener) {
    //global sCaptureElem, currentEvent;
    if (element == DOM.sCaptureElem)
        if (eventGetType(evt) == "losecapture")
            DOM.sCaptureElem = null;

    var prevCurrentEvent = DOM.currentEvent;
    DOM.currentEvent = evt;
    listener.onBrowserEvent(evt);
    DOM.currentEvent = prevCurrentEvent;
}


// TODO ...


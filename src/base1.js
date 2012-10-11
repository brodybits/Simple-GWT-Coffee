
/**
 *  Source:
AJS JavaScript library
    A very small library with a lot of functionality
AUTHOR
    4mir Salihefendic (http://amix.dk) - amix@amix.dk
LICENSE
    Copyright (c) 2006 amix. All rights reserved.
    Copyright (c) 2005 Bob Ippolito. All rights reserved.
    http://www.opensource.org/licenses/mit-license.php
 */

AJS$update = function(l1, l2) {
    for(var i in l2)
        l1[i] = l2[i];
    return l1;
}

AJS$Class = function(members) {
    var fn = function() {
        if(arguments[0] != 'no_init') {
            return this.constructor.apply(this, arguments);
        }
    }
    fn.prototype = members;
    AJS$update(fn, AJS$Class.prototype);
    return fn;
}
AJS$Class.prototype = {
    extend: function(members) {
        var parent = new this('no_init');
        for(k in members) {
            var prev = parent[k];
            var cur = members[k];
            if (prev && prev != cur && typeof cur == 'function') {
                cur = this._parentize(cur, prev);
            }
            parent[k] = cur;
        }
        return new AJS$Class(parent);
    },

    implement: function(members) {
        AJS$update(this.prototype, members);
    },

    _parentize: function(cur, prev) {
        return function(){
            this.parent = prev;
            return cur.apply(this, arguments);
        }
    }
};//End class

// Source: http://weblogs.asp.net/mschwarz/archive/2005/08/26/423699.aspx
function $NS(ns)
{
 var nsParts = ns.split(".");
 var root = window;

 for(var i=0; i<nsParts.length; i++)
 {
  if(typeof root[nsParts[i]] == "undefined")
   root[nsParts[i]] = new Object();

  root = root[nsParts[i]];
 }
}

$NS("gwt");

gwt.Base = new AJS$Class({});


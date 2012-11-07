// Copyright 2012 Chris Brody
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

// SGWT Namespace (using gwt for now):
this.gwt = this.gwt || { }

// Real SGWT Namespace for new Base class:
this.SGWT = this.SGWT || { }

// XXX OLD VERSION:
// Base class, extended for all other GWT classes:
// (using AJS$Class for now):
//gwt.Base = new AJS$Class({});

/**
 ** Making base classes for inheritance.
 ** Using the online TypeScript language compiler at
 ** http://www.typescriptlang.org/Playground/
 ** to make it easier.
 **
 ** Test code in TypeScript:
 **
 ** class SuperBase {
 ** 	//constructor(params) { this.params = params; }
 ** }
 **
 ** class MyBase extends SuperBase {
 ** 	constructor(params) { super(params); }
 ** }
 **
 ** class MySub extends MyBase {
 ** 	constructor(params) { super(params); }
 ** 	alert(string) { alert(string); }
 ** }
 **
 ** Output in JavaScript (blank lines inserted):
 **
 ** var __extends = this.__extends || function (d, b) {
 **     function __() { this.constructor = d; }
 **     __.prototype = b.prototype;
 **     d.prototype = new __();
 ** }
 **
 ** var SuperBase = (function () {
 **     function SuperBase() { }
 **     return SuperBase;
 ** })();
 **
 ** var MyBase = (function (_super) {
 **     __extends(MyBase, _super);
 **     function MyBase() {
 **         _super.prototype(params);
 **     }
 **     return MyBase;
 ** })(SuperBase);
 **
 ** var MySub = (function (_super) {
 **     __extends(MySub, _super);
 **     function MySub(params) {
 **         _super.prototype({
 **         }, p2, p3);
 **     }
 **     MySub.prototype.alert = function (string) {
 **         alert(string);
 **     };
 **     return MySub;
 ** })(MyBase);
 **
 **/

var my__extends = function (d, b) {
    function __() { this.constructor = d; }
    //__.prototype = b.prototype;
    __.prototype = b;
    d.prototype = new __();
}

var SuperBase = (function () {
    function SuperBase() { }
    return SuperBase;
})();

var MyBase = (function (_super) {
    //__extends(MyBase, _super);
    my__extends(MyBase, _super.prototype);
    function MyBase() {
        _super.apply(this, arguments);

    }

    // class variable(s):
    MyBase.prototype.constructor = function() { }; // do nothing "ctor"

    // class method:
    MyBase.extend = function(pro) {

        var myconstructor = this.prototype.constructor;

        function MySub(/* arguments */) {
            this.constructor.apply(this, arguments);
        }
        my__extends(MySub, this.prototype);

        for (p in pro) {
            MySub.prototype[p] = pro[p];
        }

        // "parentize" the constructor (only):
        var mysubconstructor = pro.constructor;

        MySub.prototype.constructor = function() {
            this.super__constructor = myconstructor;
            this.supercall = myconstructor;

            mysubconstructor.apply(this, arguments);
        }

        // add class method to sub-class:
        MySub.extend = MyBase.extend;
        return MySub;
    }

    return MyBase;
})(SuperBase);

gwt.Base = MyBase;
//SGWT.Base = MyBase;

// simple test code here:
/** START of simple test code:

alert("a1a");

//var Test1 = MyBase.extend({constructor : function() { alert("c1"); }, f1: function() { alert("f1"); } });
//var Test1 = MyBase.extend({constructor : function(p1) { alert("c1 " + p1); }, f1: function(p1) { alert("f1 " + p1); } });
var Test1 = MyBase.extend({constructor : function(p1) { alert("c1 " + p1); }, f1: function(p1) { alert("f1 " + p1); }, f2: function() {alert("f2");} });

alert("a2");

//var t1 = new Test1();
var t1 = new Test1("P1");
alert("a2a");
t1.f1("p1");

//var Test2 = Test1.extend({constructor : function() { alert("c2"); this.f1(); alert("c2a");this.parent2(); }, f1: function() { alert("f1 extended"); }, parent1:function() {alert("p1");} });
var Test2 = Test1.extend({constructor : function() { alert("c2"); this.f1(); alert("c2a");this.super__constructor("my opt"); }, f1: function() { alert("f1 extended"); } });
alert("a3a");
var t2 = new Test2();
//t2.f1();
t2.f2();

var Test3 = Test2.extend({constructor : function() { alert("c3"); this.super__constructor(); } });
var t3 = new Test3();

/** END of simple test code **/


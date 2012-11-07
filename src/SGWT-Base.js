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

// SGWT Namespace:
this.SGWT = this.SGWT || { }

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

// export SGWT.Base:
SGWT.Base = MyBase;


#!/usr/bin/env node

var assert = require("assert"),
    yui3 = require("../lib/node-yui3");

module.exports = {
    "yui3.useSync" : function () {
        var Y = yui3.useSync("loader");
        assert.ok(Y.Loader);
    },
    "yui3.configure({}).useSync" : function () {
        var Y = yui3.configure({ debug: false }).useSync("loader");
        assert.ok(Y.Loader);
    },
    "yui3.YUI" : function () {
        var Y = yui3.YUI;
        assert.ok(Y);
        assert.isUndefined(Y.Loader);
    },
    "yui3.configure({}).YUI" : function () {
        var Y = yui3.configure({ debug: false }).YUI;
        assert.ok(Y);
        assert.isUndefined(Y.Loader);
    },
    "yui3.use" : function () {
        yui3.use("loader", function (Y) {
            assert.ok(Y.Loader);
        });
    },
    "yui3.configure({}).use" : function () {
        yui3.configure({ debug: false }).use("loader", function (Y) {
            assert.ok(Y.Loader);
        });
    },
    "rls-full": function() {
        yui3.rls({
            m: 'yui,loader,dd,widget,autocomplete,gallery-yql,yui2-datatable',
            v: '3.3.0pr3',
            gv: '2010.09.22',
            '2in3v': '0.0.3'
        }, function(js, css) {
            assert.equal(js.length, 33);
            assert.equal(css.length, 4);
        });
    },
    "rls-mods": function() {
        yui3.rls({
            m: 'dd,widget,autocomplete,gallery-yql,yui2-datatable',
            //env: 'node,attribute',
            v: '3.3.0pr3',
            gv: '2010.09.22',
            '2in3v': '0.0.3'//,
            //filt: 'RAW',
        }, function(js, css) {
            assert.equal(js.length, 31);
            assert.equal(css.length, 4);
        });
    },
    "rls-env": function() {
        yui3.rls({
            m: 'dd,widget,autocomplete,gallery-yql,yui2-datatable',
            env: 'node,attribute',
            v: '3.3.0pr3',
            gv: '2010.09.22',
            '2in3v': '0.0.3'//,
            //filt: 'RAW',
        }, function(js, css) {
            assert.equal(js.length, 26);
            assert.equal(css.length, 4);
        });
    },
    "rls-filter-raw": function() {
        yui3.rls({
            m: 'dd,widget,autocomplete,gallery-yql,yui2-datatable',
            env: 'node,attribute',
            v: '3.3.0pr3',
            gv: '2010.09.22',
            '2in3v': '0.0.3',
            filt: 'RAW'
        }, function(js, css) {
            assert.equal(js.length, 26);
            assert.equal(css.length, 4);
            assert.ok(js[0].indexOf('classnamemanager.js') > 0);
        });
    },
    "rls-filter-min": function() {
        yui3.rls({
            m: 'dd,widget,autocomplete,gallery-yql,yui2-datatable',
            env: 'node,attribute',
            v: '3.3.0pr3',
            gv: '2010.09.22',
            '2in3v': '0.0.3',
            filt: 'MIN'
        }, function(js, css) {
            assert.equal(js.length, 26);
            assert.equal(css.length, 4);
            assert.ok(js[0].indexOf('classnamemanager-min.js') > 0);
        });
    },
    "rls-filter-debug": function() {
        yui3.rls({
            m: 'dd,widget,autocomplete,gallery-yql,yui2-datatable',
            env: 'node,attribute',
            v: '3.3.0pr3',
            gv: '2010.09.22',
            '2in3v': '0.0.3',
            filt: 'DEBUG'
        }, function(js, css) {
            assert.equal(js.length, 26);
            assert.equal(css.length, 4);
            assert.ok(js[0].indexOf('classnamemanager-debug.js') > 0);
        });
    },
    "rls-version-33": function() {
        yui3.rls({
            m: 'dd,widget,autocomplete,gallery-yql,yui2-datatable',
            env: 'node,attribute',
            v: '3.3.0pr3',
            gv: '2010.09.22',
            '2in3v': '0.0.3'
        }, function(js, css) {
            assert.equal(js.length, 26);
            assert.equal(css.length, 4);
            assert.ok(js[0].indexOf('3.3.0') > 0);
        });
    },
    "rls-version-32": function() {
        yui3.rls({
            m: 'dd,widget,gallery-yql,yui2-datatable',
            env: 'node,attribute',
            v: '3.2.0',
            gv: '2010.09.22',
            '2in3v': '0.0.3'
        }, function(js, css) {
            assert.equal(js.length, 15);
            assert.equal(css.length, 2);
            assert.ok(js[0].indexOf('3.2.0') > 0);
        });
    },
    "rls-version-gallery": function() {
        yui3.rls({
            m: 'dd,widget,gallery-yql,yui2-datatable',
            env: 'node,attribute',
            v: '3.2.0',
            gv: '2010.09.22',
            '2in3v': '0.0.3'
        }, function(js, css) {
            assert.equal(js.length, 15);
            assert.equal(css.length, 2);
            js.forEach(function(v) {
                if (v.indexOf('yui3-gallery') > -1) {
                    assert.ok(v.indexOf('2010.09.22') > 0);
                }
            });
        });
    },
    "rls-version-yui2": function() {
        yui3.rls({
            m: 'dd,widget,gallery-yql,yui2-datatable',
            env: 'node,attribute',
            v: '3.2.0',
            gv: '2010.09.22',
            '2in3v': '0.0.2'
        }, function(js, css) {
            assert.equal(js.length, 15);
            assert.equal(css.length, 2);
            js.forEach(function(v) {
                if (v.indexOf('yui3-2in3') > -1) {
                    assert.ok(v.indexOf('0.0.2') > 0);
                }
            });
        });
    }
};


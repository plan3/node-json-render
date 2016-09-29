'use strict';

const chai = require('chai');
chai.should();

const rx = require('../lib/regex');
const expectedDefaultRegex = Object.assign(/\$\{((?:(?!\$\{).)+?)\}/g, {
    leftDelimiter: '${',
    rightDelimiter: '}'
});

function deepEqualRegex(actual, expected) {
    actual.should.eql(expected);
    actual.leftDelimiter.should.equal(expected.leftDelimiter);
    actual.rightDelimiter.should.equal(expected.rightDelimiter);
}

describe('regex', function() {
    it('Should give proper default regex', function() {
        deepEqualRegex(rx.default, expectedDefaultRegex);
    });

    it('Should give default regex if no args provided', function() {
        deepEqualRegex(rx(), expectedDefaultRegex);
    });

    it('Should give proper regex for same left and right delimiter', function() {
        const expected = Object.assign(/`(.+?)`/g, {leftDelimiter: '`', rightDelimiter: '`'});
        deepEqualRegex(rx('`', '`'), expected);
    });

    it('Should give proper regex for same left and right delimiter if second arg omitted', function() {
        const expected = Object.assign(/`(.+?)`/g, {leftDelimiter: '`', rightDelimiter: '`'});
        deepEqualRegex(rx('`'), expected);
    });

    it('Should give proper regex for different left and right delimiter', function() {
        const expected = Object.assign(/\{((?:(?!\{).)+?)\}/g, {leftDelimiter: '{', rightDelimiter: '}'});
        deepEqualRegex(rx('{', '}'), expected);
    });

    it('Should replace empty string delimiter with default', function() {
        let expected = Object.assign(/\{((?:(?!\{).)+?)\}/g, {leftDelimiter: '{', rightDelimiter: '}'});
        let generated = rx('{', '');
        deepEqualRegex(generated, expected);
        expected = Object.assign(/\$\{((?:(?!\$\{).)+?)\}/g, {leftDelimiter: '${', rightDelimiter: '}'});
        generated = rx('', '}');
        deepEqualRegex(generated, expected);
        expected = Object.assign(/\$\{((?:(?!\$\{).)+?)\}/g, {leftDelimiter: '${', rightDelimiter: '}'});
        generated = rx('', '');
        deepEqualRegex(generated, expected);
    });

    it('Should fail on not string or undefined args', function() {
        rx.bind(null, false).should.throw(TypeError);
        rx.bind(null, 1).should.throw(TypeError);
        rx.bind(null, {}).should.throw(TypeError);
        rx.bind(null, '{', true).should.throw(TypeError);
        rx.bind(null, '', 1).should.throw(TypeError);
    });
});

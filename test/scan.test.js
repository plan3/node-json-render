'use strict';

const chai = require('chai');
chai.should();

const scan = require('../lib/scan');

function compareTransformations(expected, actual) {
    actual.length.should.equal(expected.length);
    for (let idx in actual) {
        actual[idx].path.should.eql(expected[idx].path);
        actual[idx].matched.should.eql(expected[idx].matched);
    }
}

describe('scan', function() {
    it('Should pass the scan test with same left and right delimiter', function() {
        const input = JSON.parse(JSON.stringify(require('./data/scan/input_same.json')));
        const output = require('./data/scan/output_same');
        const regex = /`(.+?)`/g;
        const matched = scan(input, regex);
        compareTransformations(output, matched);
    });

    it('Should pass the scan test with different left and right delimiter', function() {
        const input = JSON.parse(JSON.stringify(require('./data/scan/input_different.json')));
        const output = require('./data/scan/output_different');
        const regex = /\{((?:(?!\{).)+?)\}/g;
        const matched = scan(input, regex);
        compareTransformations(output, matched);
    });
});

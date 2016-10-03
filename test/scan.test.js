'use strict';

const chai = require('chai');
chai.should();

const scan = require('../lib/scan');

function testSingle(template, regex, expected) {
    const scanned = scan(template, regex);
    scanned.length.should.equal(expected.length);
    scanned.should.deep.include.members(expected);
}

describe('scan', function() {
    describe('Different left and right delimiter', function() {
        const regex = /\{((?:(?!\{).)+?)\}/g;

        it('Should match whole string', function() {
            const template = {
                whole: "{whole}"
            };
            const expected = [{path: ['whole'], matched: '{whole}'}];
            testSingle(template, regex, expected);
        });

        it('Should match whole string nested in object', function() {
            const template = {
                object: {
                    object_whole: "{object_whole}"
                }
            };
            const expected = [{path: ['object', 'object_whole'], matched: '{object_whole}'}];
            testSingle(template, regex, expected);
        });

        it('Should match whole string nested in array', function() {
            const template = {
                array: ["Lookup array", "{array_whole}"]
            };
            const expected = [{path: ['array', '1'], matched: '{array_whole}'}];
            testSingle(template, regex, expected);
        });

        it('Should match simple partials in string', function() {
            const template = {
                partial_start: "{partial_start} should be matched",
                partial_middle: "This {partial_middle} should be matched",
                partial_end: "Should match {partial_end}"
            };
            const expected = [
                {path: ['partial_start'], matched: ['{partial_start}']},
                {path: ['partial_middle'], matched: ['{partial_middle}']},
                {path: ['partial_end'], matched: ['{partial_end}']}
            ];
            testSingle(template, regex, expected);
        });

        it('Should match variable with spaces', function() {
            const template = {
                " with spaces ": "Should match also { with spaces }"
            };
            const expected = [{path: [' with spaces '], matched: ['{ with spaces }']}];
            testSingle(template, regex, expected);
        });

        it('Should match multiple variables in one string', function() {
            const template = {
                multiple: "Should match {multiple_1} and {multiple_2}"
            };
            const expected = [{path: ['multiple'], matched: ['{multiple_1}', '{multiple_2}']}];
            testSingle(template, regex, expected);
        });

        it('Should match most nested variables', function() {
            const template = {
                nested: "Should {match {most {nested_1}} & {nested_2}} only"
            };
            const expected = [{path: ['nested'], matched: ['{nested_1}', '{nested_2}']}];
            testSingle(template, regex, expected);
        });

        it('Should match multiple occurrences of variable only once', function() {
            const template = {
                repeated: "Should match this {value} and that {value}. The {value} also."
            };
            const expected = [{path: ['repeated'], matched: ['{value}']}];
            testSingle(template, regex, expected);
        });

        it('Should match variables nested in object', function() {
            const template = {
                object: {
                    object_partial: "This is {object_partial} match",
                    array_in_object: [
                        "Search in {array_in_object}"
                    ]
                }
            };
            const expected = [
                {path: ['object', 'object_partial'], matched: ['{object_partial}']},
                {path: ['object', 'array_in_object', '0'], matched: ['{array_in_object}']}
            ];
            testSingle(template, regex, expected);
        });

        it('Should match variables nested in array', function() {
            const template = {
                array: [
                        "Lookup array",
                        "Find {array_partial} too",
                        {object_in_array: "Search on {object_in_array} too"}
                    ]
            };
            const expected = [
                {path: ['array', '1'], matched: ['{array_partial}']},
                {path: ['array', '2', 'object_in_array'], matched: ['{object_in_array}']}
            ];
            testSingle(template, regex, expected);
        });

        it('Should match nothing', function() {
            const template = {
                no_match: "There should be |no_match}"
            };
            const expected = [];
            testSingle(template, regex, expected);
        });
    });

    describe('Same left and right delimiter', function() {
        const regex = /`(.+?)`/g;

        it('Should match whole string', function() {
            const template = {
                whole: "`whole`"
            };
            const expected = [{path: ['whole'], matched: '`whole`'}];
            testSingle(template, regex, expected);
        });

        it('Should match simple partials in string', function() {
            const template = {
                partial_start: "'`partial_start`' should be matched",
                partial_middle: "This '`partial_middle`' should be matched",
                partial_end: "Should match '`partial_end`'"
            };
            const expected = [
                {path: ['partial_start'], matched: ['`partial_start`']},
                {path: ['partial_middle'], matched: ['`partial_middle`']},
                {path: ['partial_end'], matched: ['`partial_end`']}
            ];
            testSingle(template, regex, expected);
        });

        it('Should match multiple variables in one string', function() {
            const template = {
                multiple: "Should match `multiple_1` and `multiple_2`"
            };
            const expected = [{path: ['multiple'], matched: ['`multiple_1`', '`multiple_2`']}];
            testSingle(template, regex, expected);
        });

        it('Can\'t match most nested variables', function() {
            const template = {
                nested: "Won't `match `only most `nested_1`` & `nested_2`` only"
            };
            const expected = [{path: ['nested'], matched: ['`match `', '`nested_1`', '` & `']}];
            testSingle(template, regex, expected);
        });

        it('Should match nothing', function() {
            const template = {
                no_match: "There should be {no_match}"
            };
            const expected = [];
            testSingle(template, regex, expected);
        });
    });
});

'use strict';

module.exports = [
    {path: ['whole'], matched: '`whole`'},
    {path: ['partial_start'], matched: ['`partial_start`']},
    {path: ['partial_middle'], matched: ['`partial_middle`']},
    {path: ['partial_end'], matched: ['`partial_end`']},
    {path: [' with spaces '], matched: ['` with spaces `']},
    {path: ['multiple'], matched: ['`multiple_1`', '`multiple_2`']},
    {path: ['nested'], matched: ['`match `', '`nested_1`', '` & `']},
    {path: ['repeated'], matched: ['`value`']},
    {path: ['object', 'object_whole'], matched: '`object_whole`'},
    {path: ['object', 'object_partial'], matched: ['`object_partial`']},
    {path: ['object', 'array_in_object', '0'], matched: ['`array_in_object`']},
    {path: ['array', '1'], matched: '`array_whole`'},
    {path: ['array', '2'], matched: ['`array_partial`']},
    {path: ['array', '3', 'object_in_array'], matched: ['`object_in_array`']}
];

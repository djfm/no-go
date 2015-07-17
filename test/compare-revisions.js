/* global describe, it */
import chai from 'chai';
import _ from 'underscore';
chai.should();

import compareRevisions from '../lib/compare-revisions';

describe('compareRevisions', function () {
    var examples = [
        ['1.6.0.14'             , '1.6.0.15'    ,   -1],
        ['1.6.0'                , '1.6.0.15'    ,   -1],
        ['1.6.0.14'             , '1.6.0.14'    ,    0],
        ['1.6.0.x'              , '1.6.0.14'    ,   -1],
        ['1.x'                  , '1.6.0.14'    ,   -1],
        ['1.6-bob.l-eponge'     , '1.6'         ,   -1],
        ['1.6-alpha'            , '1.6-beta'    ,   -1],
    ];

    _.each(examples, ([a, b, order]) => {
        var direction;

        // Check the direction of the example
        direction = (order < 0 ? 'before' : (order > 0 ? 'after' : 'same as'));
        it('Should sort `' + a + '` ' + direction + ' `' + b + '`', () => {
            compareRevisions(a, b).should.equal(order);
        });

        if (order !== 0) {
            // And we get the converse test for free
            direction = (order > 0 ? 'before' : (order < 0 ? 'after' : 'same as'));
            it('Should sort `' + b + '` ' + direction + ' `' + a + '`', () => {
                compareRevisions(b, a).should.equal(-order);
            });
        }
    });
});

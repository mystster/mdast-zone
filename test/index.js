/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module mdast-zone
 * @fileoverview Test suite for `mdast-zone`.
 */

'use strict';

/* Dependencies. */
var test = require('tape');
var remark = require('remark');
var zone = require('..');
var fixtures = require('./fixtures');

/* Tests. */
test('mdast-zone', function (t) {
  fixtures.forEach(function (fixture) {
    remark()
      .use(function () {
        return function (tree) {
          fixture.test(t, zone, tree);
        };
      })
      .process(fixture.input, function (err, file) {
        t.ifError(err, 'should not fail (' + fixture.name + ')');

        if (fixture.output) {
          t.equal(
            String(file),
            fixture.output,
            'should stringify ' + fixture.name
          );
        }
      });
  });

  t.end();
});

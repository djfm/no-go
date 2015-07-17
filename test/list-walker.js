/* global describe, it */
import chai from 'chai';
import fs from 'fs';
import path from 'path';

import listWalker from '../lib/list-walker';

chai.should();

describe('The list walker', function () {
    it('should get all revision labels, in the right order', function () {
        var example = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures', 'example.json')).toString());

        listWalker.getRevisionLabels(example).should.deep.equal([
            '1.6.0.13', '1.6.0.14', '1.6.1.0'
        ]);
    });
});

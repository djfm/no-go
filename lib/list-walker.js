import _ from 'underscore';

import compareRevisions from './compare-revisions';

export default {
    forEachNode (rootNode, callback) {
        callback(rootNode);
        _.map(rootNode.children, child => {
            this.forEachNode(child, callback);
        }, this);
    },
    getRevisionLabels (list) {

        var labels = [];

        this.forEachNode(list, function (node) {
            if (node.itemsToCheck) {
                _.each(node.itemsToCheck, item => {
                    if (item.revisions) {
                        _.each(item.revisions, revision => {
                            labels.push(revision.label);
                        });
                    }
                });
            }
        });

        return _.uniq(labels).sort(compareRevisions);
    }
};

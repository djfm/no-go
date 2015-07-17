import reqwest from 'reqwest';

import dispatcher from '../scripts/dispatcher';
import {EventEmitter} from 'events';
import _ from 'underscore';

class ListStore extends EventEmitter {

    constructor () {
        super();
        this._changeListeners = {};
        this._lists = {};
    }

    loadList (listId) {
        reqwest('lists/' + listId + '.json').then((list => {
            this._lists[listId] = list;
            this.emitChange(listId);
        }).bind(this));
    }

    getRevisionLabels (listId) {
        if (!this._lists[listId]) {
            return [];
        } else {
            // TODO: walk the list and extract, then sort all the revision labels.
        }
    }

    emitChange (listId) {
        this.emit('CHANGE', this.getState(listId));
    }

    getState (listId) {
        return {
            listId: listId,
            list: this._lists[listId]
        };
    }

    addChangeListener (listId, callback) {
        var listener = data => {
            if (data.listId === listId) {
                callback(data);
            }
        };
        this._changeListeners[listId] = this._changeListeners[listId] || [];
        this._changeListeners[listId].push({
            originalCallback: callback,
            actualCallback: listener
        });
        this.addListener('CHANGE', listener);
    }

    removeChangeListener (listId, callback) {
        this.removeListener(
            'CHANGE',
            _.findWhere(
                this._changeListeners[listId],
                {originalCallback: callback}
            ).actualCallback
        );
    }
}

var listStore = new ListStore();

dispatcher.register(payload => {
    if (payload.actionType === 'NODE_UPDATE') {
        payload.node[payload.property] = payload.newValue;
        listStore.emitChange(payload.listId);
    }
});

export default listStore;

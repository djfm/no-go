import reqwest from 'reqwest';

import dispatcher from '../scripts/dispatcher';
import {EventEmitter} from 'events';
import _ from 'underscore';

import listWalker from '../lib/list-walker';

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
            return listWalker.getRevisionLabels(this._lists[listId]);
        }
    }

    emitChange (listId) {
        this.emit('CHANGE', this.getState(listId));
    }

    getState (listId) {
        return {
            listId: listId,
            list: this._lists[listId],
            revisionLabels: this.getRevisionLabels(listId)
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
    } else if (payload.actionType === 'ADD_ITEM_TO_CHECK') {
        payload.node.itemsToCheck = payload.node.itemsToCheck || [];
        payload.node.itemsToCheck.push(payload.item);
        listStore.emitChange(payload.listId);
    }
});

export default listStore;

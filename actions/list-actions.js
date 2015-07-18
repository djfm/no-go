import _ from 'underscore';
import dispatcher from '../scripts/dispatcher';
import listStore from '../stores/list-store';

export default {
    loadList (listId) {
        listStore.loadList(listId);
    },
    updateNode (data) {
        dispatcher.dispatch(_.extend({
            actionType: 'NODE_UPDATE'
        }, data));
    },
    addItemToCheck (data) {
        dispatcher.dispatch(_.extend({
            actionType: 'ADD_ITEM_TO_CHECK'
        }, data));
    }
};

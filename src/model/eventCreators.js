export const EVENT_TYPES = Object.freeze({
  ITEM_ADDED: 'ITEM_ADDED',
  TEXT_CHANGED: 'TEXT_CHANGED',
  ITEM_DELETED: 'ITEM_DELETED',
  ITEM_TOGGLED: 'ITEM_TOGGLED',
  ALL_ITEMS_TOGGLED: 'ALL_ITEMS_TOGGLED',
  COMPLETED_ITEMS_DELETED: 'COMPLETED_ITEMS_DELETED',
  FILTER_CHANGED: 'FILTER_CHANGED'
});

export default {
  add: text => ({
    type: EVENT_TYPES.ITEM_ADDED,
    payload: text
  }),
  changeText: (id, text) => ({
    type: EVENT_TYPES.TEXT_CHANGED,
    payload: {
      text,
      id
    }
  }),
  delete: id => ({
    type: EVENT_TYPES.ITEM_DELETED,
    payload: id
  }),
  toggle: id => ({
    type: EVENT_TYPES.ITEM_TOGGLED,
    payload: id
  }),
  toggleAll: () => ({
    type: EVENT_TYPES.ALL_ITEMS_TOGGLED
  }),
  clearCompleted: () => ({
    type: EVENT_TYPES.COMPLETED_ITEMS_DELETED
  }),
  changeFilter: filter => ({
    type: EVENT_TYPES.FILTER_CHANGED,
    payload: filter
  })
};

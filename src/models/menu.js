// import { queryNotices } from '../services/api';

export default {
  namespace: 'menu',

  state: {
    collapsed: false
  },

  effects: {

  },

  reducers: {
    changeCollapsed(state, { payload }) {

      return {
        ...state,
        collapsed: payload,
      };
    },

  },

  subscriptions: {

  },
};

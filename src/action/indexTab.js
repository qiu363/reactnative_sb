'use strict';

export default {
  setTab: (tabName) => {
    return {
      type: 'SET_TAB',
      tabName: tabName,
    }
  }
}

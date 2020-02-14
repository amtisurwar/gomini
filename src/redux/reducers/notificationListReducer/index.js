export default function reducer(
    state = {
      notifications: {},
    },
    action,
  ) {
    switch (action.type) {
      case 'NOTIFICATION_LIST_SUCCESS': {
        return { ...state, notifications: action.payload };
      }
      case 'NOTIFICATION_LIST_FAILED': {
        return { ...state, notifications: action.payload };
      }
      default: {
        return state;
      }
    }
  }
  
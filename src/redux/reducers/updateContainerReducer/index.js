export default function reducer(
    state = {
      data: {},
      isLoading:false
    },
    action,
  ) {
    switch (action.type) {
      case 'IS_LOADING': {
        return { ...state, isLoading: true };
      }
      case 'CONTAINER_UPDATE_SUCCESS': {
        return { ...state, data: action.payload,isLoading:false };
      }
      case 'CONTAINER_UPDATE_FAILED': {
        return { ...state, data: action.payload,isLoading:false  };
      }
      default: {
        return state;
      }
    }
  }
  
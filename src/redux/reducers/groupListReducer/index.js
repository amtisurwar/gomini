export default function reducer(
  state = {
    data: [],
  },
  action,
) {
  switch (action.type) {
    case 'JOB_LIST_SUCCESS': {
      return { ...state, data: action.payload };
    }
    case 'JOB_LIST_FAILED': {
      return { ...state, data: action.payload };
    }
    default: {
      return state;
    }
  }
}

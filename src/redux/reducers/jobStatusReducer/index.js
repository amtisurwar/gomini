export default function reducer(
  state = {
    data: [],
  },
  action,
) {
  switch (action.type) {
    case 'JOB_STATUS_SUCCESS': {
      return { ...state, data: action.payload };
    }
    case 'JOB_STATUS_FAILED': {
      return { ...state, data: action.payload };
    }
    default: {
      return state;
    }
  }
}

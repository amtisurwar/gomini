export default function reducer(
  state = {
    createJob: {},
  },
  action,
) {
  switch (action.type) {
    case 'CREATE_JOB_SUCCESS': {
      return { ...state, createJob: action.payload };
    }
    case 'CREATE_JOB_FAILED': {
      return { ...state, createJob: action.payload };
    }
    default: {
      return state;
    }
  }
}

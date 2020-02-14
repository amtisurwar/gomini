export default function reducer(
  state = {
    feedbackQuestion: [],
  },
  action,
) {
  switch (action.type) {
    case 'FETCH_FEEDBACK_QUESTION_SUCCESS': {
      return { ...state, feedbackQuestion: action.payload };
    }
    case 'FETCH_FEEDBACK_QUESTION_FAILED': {
      return { ...state, feedbackQuestion: action.payload };
    }
    default: {
      return state;
    }
  }
}

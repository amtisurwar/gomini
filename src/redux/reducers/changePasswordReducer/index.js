export default function reducer(
  state = {
    forgotPassword: {},
  },
  action,
) {
  switch (action.type) {
    case 'FORGOT_PASSWORD_SUCCESS': {
      return { ...state, forgotPassword: action.payload };
    }
    case 'FORGOT_PASSWORD_FAILED': {
      return { ...state, forgotPassword: action.payload };
    }
    default: {
      return state;
    }
  }
}

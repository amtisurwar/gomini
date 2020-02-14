import { Alert} from 'react-native';
import _ from 'lodash';
import { Toast } from 'native-base';

  export const confirmationAlert=(
    resolve,
    message,
    title ="Confirmation",
    calcelText="No",
    okText="Yes",
    cancelable=true
    )=>{
    Alert.alert(
        title,
        message,
       [
       { text: calcelText , onPress: () => resolve(false) },
       { text: okText , onPress: () => resolve(true) },
       ],
       { cancelable: cancelable }
       )
  }


export const createLoadingSelector = (actions) => (state) => {
  // returns true only when all actions is not loading
  return _(actions)
    .some((action) => _.get(state, `api.loading.${action}`));
};

export const showToast=(message)=>{
  Toast.show({
    text: message,
    textStyle:{color:'white'},
    duration: 4000
  })
}
import { NavigationActions, StackActions } from 'react-navigation';

var navigate = {
    navigateTo(navigation, screen, params) {
        return (
            navigation.navigate(screen, { ...params })
        );
    },
    navigateWithReset(navigation, screen, params) {
        navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: screen, params: params })],
        }));
    }
    
};
module.exports = navigate;
import Snackbar from 'react-native-snackbar';

//Custom Imports
import color from '../constants/color';

const showSnackbar = (title: string) => {
    Snackbar.show({
        text: title,
        duration: 2000,
        textColor: color.white,
        backgroundColor: color.mediumBlack,
    });
};

export default showSnackbar;
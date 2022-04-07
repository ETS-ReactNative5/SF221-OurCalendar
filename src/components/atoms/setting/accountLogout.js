import React from 'react';
import {Button} from 'native-base';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setGoogleAuth, setUserInfo} from '../../../redux/reducers/authSlice';

const mapStateToProps = state => ({
    auth: {
        googleAuth: state.auth.googleAuth,
        userInfo: state.auth.userInfo
    }
});

const mapDispatchToProps = () => ({
    setGoogleAuth,
    setUserInfo
});

class AccountLogout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDisable: false,
        };
    }

    async logout() {
        this.setState({isDisable: true});

        await AsyncStorage.removeItem('appSecretToken');
        await AsyncStorage.removeItem('userInfo');

        this.props.setGoogleAuth(false);
        this.props.setUserInfo({});
    }

    render() {
        return (
            <Button isDisabled={this.state.isDisable} onPress={() => this.logout()} colorScheme="danger" size="md">Logout</Button>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps())(AccountLogout);

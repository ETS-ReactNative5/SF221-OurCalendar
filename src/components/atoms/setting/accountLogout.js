import React from 'react';
import {Button} from 'native-base';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setGoogleAuth, setUserInfo} from '../../../redux/reducers/authSlice';
import {setTeam, setTeamInfo} from "../../../redux/reducers/teamSlice";
import {withTranslation} from "react-i18next";


const mapStateToProps = state => ({
    auth: {
        googleAuth: state.auth.googleAuth,
        userInfo: state.auth.userInfo
    }
});

const mapDispatchToProps = () => ({
    setGoogleAuth,
    setUserInfo,
    setTeam,
    setTeamInfo
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
        await AsyncStorage.removeItem('teamInfo');
        await AsyncStorage.removeItem('teamEvents');
        await AsyncStorage.removeItem('teamTodos');

        this.props.setGoogleAuth(false);
        this.props.setUserInfo({});
        this.props.setTeam(false);
        this.props.setTeamInfo({});
    }

    render() {
        const { t } = this.props;

        return (
            <Button isDisabled={this.state.isDisable} onPress={() => this.logout()} colorScheme="danger" size="md">{t('logout')}</Button>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps())(withTranslation()(AccountLogout));

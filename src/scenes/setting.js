import React from 'react';
import {Divider, View} from "native-base";
import AppTemplate from '../components/templates/app';
import LanguageSelection from '../components/molecules/setting/languageSelection';
import FontSelection from "../components/molecules/setting/fontSelection";
import NotificationsSelection from "../components/molecules/setting/notificationsSelection";
import Account from "../components/molecules/setting/account";
import PasscodeSetting from "../components/molecules/setting/passcodeSetting";

class Setting extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <AppTemplate  {...this.props}>
                <View width="100%">
                    <LanguageSelection/>
                    <FontSelection/>
                    <NotificationsSelection/>
                    <Divider thickness="1.2" backgroundColor="#7B7D7D" width="80%" alignSelf="center" marginTop="2"/>
                    <Account/>
                    <Divider thickness="1" backgroundColor="#7B7D7D" width="80%" alignSelf="center" marginTop="2"/>
                    <PasscodeSetting/>
                </View>
            </AppTemplate>
        );
    }
}

export default Setting;

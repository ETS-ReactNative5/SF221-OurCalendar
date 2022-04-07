import React from 'react';
import { withTranslation } from 'react-i18next';
import {connect} from "react-redux";
import {Box, Button, ChevronRightIcon, Divider, Flex, HStack, Image, Modal, Pressable, Text} from 'native-base';
import AccountSignIn from '../../atoms/setting/accountSignIn';
import AccountLogout from '../../atoms/setting/accountLogout';
import PasscodeSettingBox from "../../atoms/passcodeSettingBox";

const mapStateToProps = state => ({
    auth: {
        googleAuth: state.auth.googleAuth,
        userInfo: state.auth.userInfo
    }
});

class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accountModal: false,
        };
    }

    render() {
        const { t } = this.props;

        return this.props.auth.googleAuth ?
            (
                <>
                    <Pressable onPress={() => this.setState({accountModal: true})} >
                        <HStack paddingTop="3%">
                            <Text width="60%" fontSize="19" fontWeight={700} paddingLeft="14%"> {t('setting.account')}</Text>
                            <Flex width="30%" flexDirection="row" justify="flex-end">
                                <ChevronRightIcon size="8"/>
                            </Flex>
                        </HStack>
                    </Pressable>
                    <Modal isOpen={this.state.accountModal} onClose={() => this.setState({accountModal: false})}>
                        <Modal.Content maxWidth="400px" >
                            <Modal.CloseButton />
                            <Modal.Header><Text>{t('setting.account')}</Text></Modal.Header>
                            <Modal.Body>
                                <HStack space={2} mb="3">
                                    <Image size="xs" borderRadius={100} source={{uri: this.props.auth.userInfo.picture}} alt="Profile" />
                                    <Box>
                                        <Text fontSize="md">{this.props.auth.userInfo.name}</Text>
                                        <Text>{this.props.auth.userInfo.email}</Text>
                                    </Box>
                                </HStack>
                                <AccountLogout/>
                            </Modal.Body>
                        </Modal.Content>
                    </Modal>
                </>
            ) : (
                <Box width="100%" paddingBottom="2" paddingLeft="15%" paddingRight="12%">
                    <Text width="60%" fontSize="19" fontWeight={700} paddingBottom="2">
                        {t('setting.account')}
                    </Text>
                    <AccountSignIn/>
                </Box>
            );
    }
}
export default connect(mapStateToProps)(withTranslation()(Account));

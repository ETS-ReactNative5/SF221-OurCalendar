import React from 'react';
import bcrypt from 'bcrypt-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { withTranslation } from 'react-i18next';
import {
    Button,
    ChevronRightIcon,
    Divider,
    Flex,
    FormControl,
    HStack,
    Input,
    Modal,
    Pressable,
    Text,
} from 'native-base';
import {connect} from "react-redux";
import {setPasscode} from "../../../redux/reducers/authSlice";

const mapStateToProps = state => ({
    auth: {
        passcode: state.auth.passcode
    }
});

const mapDispatchToProps = () => ({
    setPasscode
});

class PasscodeSetting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passcodeModal: false,
            oldPasscode: '',
            newPasscode: '',
            confirmNewPasscode: ''
        }
    }

    async onSave() {
        if (this.state.newPasscode.length < 6 || (this.state.newPasscode !== this.state.confirmNewPasscode)) return;

        const salt = await bcrypt.getSalt(8);
        const hash = await bcrypt.hash(salt, this.state.newPasscode);

        if (this.props.auth.passcode) {
            const passcodeHash = await AsyncStorage.getItem('passcodeHash');

            if (await bcrypt.compareSync(this.state.oldPasscode, passcodeHash)) {
                await AsyncStorage.setItem('passcodeHash', hash);
            }
        } else {
            await AsyncStorage.setItem('passcodeHash', hash);
            this.props.setPasscode(true);
        }

        this.setState({passcodeModal: false});
    }

    async onTurnOff() {
        if (this.state.oldPasscode.length < 6) return;

        const passcodeHash = await AsyncStorage.getItem('passcodeHash');

        if (await bcrypt.compareSync(this.state.oldPasscode, passcodeHash)) {
            await AsyncStorage.removeItem('passcodeHash');

            this.props.setPasscode(false);
            this.setState({passcodeModal: false});
        }
    }

    render() {
        const { t } = this.props;

        return (
            <>
                <Pressable onPress={() => this.setState({passcodeModal: true})} >
                    <HStack paddingTop="3%">
                        <Text width="60%" fontSize="19" fontWeight={700} paddingLeft="14%"> {t('setting.passcode')}</Text>
                        <Flex width="30%" flexDirection="row" justify="flex-end">
                            <ChevronRightIcon size="8"/>
                        </Flex>
                    </HStack>
                </Pressable>
                <Modal isOpen={this.state.passcodeModal} onClose={() => this.setState({passcodeModal: false})}>
                    <Modal.Content maxWidth="400px" >
                        <Modal.CloseButton />
                        <Modal.Header><Text>{t('setting.passcode')}</Text></Modal.Header>
                        <Modal.Body>
                            {this.props.auth.passcode && (
                                <>
                                    <FormControl>
                                        <FormControl.Label><Text>{t('setting.old_passcode')}</Text></FormControl.Label>
                                        <Input keyboardType="numeric" secureTextEntry={true} onChangeText={(text) => this.setState({oldPasscode: text})} maxLength={6}/>
                                    </FormControl>
                                    <Divider my="2" backgroundColor="#cfd1cf" width="99%" alignSelf="center" marginTop="4"/>
                                </>
                            )}
                            <FormControl>
                                <FormControl.Label><Text>{t('setting.new_passcode')}</Text></FormControl.Label>
                                <Input keyboardType="numeric" secureTextEntry={true} onChangeText={(text) => this.setState({newPasscode: text})} maxLength={6}/>
                            </FormControl>
                            <FormControl>
                                <FormControl.Label><Text>{t('setting.confirm_new_passcode')}</Text></FormControl.Label>
                                <Input keyboardType="numeric" secureTextEntry={true} onChangeText={(text) => this.setState({confirmNewPasscode: text})} maxLength={6}/>
                            </FormControl>
                        </Modal.Body>
                        <Modal.Footer>
                            {this.props.auth.passcode ? (
                                <Button.Group space={2}>
                                    <Button colorScheme="danger" onPress={() => this.onTurnOff()}>
                                        <Text color="muted.50">
                                            {t('setting.turn_off')}
                                        </Text>
                                    </Button>
                                    <Button onPress={() => this.onSave()}>
                                        <Text color="muted.50">
                                            {t('setting.save')}
                                        </Text>
                                    </Button>
                                </Button.Group>
                            ) : (
                                <Button onPress={() => this.onSave()}>
                                    <Text color="muted.50">
                                        {t('setting.save')}
                                    </Text>
                                </Button>
                            )}
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>
            </>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps())(withTranslation()(PasscodeSetting));

import React from 'react';
import {Button, ChevronRightIcon, Divider, Flex, HStack, Modal, Pressable, Text,} from 'native-base';
import PasscodeSettingBox from "../atoms/passcodeSettingBox";
import i18n from "../../utils/i18n";


class PasscodeSetting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passcodeModal: false
        }
    }

    render() {
        return (
            <>
                <Pressable  onPress={() => this.setState({passcodeModal: true})} >
                    <HStack paddingTop="3%">
                        <Text width="60%" fontSize="19" fontWeight="bold" paddingLeft="14%"> {i18n.t('setting.passcode')}</Text>
                        <Flex width="30%" direction="row" justify="flex-end">
                            <ChevronRightIcon size="8"/>
                        </Flex>
                    </HStack>
                </Pressable>
                <Modal isOpen={this.state.passcodeModal} onClose={() => this.setState({passcodeModal: false})}>
                    <Modal.Content maxWidth="400px" >
                        <Modal.CloseButton />
                        <Modal.Header>{i18n.t('setting.passcode')}</Modal.Header>
                        <Modal.Body>
                            <PasscodeSettingBox title={i18n.t('setting.old_passcode')}/>
                            <Divider my="2" backgroundColor="#cfd1cf" width="99%" alignSelf="center" marginTop="4"/>
                            <PasscodeSettingBox title={i18n.t('setting.new_passcode')}/>
                            <PasscodeSettingBox title={i18n.t('setting.confirm_new_passcode')}/>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button.Group space={2}>
                                <Button colorScheme="danger" onPress={() => {this.setState({passcodeModal: false})}}>
                                    {i18n.t('setting.turn_off')}
                                </Button>
                                <Button onPress={() => {this.setState({passcodeModal: false})}}>
                                    {i18n.t('setting.save')}
                                </Button>
                            </Button.Group>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>
            </>
        );
    }
}
export default PasscodeSetting;

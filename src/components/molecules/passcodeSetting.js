import React from 'react';
import {Button, ChevronRightIcon, Divider, Flex, HStack, Modal, Pressable, Text,} from 'native-base';
import PasscodeSettingBox from "../atoms/passcodeSettingBox";


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
                        <Text width="60%" fontSize="19" fontWeight="bold"paddingLeft="14%"> Passcode</Text>
                        <Flex width="30%" direction="row" justify="flex-end">
                            <Text fontSize="19"></Text>
                            <ChevronRightIcon size="8"/>
                        </Flex>
                    </HStack>
                </Pressable>
                <Modal isOpen={this.state.passcodeModal} onClose={() => this.setState({passcodeModal: false})}>
                    <Modal.Content maxWidth="400px" >
                        <Modal.CloseButton />
                        <Modal.Header>Passcode</Modal.Header>
                        <Modal.Body>
                            <PasscodeSettingBox title="Old passcode"/>
                            <Divider my="2" backgroundColor="#cfd1cf" width="99%" alignSelf="center" marginTop="4"/>
                            <PasscodeSettingBox title="New passcode"/>
                            <PasscodeSettingBox title="Confirm new passcode"/>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button.Group space={2}>
                                <Button colorScheme="danger" onPress={() => {this.setState({passcodeModal: false})}}>
                                    Turn off
                                </Button>
                                <Button onPress={() => {this.setState({passcodeModal: false})}}>
                                    Save
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

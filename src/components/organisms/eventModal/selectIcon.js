import React from 'react';
import { withTranslation } from 'react-i18next';
import {Button, FormControl, HStack, Input, Modal, Text, Icon, VStack} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';

class IconSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { t } = this.props;
        return (
            <Modal isOpen={this.props.isOpen} onClose={this.props.onClose}>
                <Modal.Content style={styles.addModal} maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header><Text>Select Icon</Text></Modal.Header>
                    <Modal.Body>
                        <VStack space={4}>
                            <FormControl>
                            <Input/>
                            </FormControl>
                            <HStack space={4}>
                                <Icon as={Feather} name='aperture' color={'#90ae4f'}  size={'md'}></Icon>
                                <Icon as={Feather} name='box' color={'#90ae4f'}  size={'md'}></Icon>
                                <Icon as={Feather} name='calendar' color={'#90ae4f'}  size={'md'}></Icon>
                                <Icon as={Feather} name='camera' color={'#90ae4f'}  size={'md'}></Icon>
                                <Icon as={Feather} name='cloud-rain' color={'#90ae4f'}  size={'md'}></Icon>
                                <Icon as={Feather} name='codesandbox' color={'#90ae4f'}  size={'md'}></Icon>
                            </HStack>
                            <HStack space={4}>
                                <Icon as={Feather} name='coffee' color={'#90ae4f'}  size={'md'}></Icon>
                                <Icon as={Feather} name='cpu' color={'#90ae4f'}  size={'md'}></Icon>
                                <Icon as={Feather} name='dribbble' color={'#90ae4f'}  size={'md'}></Icon>
                                <Icon as={Feather} name='droplet' color={'#90ae4f'}  size={'md'}></Icon>
                                <Icon as={Feather} name='eye' color={'#90ae4f'}  size={'md'}></Icon>
                                <Icon as={Feather} name='film' color={'#90ae4f'}  size={'md'}></Icon>
                            </HStack>
                        </VStack>
                    </Modal.Body>
                    <Modal.Footer style={styles.addModal}>
                        <Button>
                            <Text color={'#ffffff'}>Confirm</Text>
                        </Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        );
    }
}

const styles = {

};

export default withTranslation()(IconSelection);

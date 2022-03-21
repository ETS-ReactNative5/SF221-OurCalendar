import React from 'react';
import {Modal, FormControl, Input, Button, Icon, IconButton} from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

class EventModalButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventModal: false
        }
    }

    render() {
        return (
            <>
            <IconButton icon={<Icon as={FontAwesome5} name="calendar-plus" size="md" color="black"/>} style={{paddingEnd:0}} onPress={() => this.setState({eventModal: true})} />
            <Modal isOpen={this.state.eventModal} onClose={() => this.setState({eventModal: false})}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Contact Us</Modal.Header>
                    <Modal.Body>
                        <FormControl>
                            <FormControl.Label>Name</FormControl.Label>
                            <Input />
                        </FormControl>
                        <FormControl mt="3">
                            <FormControl.Label>Email</FormControl.Label>
                            <Input />
                        </FormControl>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button variant="ghost" colorScheme="blueGray" onPress={() => {this.setState({eventModal: false})}}>
                                Cancel
                            </Button>
                            <Button onPress={() => {this.setState({eventModal: false})}}>
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
export default EventModalButton;

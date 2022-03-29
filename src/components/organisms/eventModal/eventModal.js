import React from 'react';
import {Button, HStack, Modal, Text} from 'native-base';

class EventModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen} onClose={this.props.onClose}>
                <Modal.Content style={styles.addModal} maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Add Event/To do</Modal.Header>
                    <Modal.Body>
                        <HStack justifyContent={"center"} space={5}>
                            <Button style={styles.addButton} onPress={this.props.eventButton}>
                                <Text>Event</Text>
                            </Button>
                            <Button style={styles.addButton} onPress={this.props.todoButton}>
                                <Text>To-do</Text>
                            </Button>
                        </HStack>
                    </Modal.Body>
                </Modal.Content>
            </Modal>
        );
    }
}

const styles = {
    addButton: {
        width: "40%",
        height: 50,
        borderRadius: 12,
        alignSelf:"center",
        backgroundColor:"#f8f8f8",
    },
    addModal:{
        backgroundColor: "#ebebeb"
    }
};
export default EventModal;

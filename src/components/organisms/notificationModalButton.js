import React from 'react';
import {Text, Icon, IconButton, Modal} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NotificationEvent from "../molecules/notificationEvent";

class NotificationModalButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        }
    }

    render() {
        return (
            <>
                <IconButton icon={<Icon as={MaterialCommunityIcons} name="bell-badge" size="md" color="yellow.400" />} onPress={() => this.setState({modal: true})} />
                <Modal isOpen={this.state.modal} onClose={() => this.setState({modal: false})}>
                    <Modal.Content maxWidth="400px" style={{marginBottom: "auto", marginTop: '5%'}}>
                        <Modal.CloseButton />
                        <Modal.Header>Notifications</Modal.Header>
                        <Modal.Body>
                            <NotificationEvent icon="cake" text="hapergergeggegfwggergegrhgrthtrhhthrhtrthrhtrhegergregrgrpy"/>
                            <NotificationEvent icon="cake" text="happy"/>
                        </Modal.Body>
                    </Modal.Content>
                </Modal>
            </>
        );
    }
}
export default NotificationModalButton;

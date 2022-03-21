import React from 'react';
import {Text, Icon, IconButton, Modal} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
                            <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusamus ad aliquam amet, assumenda autem beatae consequatur culpa cumque cupiditate debitis delectus deleniti hic ipsa itaque labore laudantium libero minima odio praesentium quasi quod rem repudiandae rerum soluta temporibus veniam, voluptatum? Autem delectus doloribus inventore maiores mollitia quae quibusdam suscipit!</Text>
                        </Modal.Body>
                    </Modal.Content>
                </Modal>
            </>
        );
    }
}
export default NotificationModalButton;

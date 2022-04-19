import React from 'react';
import { withTranslation } from 'react-i18next';
import {Text, Icon, IconButton, Modal} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NotificationEvent from "../../molecules/appTemplate/notificationEvent";

class NotificationModalButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        }
    }

    render() {
        const { t } = this.props;
        return (
            <>
                <IconButton icon={<Icon as={MaterialCommunityIcons} name="bell-badge" size="md" color="yellow.400" />} onPress={() => this.setState({modal: true})} />
                <Modal isOpen={this.state.modal} onClose={() => this.setState({modal: false})}>
                    <Modal.Content maxWidth="400px" style={{marginBottom: "auto", marginTop: '5%'}}>
                        <Modal.CloseButton />
                        <Modal.Header><Text>{t('setting.notifications')}</Text></Modal.Header>
                        <Modal.Body>
                            <NotificationEvent icon="message-question" text={t('notification.coming')}/>
                        </Modal.Body>
                    </Modal.Content>
                </Modal>
            </>
        );
    }
}
export default withTranslation()(NotificationModalButton);

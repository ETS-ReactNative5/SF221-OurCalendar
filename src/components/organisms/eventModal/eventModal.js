import React from 'react';
import { withTranslation } from 'react-i18next';
import {Button, HStack, Modal, Text} from 'native-base';

class EventModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { t, navigation } = this.props;

        return (
            <Modal isOpen={this.props.isOpen} onClose={this.props.onClose}>
                <Modal.Content style={styles.addModal} maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header><Text>{t('event_modal.add')} {navigation.getState().index === 2 ? '(Team)' : null}</Text></Modal.Header>
                    <Modal.Body>
                        <HStack justifyContent={"center"} space={5}>
                            <Button style={styles.addButton} onPress={this.props.eventButton}>
                                <Text>{t('event_modal.event')}</Text>
                            </Button>
                            <Button style={styles.addButton} onPress={this.props.todoButton}>
                                <Text>{t('event_modal.to_do')}</Text>
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
export default withTranslation()(EventModal);

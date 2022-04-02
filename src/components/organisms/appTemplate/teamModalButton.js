import React from 'react';
import { withTranslation } from 'react-i18next';
import {Modal, FormControl, Input, Button, Icon, IconButton, HStack, Text} from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Clipboard from "@react-native-clipboard/clipboard";

class teamModalButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teamModal: false,
            teamCreate: false,
            showTeamID: false,
            copiedText: "NO Copy TEXT",
        }
    }

    copyText() {
        Clipboard.setString("Hello You Copy ME!?");
        this.setState({copiedText: "Hello You Copy ME!?"});
    }

    showTeamCreate() {
        this.setState({teamCreate: false})
        this.setState({teamModal: true})
    }


    render() {
        const { t } = this.props;
        return (
            <>
                <IconButton icon={<Icon as={FontAwesome5} name="users" color="black" style={{width: 40, height: 32}} />} style={{paddingEnd:0}} onPress={() => this.setState({teamCreate: true})} />
                <Modal isOpen={this.state.teamCreate} onClose={() => this.setState({teamCreate: false})}>
                    <Modal.Content maxWidth="400px" bgColor="#f8f8f8">
                        <Modal.Body>
                            <FormControl>
                                <FormControl.Label><Text>{t('team_modal.have_team')}</Text></FormControl.Label>
                                <Input bgColor="info.50" placeholder={t('team_modal.enter_team')}/>
                            </FormControl>
                            <FormControl>
                                <FormControl.Label><Text>{t('team_modal.new_team')}</Text></FormControl.Label>
                                <Button colorScheme="dark" variant="outline" leftIcon={<Icon as={AntDesign} name="adduser" size="md" color="muted.900"/>} onPress={() => this.showTeamCreate()} justifyContent="flex-start"><Text>{t('team_modal.new_team')}</Text></Button>
                            </FormControl>
                        </Modal.Body>
                        <Modal.Footer bgColor="#f8f8f8">
                            <Button.Group space={2}>
                                <Button variant="ghost" colorScheme="blueGray" onPress={() => {this.setState({teamCreate: false})}}>
                                    <Text>{t('team_modal.close')}</Text>
                                </Button>
                                <Button variant="ghost" colorScheme="blueGray" onPress={() => {this.setState({teamCreate: false})}}>
                                    <Text>{t('team_modal.enter')}</Text>
                                </Button>
                            </Button.Group>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>
                <Modal isOpen={this.state.teamModal} onClose={() => this.setState({teamModal: false})}>
                    <Modal.Content maxWidth="400px" bgColor="#f8f8f8">
                        <Modal.Header><Text>{t('team_modal.new_team')}</Text></Modal.Header>
                        <Modal.Body>
                            <FormControl>
                                <FormControl.Label><Text>{t('team_modal.team_name')}</Text></FormControl.Label>
                                <Input bgColor="info.50" placeholder={t('team_modal.enter_team_name')}/>
                            </FormControl>
                            <FormControl>
                                { this.state.showTeamID ? <FormControl.Label><Text>{t('team_modal.created_team')}</Text></FormControl.Label> : null}
                                { this.state.showTeamID ? <Button onPress={() => this.copyText()}>{this.state.copiedText}</Button> : null}
                            </FormControl>
                        </Modal.Body>
                        <Modal.Footer bgColor="#f8f8f8">
                            <Button.Group space={2}>
                                <Button variant="ghost" colorScheme="blueGray" onPress={() => {this.setState({teamModal: false})}}>
                                    <Text>
                                        {t('team_modal.close')}
                                    </Text>
                                </Button>
                                <Button onPress={() => this.setState({showTeamID: true})}>
                                    <Text color="muted.50">
                                        {t('team_modal.create')}
                                    </Text>
                                </Button>
                            </Button.Group>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>
            </>
        );
    }
}
export default withTranslation()(teamModalButton);

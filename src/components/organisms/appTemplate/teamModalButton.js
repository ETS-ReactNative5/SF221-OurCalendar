import React from 'react';
import { withTranslation } from 'react-i18next';
import {Modal, FormControl, Input, Button, Icon, IconButton, HStack, Text, View, VStack, Image} from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Clipboard from "@react-native-clipboard/clipboard";
import ModalCloseButton from "native-base/src/components/composites/Modal/ModalCloseButton";

class teamModalButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teamModal: false,
            teamCreate: false,
            teamSetting: false,
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
                <IconButton icon={<Icon as={FontAwesome5} name="users" color="black" style={{width: 40, height: 32}} />} style={{paddingEnd:0}} onPress={() => this.setState({teamSetting: true})} />
                <Modal isOpen={this.state.teamSetting} onClose={() => this.setState({teamSetting: false})}>
                    <Modal.Content>
                        <ModalCloseButton/>
                        <Modal.Header>
                            <Text>Team Setting</Text>
                        </Modal.Header>
                        <Modal.Body>
                            <VStack space={2}>
                                <Text>Team ID Code</Text>
                                <Button style={styles.settingButton}></Button>
                                <Text>Team Logo</Text>
                                <Button style={styles.settingButton}><Text>Upload Image</Text></Button>
                                <Text>Team Member</Text>
                                <HStack space={3}>
                                    <Image
                                        style={styles.profileImage}
                                        src={'https://scontent.fbkk12-2.fna.fbcdn.net/v/t39.30808-6/185314502_106420618381807_6142994504459593999_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeFXAGdLktoKEpkqOpM5vB01X_gyC6mLJv9f-DILqYsm_x_8TVMiqB8yZsyGoLSb5S_UIyfB8KOQEzJ0cScBkYRB&_nc_ohc=d-ZjhdHm-fAAX-0BqKK&_nc_zt=23&_nc_ht=scontent.fbkk12-2.fna&oh=00_AT9bP2DjKhTmzw3BfDRgnEzmUZDM9cD-vvMY17dgSnZuVg&oe=62610EB7'}
                                    />
                                    <Text>JeryT</Text>
                                </HStack>
                                <HStack space={3}>
                                    <Image
                                        style={styles.profileImage}
                                        src={'data:image/jpeg;base64,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'}
                                    />
                                    <Text>MrTheBank</Text>
                                </HStack>
                                <View
                                    style={{
                                        borderTopColor: "#e5e5e5",
                                        borderTopWidth: 1,
                                    }}
                                />
                                <Button style={styles.settingButton}><Text>Sync Now</Text></Button>
                            </VStack>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button style={styles.settingButton}><Text>Leave Team</Text></Button>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>
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

const styles = {
    settingButton:{
        height: 35,
        alignItems: 'center',
        backgroundColor:"#e5e5e5"
    },
    profileImage:{
        borderRadius: 15,
        width: 30,
        height: 30
    }
};
export default withTranslation()(teamModalButton);

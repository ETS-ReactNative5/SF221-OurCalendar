import React from 'react';
import { withTranslation } from 'react-i18next';
import {connect} from "react-redux";
import axios from 'axios';
import {Modal, FormControl, Input, Button, Icon, IconButton, HStack, Text, View, VStack, Image} from 'native-base';
import {API_URL} from '@env';
import icons from '../../../utils/icons';
import Clipboard from "@react-native-clipboard/clipboard";
import {setTeam, setTeamInfo} from "../../../redux/reducers/teamSlice";
import base64 from "react-native-base64";
import {getUniqueId} from "react-native-device-info";
import AsyncStorage from "@react-native-async-storage/async-storage";

const mapStateToProps = state => ({
    auth: {
        googleAuth: state.auth.googleAuth
    },
    team: {
        team: state.team.team,
        teamInfo: state.team.teamInfo
    }
});

const mapDispatchToProps = () => ({
    setTeam,
    setTeamInfo
});

class teamModalButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teamModal: false,
            teamCreate: false,
            teamSetting: false,

            showTeamId: false,
            syncSuccess: false,
            copiedText: '',

            teamId: '',
            teamName: ''
        }
    }

    openTeamCreate() {
        this.setState({teamModal: false})
        this.setState({teamCreate: true})
    }

    openTeamModal() {
        if (!this.props.auth.googleAuth) return;

        if (this.props.team.team) {
            this.setState({teamSetting: true});
        } else {
            this.setState({teamModal: true});
        }
    }

    async onSubmitTeamModal() {
        if (this.state.teamId.length !== 8) return;

        const appToken = await AsyncStorage.getItem('appSecretToken');

        axios.post(API_URL + '/team/join', {
            team_id: this.state.teamId,
        }, {
            headers: {
                Authorization: appToken,
                Device: base64.encode(getUniqueId())
            }
        }).then(async (res) => {
            if (res.data.status === 'success') {
                const teamInfo = await axios.get(API_URL + '/team/info?team_id=' + this.state.teamId, {
                    headers: {
                        Authorization: appToken,
                        Device: base64.encode(getUniqueId())
                    }
                });
                await AsyncStorage.setItem('teamInfo', JSON.stringify(teamInfo.data))
                this.props.setTeamInfo(teamInfo.data);
                await this.fetchEvent(teamInfo.data.teamId);

                this.props.setTeam(true);
                this.setState({teamModal: false});
            }
        })
    }

    async onSubmitTeamCreate() {
        const appToken = await AsyncStorage.getItem('appSecretToken');

        axios.post(API_URL + '/team/create', {
            name: this.state.teamName,
        }, {
            headers: {
                Authorization: appToken,
                Device: base64.encode(getUniqueId())
            }
        }).then(async (res) => {
            if (res.data.teamId) {
                const teamInfo = await axios.get(API_URL + '/team/info?team_id=' + res.data.teamId, {
                    headers: {
                        Authorization: appToken,
                        Device: base64.encode(getUniqueId())
                    }
                });
                await AsyncStorage.setItem('teamInfo', JSON.stringify(teamInfo.data))
                this.props.setTeamInfo(teamInfo.data);

                this.props.setTeam(true);
                this.setState({copiedText: res.data.teamId, showTeamId: true});
            }
        });
    }

    async onLeaveTeam() {
        const appToken = await AsyncStorage.getItem('appSecretToken');

        axios.post(API_URL + '/team/leave', {
            team_id: this.props.team.teamInfo.teamId,
        }, {
            headers: {
                Authorization: appToken,
                Device: base64.encode(getUniqueId())
            }
        }).then(async (res) => {
            if (res.data.status === 'success') {
                await AsyncStorage.removeItem('teamInfo');
                await AsyncStorage.removeItem('teamEvents');
                await AsyncStorage.removeItem('teamTodos');

                this.props.setTeamInfo({});

                this.props.setTeam(false);
                this.setState({teamSetting: false});

                if (this.props.navigation.getState().index === 2) {
                    this.props.navigation.navigate('Home');
                }
            }
        });
    }

    async clickSyncNow() {
        const appToken = await AsyncStorage.getItem('appSecretToken');
        axios.get(API_URL + '/team/info?team_id=' + this.props.team.teamInfo.teamId, {
            headers: {
                Authorization: appToken,
                Device: base64.encode(getUniqueId())
            }
        }).then(async (res) => {
            if (res.data) {
                await AsyncStorage.setItem('teamInfo', JSON.stringify(res.data))
                this.props.setTeamInfo(res.data);
            }
        });

        await this.fetchEvent(this.props.team.teamInfo.teamId);
        this.setState({syncSuccess: true});
    }

    async fetchEvent(teamId) {
        const appToken = await AsyncStorage.getItem('appSecretToken');

        axios.get(API_URL + '/team/event/list?team_id=' + teamId + '&type=event', {
            headers: {
                Authorization: appToken,
                Device: base64.encode(getUniqueId())
            }
        }).then(async (res) => {
            if (res.data) {
                await AsyncStorage.setItem('teamEvents', JSON.stringify(res.data));
            }
        });

        axios.get(API_URL + '/team/event/list?team_id=' + teamId + '&type=todo', {
            headers: {
                Authorization: appToken,
                Device: base64.encode(getUniqueId())
            }
        }).then(async (res) => {
            if (res.data) {
                await AsyncStorage.setItem('teamTodos', JSON.stringify(res.data));
            }
        });
    }

    render() {
        const { t } = this.props;
        return (
            <>
                <IconButton icon={<Icon as={icons.FontAwesome5} name="users" color="black" style={{width: 40, height: 32}} />} style={{paddingEnd:0}} onPress={() => this.openTeamModal()} />
                <Modal isOpen={this.state.teamModal} onClose={() => this.setState({teamModal: false})}>
                    <Modal.Content maxWidth="400px" bgColor="#f8f8f8">
                        <Modal.Body>
                            <FormControl>
                                <FormControl.Label><Text>{t('team_modal.have_team')}</Text></FormControl.Label>
                                <Input bgColor="info.50" maxLength={8} onChangeText={(text) => this.setState({teamId: text})} placeholder={t('team_modal.enter_team')}/>
                            </FormControl>
                            <FormControl>
                                <FormControl.Label><Text>{t('team_modal.new_team')}</Text></FormControl.Label>
                                <Button colorScheme="dark" variant="outline" leftIcon={<Icon as={icons.AntDesign} name="adduser" size="md" color="muted.900"/>} onPress={() => this.openTeamCreate()} justifyContent="flex-start"><Text>{t('team_modal.new_team')}</Text></Button>
                            </FormControl>
                        </Modal.Body>
                        <Modal.Footer bgColor="#f8f8f8">
                            <Button.Group space={2}>
                                <Button variant="ghost" colorScheme="blueGray" onPress={() => this.setState({teamModal: false})}>
                                    <Text>{t('team_modal.close')}</Text>
                                </Button>
                                <Button variant="ghost" colorScheme="blueGray" onPress={() => this.onSubmitTeamModal()}>
                                    <Text>{t('team_modal.enter')}</Text>
                                </Button>
                            </Button.Group>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>
                <Modal isOpen={this.state.teamCreate} onClose={() => this.setState({teamCreate: false, showTeamId: false})}>
                    <Modal.Content maxWidth="400px" bgColor="#f8f8f8">
                        <Modal.Header><Text>{t('team_modal.new_team')}</Text></Modal.Header>
                        <Modal.Body>
                            <FormControl>
                                <FormControl.Label><Text>{t('team_modal.team_name')}</Text></FormControl.Label>
                                <Input bgColor="info.50" onChangeText={(text => this.setState({teamName: text}))} placeholder={t('team_modal.enter_team_name')}/>
                            </FormControl>
                            <FormControl>
                                { this.state.showTeamId ? <FormControl.Label><Text>{t('team_modal.created_team')}</Text></FormControl.Label> : null}
                                { this.state.showTeamId ? <Button onPress={() => Clipboard.setString(this.state.copiedText)}>{this.state.copiedText}</Button> : null}
                            </FormControl>
                        </Modal.Body>
                        <Modal.Footer bgColor="#f8f8f8">
                            <Button.Group space={2}>
                                <Button variant="ghost" colorScheme="blueGray" onPress={() => {this.setState({teamCreate: false, showTeamId: false})}}>
                                    <Text>
                                        {t('team_modal.close')}
                                    </Text>
                                </Button>
                                <Button onPress={() => this.onSubmitTeamCreate()} isDisabled={this.state.showTeamId}>
                                    <Text color="muted.50">
                                        {t('team_modal.create')}
                                    </Text>
                                </Button>
                            </Button.Group>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>

                {this.props.team.team ? (
                    <Modal isOpen={this.state.teamSetting} onClose={() => this.setState({teamSetting: false})}>
                        <Modal.Content>
                            <Modal.CloseButton/>
                            <Modal.Header>
                                <Text>{t('team_modal.team_setting')}</Text>
                            </Modal.Header>
                            <Modal.Body>
                                <VStack space={2}>
                                    <Text>{t('team_modal.team_name')}</Text>
                                    <Input bgColor="info.50" value={this.props.team.teamInfo.teamName} onChangeText={(text) => this.setState({teamName: text})}/>
                                    <Text>{t('team_modal.team_ID')}</Text>
                                    <Button colorScheme="warning" onPress={() => Clipboard.setString(this.props.team.teamInfo.teamId)}><Text color="white">{this.props.team.teamInfo.teamId}</Text></Button>
                                    <Text>{t('team_modal.team_logo')}</Text>
                                    <Button colorScheme="warning"><Text color="white">{t('team_modal.image')}</Text></Button>
                                    <Text>{t('team_modal.member')}</Text>
                                    {
                                        this.props.team.teamInfo.teamMember ? this.props.team.teamInfo.teamMember.map((i) => (
                                            <HStack space={3} key={i.googleId}>
                                                <Image
                                                    style={styles.profileImage}
                                                    src={i.picture}
                                                    alt={i.googleId}
                                                />
                                                <Text mt="1">{i.name}</Text>
                                            </HStack>
                                        )) : null
                                    }
                                    <View
                                        style={{
                                            borderTopColor: "#e5e5e5",
                                            borderTopWidth: 1,
                                        }}
                                    />
                                    <Button colorScheme="success" onPress={() => this.clickSyncNow()}><Text color="white">{t('team_modal.sync')}</Text></Button>
                                    {this.state.syncSuccess ? (
                                        <Text color="success.500">{t('team_modal.success_sync')}</Text>
                                    ) : (<></>)}
                                </VStack>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button colorScheme="danger" onPress={() => this.onLeaveTeam()}><Text color="white">{t('team_modal.leave')}</Text></Button>
                            </Modal.Footer>
                        </Modal.Content>
                    </Modal>
                ) : null}
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

export default connect(mapStateToProps, mapDispatchToProps())(withTranslation()(teamModalButton));

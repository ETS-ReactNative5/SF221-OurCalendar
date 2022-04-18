import React from 'react';
import { withTranslation } from 'react-i18next';
import {connect} from "react-redux";
import axios from 'axios';
import {Button, CheckIcon, FormControl, HStack, Input, Modal, Select, Text} from 'native-base';
import {API_URL} from '@env';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import randomId from '../../../utils/randomId';
import eventStorage from '../../../utils/eventStorage';
import ColorPicker from 'react-native-wheel-color-picker'
import IconSelection from "./selectIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import base64 from "react-native-base64";
import {getUniqueId} from "react-native-device-info";

const mapStateToProps = state => ({
    team: {
        teamInfo: state.team.teamInfo
    }
});

class AddEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            swatchesEnabled: true,
            disc:false,
            openDateStartEvent: false,
            openTimeStartEvent: false,
            openDateEndEvent: false,
            openTimeEndEvent: false,

            colorModal: false,
            iconModal: false,

            form: {
                title: '',
                start: new Date(),
                end: new Date(),
                repeat: 'None',
                color: '#ffffff',
                iconFont: '',
                iconName: ''
            },
        }
    }

    onSubmit() {
        const navState = this.props.navigation.getState();
        if (navState.index === 2) {
            this.onSubmitTeam();
        } else {
            this.onSubmitDevice();
        }
    }

    async onSubmitDevice() {
        const id = randomId(4);
        const eventJson = {
            id: id,
            created: new Date(),
            updated: new Date(),
            title: this.state.form.title,
            start: this.state.form.start,
            end: this.state.form.end,
            repeat: this.state.form.repeat,
            color: this.state.form.color,
            icon: {
                font: this.state.form.iconFont,
                name: this.state.form.iconName
            }
        };

        await eventStorage.insertJson(id, eventJson, 'events');

        this.props.onClose();
    }

    async onSubmitTeam() {
        const eventJson = {
            created: new Date(),
            updated: new Date(),
            title: this.state.form.title,
            start: this.state.form.start,
            end: this.state.form.end,
            repeat: this.state.form.repeat,
            color: this.state.form.color,
            icon: {
                font: this.state.form.iconFont,
                name: this.state.form.iconName
            }
        };

        const appToken = await AsyncStorage.getItem('appSecretToken');

        axios.post(API_URL + '/team/event/add', {
            team_id: this.props.team.teamInfo.teamId,
            event: JSON.stringify(eventJson),
            type: 'event'
        }, {
            headers: {
                Authorization: appToken,
                Device: base64.encode(getUniqueId())
            }
        }).then(async (res) => {
            if (res.data.id) {
                const id = res.data.id;
                await eventStorage.insertJson(id, {id: id, ...eventJson}, 'teamEvents');

                this.props.onClose();
            }
        });
    }

    iconClick(font, name) {
        this.setState({form: {...this.state.form, iconFont: font, iconName: name}});
        this.setState({iconModal: false});
    }

    render() {
        const { t } = this.props;

        return (
            <>
                <Modal isOpen={this.props.isOpen} onClose={this.props.onClose}>
                    <Modal.Content style={styles.addModal} maxWidth="400px">
                        <Modal.CloseButton />
                        <Modal.Header><Text>{t('add_event.add')}</Text></Modal.Header>
                        <Modal.Body>
                            <FormControl>
                                <FormControl.Label><Text>{t('event_todo.title')}</Text></FormControl.Label>
                                <Input onChangeText={(text => this.setState({form: {...this.state.form, title: text}}))} bgColor="#f8f8f8"/>
                            </FormControl>
                            <FormControl>
                                <FormControl.Label><Text>{t('add_event.start')}</Text></FormControl.Label>
                                <HStack space={3}>
                                    <Button style={styles.selectDate} onPress={() => this.setState({openDateStartEvent: true})}>
                                        <Text>{moment(this.state.form.start).format("DD MMMM YYYY")}</Text>
                                    </Button>
                                    <DatePicker
                                        modal
                                        open={this.state.openDateStartEvent}
                                        date={this.state.form.start}
                                        onConfirm={(date) => {
                                            this.setState({openDateStartEvent: false})
                                            this.setState({form: {...this.state.form, start: date}})
                                        }}
                                        onCancel={() => {
                                            this.setState({openDateStartEvent: false})
                                        }}
                                        minimumDate={new Date()}
                                        mode={"date"}
                                    />
                                    <Button style={styles.selectTime} onPress={() => this.setState({openTimeStartEvent: true})}>
                                        <Text>{moment(this.state.form.start).format("HH:mm")}</Text>
                                    </Button>
                                    <DatePicker
                                        modal
                                        open={this.state.openTimeStartEvent}
                                        date={this.state.form.start}
                                        onConfirm={(date) => {
                                            this.setState({openTimeStartEvent: false})
                                            this.setState({form: {...this.state.form, start: date}})
                                        }}
                                        onCancel={() => {
                                            this.setState({openTimeStartEvent: false})
                                        }}
                                        mode={"time"}
                                    />
                                </HStack>
                            </FormControl>
                            <FormControl>
                                <FormControl.Label><Text>{t('add_event.end')}</Text></FormControl.Label>
                                <HStack space={3}>
                                    <Button style={styles.selectDate} isDisabled={this.state.form.repeat === 'None'} onPress={() => this.setState({openDateEndEvent: true})}>
                                        <Text>{moment(this.state.form.end).format("DD MMMM YYYY")}</Text>
                                    </Button>
                                    <DatePicker
                                        modal
                                        open={this.state.openDateEndEvent}
                                        date={this.state.form.end}
                                        onConfirm={(date) => {
                                            this.setState({openDateEndEvent: false})
                                            this.setState({form: {...this.state.form, end: date}})
                                        }}
                                        onCancel={() => {
                                            this.setState({openDateEndEvent: false})
                                        }}
                                        minimumDate={new Date()}
                                        mode={"date"}
                                    />
                                    <Button style={styles.selectTime} onPress={() => this.setState({openTimeEndEvent: true})}>
                                        <Text>{moment(this.state.form.end).format("HH:mm")}</Text>
                                    </Button>
                                    <DatePicker
                                        modal
                                        open={this.state.openTimeEndEvent}
                                        date={this.state.form.end}
                                        onConfirm={(date) => {
                                            this.setState({openTimeEndEvent: false})
                                            this.setState({form: {...this.state.form, end: date}})
                                        }}
                                        onCancel={() => {
                                            this.setState({openTimeEndEvent: false})
                                        }}
                                        minimumDate={new Date()}
                                        mode={"time"}
                                    />
                                </HStack>
                            </FormControl>
                            <FormControl>
                                <FormControl.Label><Text>{t('add_event.repeat')}</Text></FormControl.Label>
                                <Select bgColor="#f8f8f8" selectedValue={this.state.form.repeat} minWidth="200" accessibilityLabel="Choose repeat" placeholder={t('add_event.choose')} _selectedItem={{
                                    bg: "teal.600",
                                    endIcon: <CheckIcon size="5" />
                                }} onValueChange={(item) => this.setState({form: {...this.state.form, repeat: item}})}>
                                    <Select.Item label={t('add_event.choose_repeat.none')} value="None" />
                                    <Select.Item label={t('add_event.choose_repeat.daily')} value="Daily" />
                                    <Select.Item label={t('add_event.choose_repeat.weekly')} value="Weekly" />
                                    <Select.Item label={t('add_event.choose_repeat.monthly')} value="Monthly" />
                                    <Select.Item label={t('add_event.choose_repeat.annually')} value="Annually" />
                                </Select>
                            </FormControl>
                            <FormControl>
                                <FormControl.Label><Text>{t('event_todo.color')}</Text></FormControl.Label>
                                <ColorPicker
                                    ref={r => { this.picker = r }}
                                    color={this.state.form.color}
                                    swatchesOnly={this.state.swatchesOnly}
                                    onColorChangeComplete={(color) => this.setState({form: {...this.state.form, color: color}})}
                                    thumbSize={20}
                                    sliderSize={25}
                                    noSnap={true}
                                    row={false}
                                    swatchesLast={this.state.swatchesLast}
                                    swatches={this.state.swatchesEnabled}
                                    discrete={this.state.disc}
                                />
                                <Input size="sm" isDisabled={true} mt="2" value={this.state.form.color}/>
                            </FormControl>
                            <FormControl>
                                <FormControl.Label><Text>{t('event_todo.icon')}</Text></FormControl.Label>
                                <Button style={styles.selectIcon} onPress={() => this.setState({iconModal: true})}>
                                    <Text>{this.state.form.iconFont} {this.state.form.iconName}</Text>
                                </Button>
                            </FormControl>
                        </Modal.Body>
                        <Modal.Footer style={styles.addModal}>
                            <Button onPress={() => this.onSubmit()}>
                                <Text color="muted.50">
                                    {t('event_todo.create')}
                                </Text>
                            </Button>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>
                <IconSelection isOpen={this.state.iconModal} onClose={() => this.setState({iconModal: false})} iconClick={(font, name) => this.iconClick(font, name)}/>
            </>
        );
    }
}

const styles = {
    selectDate: {
        width: "60%",
        height: 40,
        backgroundColor:"#f8f8f8"
    },
    selectTime: {
        width: "30%",
        height: 40,
        backgroundColor:"#f8f8f8"
    },
    selectIcon: {
        height: 40,
        backgroundColor:"#f8f8f8",
        borderColor: "#e5e5e5",
        borderWidth: 1,
        justifyContent: "flex-start",
    }
};

export default connect(mapStateToProps)(withTranslation()(AddEvent));

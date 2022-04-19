import React from 'react';
import { withTranslation } from 'react-i18next';
import {Button, FormControl, HStack, Input, Modal, Text} from 'native-base';
import {API_URL} from '@env';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import ColorPicker from "react-native-wheel-color-picker";
import IconSelection from "./selectIcon";
import eventStorage from "../../../utils/eventStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import base64 from "react-native-base64";
import {getUniqueId} from "react-native-device-info";
import {connect} from "react-redux";

const mapStateToProps = state => ({
    team: {
        teamInfo: state.team.teamInfo
    }
});

class EditTodo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            swatchesEnabled: true,
            disc:false,
            openDateStartToDo: false,
            openTimeStartToDo: false,
            openDateEndToDo: false,
            openTimeEndToDo: false,

            colorModal: false,
            iconModal: false,

            form: {
                title: this.props.todo.title,
                end: new Date(this.props.todo.end),
                repeat: this.props.todo.repeat,
                color: this.props.todo.color,
                iconFont: this.props.todo.icon ? this.props.todo.icon.font : '',
                iconName: this.props.todo.icon ? this.props.todo.icon.name : '',
            },
        }
    }

    async onSubmit() {
        if (this.props.team) {
            await this.onSubmitTeam();
        } else {
            await this.onSubmitDevice();
        }
    }

    async onSubmitDevice() {
        const id = this.props.todo.id;
        const eventJson = {
            id: id,
            created: this.props.todo.created,
            updated: new Date(),
            title: this.state.form.title,
            start: this.props.todo.start,
            end: this.state.form.end,
            color: this.state.form.color,
            icon: {
                font: this.state.form.iconFont,
                name: this.state.form.iconName,
            }
        };

        await eventStorage.editJson(id, eventJson, 'todos');

        this.props.onClose();
    }

    async onSubmitTeam() {
        const eventJson = {
            created: this.props.todo.created,
            updated: new Date(),
            title: this.state.form.title,
            start: this.props.todo.start,
            end: this.state.form.end,
            color: this.state.form.color,
            icon: {
                font: this.state.form.iconFont,
                name: this.state.form.iconName,
            }
        };

        const appToken = await AsyncStorage.getItem('appSecretToken');

        axios.post(API_URL + '/team/event/edit', {
            team_id: this.props.team.teamInfo.teamId,
            event: JSON.stringify(eventJson),
            event_id: this.props.todo.id
        }, {
            headers: {
                Authorization: appToken,
                Device: base64.encode(getUniqueId())
            }
        }).then(async (res) => {
            if (res.data.status === 'success') {
                const id = this.props.todo.id;
                await eventStorage.editJson(id, {id: id, ...eventJson}, 'teamTodos');

                this.props.onClose();
            }
        });
    }

    async onDelete() {
        if (this.props.team) {
            await this.onDeleteTeam();
        } else {
            await this.onDeleteDevice();
        }
    }

    async onDeleteDevice() {
        const id = this.props.todo.id;

        await eventStorage.deleteJson(id, 'todos');

        this.props.onClose();
    }

    async onDeleteTeam() {
        const appToken = await AsyncStorage.getItem('appSecretToken');

        axios.post(API_URL + '/team/event/delete', {
            team_id: this.props.team.teamInfo.teamId,
            event_id: this.props.todo.id
        }, {
            headers: {
                Authorization: appToken,
                Device: base64.encode(getUniqueId())
            }
        }).then(async (res) => {
            if (res.data.status === 'success') {
                const id = this.props.todo.id;
                await eventStorage.deleteJson(id, 'teamTodos');

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
                        <Modal.Header><Text>{t('add_todo.edit_todo')}</Text></Modal.Header>
                        <Modal.Body>
                            <FormControl>
                                <FormControl.Label><Text>{t('event_todo.title')}</Text></FormControl.Label>
                                <Input value={this.state.form.title} onChangeText={(text => this.setState({form: {...this.state.form, title: text}}))} bgColor="#f8f8f8"/>
                            </FormControl>
                            <FormControl>
                                <FormControl.Label><Text>{t('add_todo.deadline')}</Text></FormControl.Label>
                                <HStack space={3}>
                                    <Button style={styles.selectDate} onPress={() => this.setState({openDateEndToDo: true})}>
                                        <Text>{moment(this.state.form.end).format("DD MMMM YYYY")}</Text>
                                    </Button>
                                    <DatePicker
                                        modal
                                        open={this.state.openDateEndToDo}
                                        date={this.state.form.end}
                                        onConfirm={(date) => {
                                            this.setState({openDateEndToDo: false})
                                            this.setState({form: {...this.state.form, end: date}})
                                        }}
                                        onCancel={() => {
                                            this.setState({openDateEndToDo: false})
                                        }}
                                        minimumDate={new Date()}
                                        mode={"date"}
                                    />
                                    <Button style={styles.selectTime} onPress={() => this.setState({openTimeEndToDo: true})}>
                                        <Text>{moment(this.state.form.end).format("HH:mm")}</Text>
                                    </Button>
                                    <DatePicker
                                        modal
                                        open={this.state.openTimeEndToDo}
                                        date={this.state.form.end}
                                        onConfirm={(date) => {
                                            this.setState({openTimeEndToDo: false})
                                            this.setState({form: {...this.state.form, end: date}})
                                        }}
                                        onCancel={() => {
                                            this.setState({openTimeEndToDo: false})
                                        }}
                                        minimumDate={new Date()}
                                        mode={"time"}
                                    />
                                </HStack>
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
                            <Button.Group>
                                <Button onPress={() => this.onSubmit()}>
                                    <Text color="#ffffff">
                                        {t('event_todo.save')}
                                    </Text>
                                </Button>
                                <Button colorScheme="danger" onPress={() => this.onDelete()}>
                                    <Text color="#ffffff">
                                        {t('event_todo.delete')}
                                    </Text>
                                </Button>
                            </Button.Group>
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
    },
};

export default connect(mapStateToProps)(withTranslation()(EditTodo));

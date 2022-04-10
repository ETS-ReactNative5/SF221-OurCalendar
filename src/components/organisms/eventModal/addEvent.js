import React from 'react';
import { withTranslation } from 'react-i18next';
import {Button, CheckIcon, FormControl, HStack, Input, Modal, Select, Text} from 'native-base';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';

class AddEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openDateStartEvent: false,
            openTimeStartEvent: false,
            openDateEndEvent: false,
            openTimeEndEvent: false,

            form: {
                title: '',
                start: new Date(),
                end: new Date(),
                repeat: 'None',
                color: '',
                iconFont: '',
                iconName: ''
            },
        }
    }

    onSubmit() {
        console.log(this.state.form)
    }

    render() {
        const { t } = this.props;

        return (
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
                            <Input bgColor="#f8f8f8"/>
                        </FormControl>
                        <FormControl>
                            <FormControl.Label><Text>{t('event_todo.icon')}</Text></FormControl.Label>
                            <Input bgColor="#f8f8f8"/>
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
};

export default withTranslation()(AddEvent);

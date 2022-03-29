import React from 'react';
import {Button, CheckIcon, FormControl, HStack, Input, Modal, Select, Text} from 'native-base';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';

class AddEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openDateStartEvent: false,
            startEvent: new Date(),
            endEvent: new Date(),
            repeat: ''
        }
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen} onClose={this.props.onClose}>
                <Modal.Content style={styles.addModal} maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Add Event</Modal.Header>
                    <Modal.Body>
                        <FormControl>
                            <FormControl.Label>Title</FormControl.Label>
                            <Input bgColor="#f8f8f8"/>
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Start</FormControl.Label>
                            <HStack space={3}>
                                <Button style={styles.selectDate} onPress={() => this.setState({openDateStartEvent: true})}>
                                    <Text>{moment(this.state.startEvent).format("DD MMMM YYYY")}</Text>
                                </Button>
                                <DatePicker
                                    modal
                                    open={this.state.openDateStartEvent}
                                    date={this.state.startEvent}
                                    onConfirm={(date) => {
                                        this.setState({openDateStartEvent: false})
                                        this.setState({startEvent: date})
                                    }}
                                    onCancel={() => {
                                        this.setState({openDateStartEvent: false})
                                    }}
                                    mode={"date"}
                                />
                                <Button style={styles.selectTime} onPress={() => this.setState({openTimeStartEvent: true})}>
                                    <Text>{moment(this.state.startEvent).format("HH:mm")}</Text>
                                </Button>
                                <DatePicker
                                    modal
                                    open={this.state.openTimeStartEvent}
                                    date={this.state.startEvent}
                                    onConfirm={(date) => {
                                        this.setState({openTimeStartEvent: false})
                                        this.setState({startEvent: date})
                                    }}
                                    onCancel={() => {
                                        this.setState({openTimeStartEvent: false})
                                    }}
                                    mode={"time"}
                                />
                            </HStack>
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>End</FormControl.Label>
                            <HStack space={3}>
                                <Button style={styles.selectDate} onPress={() => this.setState({openDateStartEvent: true})}>
                                    <Text>{moment(this.state.startEvent).format("DD MMMM YYYY")}</Text>
                                </Button>
                                <DatePicker
                                    modal
                                    open={this.state.openDateEndEvent}
                                    date={this.state.endEvent}
                                    onConfirm={(date) => {
                                        this.setState({openDateEndEvent: false})
                                        this.setState({endEvent: date})
                                    }}
                                    onCancel={() => {
                                        this.setState({openDateEndEvent: false})
                                    }}
                                    mode={"date"}
                                />
                                <Button style={styles.selectTime} onPress={() => this.setState({openTimeEndEvent: true})}>
                                    <Text>{moment(this.state.endEvent).format("HH:mm")}</Text>
                                </Button>
                                <DatePicker
                                    modal
                                    open={this.state.openTimeEndEvent}
                                    date={this.state.endEvent}
                                    onConfirm={(date) => {
                                        this.setState({openTimeEndEvent: false})
                                        this.setState({endEvent: date})
                                    }}
                                    onCancel={() => {
                                        this.setState({openTimeEndEvent: false})
                                    }}
                                    mode={"time"}
                                />
                            </HStack>
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Repeat</FormControl.Label>
                            <Select bgColor="#f8f8f8" selectedValue={this.state.repeat} minWidth="200" accessibilityLabel="Choose repeat" placeholder="Choose repeat" _selectedItem={{
                                bg: "teal.600",
                                endIcon: <CheckIcon size="5" />
                            }} onValueChange={(item) => this.setState({repeat: item})}>
                                <Select.Item label="None" value="None" />
                                <Select.Item label="Daily" value="Daily" />
                                <Select.Item label="Weekly" value="Weekly" />
                                <Select.Item label="Monthly" value="Monthly" />
                                <Select.Item label="Annually" value="Annually" />
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Color</FormControl.Label>
                            <Input bgColor="#f8f8f8"/>
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Icon</FormControl.Label>
                            <Input bgColor="#f8f8f8"/>
                        </FormControl>
                    </Modal.Body>
                    <Modal.Footer style={styles.addModal}>
                        <Button>
                            Create
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

export default AddEvent;

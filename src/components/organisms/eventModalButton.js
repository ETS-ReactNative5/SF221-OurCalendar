import React from 'react';
import {Modal, FormControl, Input, Button, Icon, IconButton, HStack, Text, Select, CheckIcon} from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {StyleSheet} from "react-native";
import DatePicker from 'react-native-date-picker'
import moment from "moment";

class EventModalButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventModal: false,
            addEvent: false,
            addToDo: false,
            startEvent: new Date(),
            endEvent: new Date(),
            startToDo: new Date(),
            endToDo: new Date(),
        }
    }

    openAddEvent() {
        this.setState({eventModal: false})
        this.setState({addEvent: true})
    }

    openAddToDo() {
        this.setState({eventModal: false})
        this.setState({addToDo: true})
    }

    render() {
        return (
            <>
            <IconButton icon={<Icon as={FontAwesome5} name="calendar-plus" size="md" color="black"/>} style={{paddingEnd:0}} onPress={() => this.setState({eventModal: true})} />
                <Modal isOpen={this.state.eventModal} onClose={() => this.setState({eventModal: false})}>
                    <Modal.Content style={styles.addModal} maxWidth="400px">
                        <Modal.CloseButton />
                        <Modal.Header>Add Event/To do</Modal.Header>
                        <Modal.Body>
                            <HStack justifyContent={"center"} space={5}>
                                <Button style={styles.addButton} onPress={() => this.openAddEvent()}>
                                    <Text>Event</Text>
                                </Button>
                                <Button style={styles.addButton} onPress={() => this.openAddToDo()}>
                                    <Text>To-do</Text>
                                </Button>
                            </HStack>
                        </Modal.Body>
                    </Modal.Content>
                </Modal>
                <Modal isOpen={this.state.addEvent} onClose={() => this.setState({addEvent: false})}>
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
                                <Select bgColor="#f8f8f8" minWidth="200" accessibilityLabel="Choose repeat" placeholder="Choose repeat" _selectedItem={{
                                    bg: "teal.600",
                                    endIcon: <CheckIcon size="5" />
                                }} >
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
                            <Button onPress={() => this.setState({showTeamID: true})}>
                                Create
                            </Button>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>
                <Modal isOpen={this.state.addToDo} onClose={() => this.setState({addToDo: false})}>
                    <Modal.Content style={styles.addModal} maxWidth="400px">
                        <Modal.CloseButton />
                        <Modal.Header>Add To-do</Modal.Header>
                        <Modal.Body>
                            <FormControl>
                                <FormControl.Label>Title</FormControl.Label>
                                <Input bgColor="#f8f8f8"/>
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Start</FormControl.Label>
                                <HStack space={3}>
                                    <Button style={styles.selectDate} onPress={() => this.setState({openDateEndToDo: true})}>
                                        <Text>{moment(this.state.endToDo).format("DD MMMM YYYY")}</Text>
                                    </Button>
                                    <DatePicker
                                        modal
                                        open={this.state.openDateEndToDo}
                                        date={this.state.endToDo}
                                        onConfirm={(date) => {
                                            this.setState({openDateEndToDo: false})
                                            this.setState({endToDo: date})
                                        }}
                                        onCancel={() => {
                                            this.setState({openDateEndToDo: false})
                                        }}
                                        mode={"date"}
                                    />
                                    <Button style={styles.selectTime} onPress={() => this.setState({openTimeEndToDo: true})}>
                                        <Text>{moment(this.state.endToDo).format("HH:mm")}</Text>
                                    </Button>
                                    <DatePicker
                                        modal
                                        open={this.state.openTimeEndToDo}
                                        date={this.state.endToDo}
                                        onConfirm={(date) => {
                                            this.setState({openTimeEndToDo: false})
                                            this.setState({endToDo: date})
                                        }}
                                        onCancel={() => {
                                            this.setState({openTimeEndToDo: false})
                                        }}
                                        mode={"time"}
                                    />
                                </HStack>
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>End</FormControl.Label>
                                <HStack space={3}>
                                    <Button style={styles.selectDate} onPress={() => this.setState({openDateStartToDo: true})}>
                                        <Text>{moment(this.state.startToDo).format("DD MMMM YYYY")}</Text>
                                    </Button>
                                    <DatePicker
                                        modal
                                        open={this.state.openDateStartToDo}
                                        date={this.state.startToDo}
                                        onConfirm={(date) => {
                                            this.setState({openDateStartToDo: false})
                                            this.setState({startToDo: date})
                                        }}
                                        onCancel={() => {
                                            this.setState({openDateStartToDo: false})
                                        }}
                                        mode={"date"}
                                    />
                                    <Button style={styles.selectTime} onPress={() => this.setState({openTimeStartToDo: true})}>
                                        <Text>{moment(this.state.startToDo).format("HH:mm")}</Text>
                                    </Button>
                                    <DatePicker
                                        modal
                                        open={this.state.openTimeStartToDo}
                                        date={this.state.startToDo}
                                        onConfirm={(date) => {
                                            this.setState({openTimeStartToDo: false})
                                            this.setState({startToDo: date})
                                        }}
                                        onCancel={() => {
                                            this.setState({openTimeStartToDo: false})
                                        }}
                                        mode={"time"}
                                    />
                                </HStack>
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Repeat</FormControl.Label>
                                <Select bgColor="#f8f8f8" minWidth="200" accessibilityLabel="Choose repeat" placeholder="Choose repeat" _selectedItem={{
                                    bg: "teal.600",
                                    endIcon: <CheckIcon size="5" />
                                }} >
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
                            <Button onPress={() => this.setState({showTeamID: true})}>
                                Create
                            </Button>
                        </Modal.Footer>
                    </Modal.Content>

                </Modal>
            </>
        );
    }
}

const styles = StyleSheet.create({
    addButton: {
        width: "40%",
        height: 50,
        borderRadius: 12,
        alignSelf:"center",
        backgroundColor:"#f8f8f8",
    },
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
    addModal:{
        backgroundColor: "#ebebeb"
    }
});
export default EventModalButton;

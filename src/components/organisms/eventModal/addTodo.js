import React from 'react';
import {Button, FormControl, HStack, Input, Modal, Text} from 'native-base';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';

class AddTodo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openDateEndToDo: false,
            openTimeEndToDo: false,
            deadlineToDo: new Date(),
        }
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen} onClose={this.props.onClose}>
                <Modal.Content style={styles.addModal} maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Add To-do</Modal.Header>
                    <Modal.Body>
                        <FormControl>
                            <FormControl.Label>Title</FormControl.Label>
                            <Input bgColor="#f8f8f8"/>
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Deadline</FormControl.Label>
                            <HStack space={3}>
                                <Button style={styles.selectDate} onPress={() => this.setState({openDateEndToDo: true})}>
                                    <Text>{moment(this.state.deadlineToDo).format("DD MMMM YYYY")}</Text>
                                </Button>
                                <DatePicker
                                    modal
                                    open={this.state.openDateEndToDo}
                                    date={this.state.deadlineToDo}
                                    onConfirm={(date) => {
                                        this.setState({openDateEndToDo: false})
                                        this.setState({deadlineToDo: date})
                                    }}
                                    onCancel={() => {
                                        this.setState({openDateEndToDo: false})
                                    }}
                                    mode={"date"}
                                />
                                <Button style={styles.selectTime} onPress={() => this.setState({openTimeEndToDo: true})}>
                                    <Text>{moment(this.state.deadlineToDo).format("HH:mm")}</Text>
                                </Button>
                                <DatePicker
                                    modal
                                    open={this.state.openTimeEndToDo}
                                    date={this.state.deadlineToDo}
                                    onConfirm={(date) => {
                                        this.setState({openTimeEndToDo: false})
                                        this.setState({deadlineToDo: date})
                                    }}
                                    onCancel={() => {
                                        this.setState({openTimeEndToDo: false})
                                    }}
                                    mode={"time"}
                                />
                            </HStack>
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

export default AddTodo;

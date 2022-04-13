import React from 'react';
import { withTranslation } from 'react-i18next';
import {FormControl, HStack, Input, Modal, Text, Icon, VStack, Pressable} from 'native-base';
import IconJson from '../../../assets/icons.json';
import Icons from "../../../utils/icons";

class IconSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: []
        }
    }

    search(input) {
        let res = [];
        const fontArr = Object.keys(IconJson);
        for (let font of fontArr) {
            let iconArr = Object.keys(IconJson[font]);
            for (let name of iconArr) {
                if (name.includes(input.toLowerCase())) {
                    res.push({font: font, name: name})
                }
            }
        }

        let searchArray=[];
        for (let i=0;i<6;i++) {
            if (i*6 < res.length) {
                let tempArr=[];
                for (let j=0;j<6;j++) {
                    if ((i*6)+j < res.length) {
                        tempArr.push(res[(i*6)+j]);
                    }
                }
                searchArray.push(tempArr);
            }
        }

        this.setState({search: searchArray});
    }

    render() {
        const { t } = this.props;
        return (
            <Modal isOpen={this.props.isOpen} onClose={this.props.onClose}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header><Text>Select Icon</Text></Modal.Header>
                    <Modal.Body>
                        <VStack space={4}>
                            <FormControl>
                                <Input onSubmitEditing={(e => this.search(e.nativeEvent.text))}/>
                            </FormControl>
                            {
                                this.state.search.map((row, i) => (
                                    <HStack key={i} space={4}>
                                        {row.map((icon, j) => (
                                            <Pressable key={j} onPress={() => this.props.iconClick(icon.font, icon.name)}>
                                                <Icon as={Icons[icon.font]} name={icon.name} color={'#90ae4f'} size={'md'}/>
                                            </Pressable>
                                        ))}
                                    </HStack>
                                ))
                            }
                        </VStack>
                    </Modal.Body>
                </Modal.Content>
            </Modal>
        );
    }
}

export default withTranslation()(IconSelection);

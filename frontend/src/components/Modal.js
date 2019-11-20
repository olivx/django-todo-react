import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Label
} from "reactstrap";

export default class CustomModal extends Component {
    constructor(props){
        super(props)
        this.state = {
            activeItem: this.props.activeItem
        }
    }

    handleChange = e => {
        let { name, value } = e.target 
        if( e.target.type ===  "checkebox"){
            value = e.target.checked 
        }
        const activeItem = { ...this.state.activeItem, [name]: value }
        this.setState({activeItem})
    }

    render(){
        const { toggle,  onSave} = this.props
        return(
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}> Todo Item </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="title">  Title </Label>
                            <Input 
                                type="text"
                                name="title"
                                value={this.state.activeItem.title}
                                onChange={this.handleChange}
                                placeholder="Enter todo  Title"
                            />
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">  Description </Label>
                            <Input 
                                type="text"
                                name="description"
                                value={this.state.activeItem.description}
                                onChange={this.handleChange}
                                placeholder="Enter todo Description"
                            />
                    </FormGroup>
                    <FormGroup check>
                        <Label for="complete">  
                            <Input 
                                type="checkbox"
                                name="complete"
                                checked={this.state.activeItem.complete}
                                onChange={this.handleChange}
                            />
                            Complete
                        </Label>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={() => onSave(this.state.activeItem)}>
                        Save
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }
}
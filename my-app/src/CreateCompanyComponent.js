import React, { Component } from 'react';
import { Button, Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class CreateStyleComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        
        return(
            <div className="container">
                <br/>
                <div className="row">
                    <h1>Create New Company</h1>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-8">
                    <Form onSubmit={this.props.onCreateCompany.bind(this)} enctype="multipart/form-data" >
                    {/* <Form > */}
                        <FormGroup row>
                            <Label for="description" sm={2}>Description</Label>
                            <Col sm={10}>
                            <Input type="text" name="description" id="description" placeholder="Description" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="style" sm={2}>Style</Label>
                            <Col sm={10}>
                            <Input type="textarea" name="notes" id="notes" placeholder="Notes" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="style" sm={2}>&nbsp;</Label>
                            <Col sm={10}>
                            <Input type="submit" className="btn btn-success" name="image" id="image" placeholder="Image" />
                            </Col>
                        </FormGroup>
                    </Form>
                    </div>
                </div>
            </div>    
        )
    }

}

export default CreateStyleComponent;
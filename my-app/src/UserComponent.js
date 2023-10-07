import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Button, Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Media, Panel,   Card,
    Modal,
    ModalHeader,
    ModalBody,
    CardBody,
    ModalFooter, Progress, FormFeedback } from 'reactstrap';
const API_HEADERS = {

    'Content-Type':'application/json',
    Authentication: 'any-string-you-like'
}
    
class UserComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            showModal: false,
            searchText: '',
            newCompanyModal: false,
            newStyleModal: false,
            newLoadingModal: true,
            descriptionValue: "",
            companystyleValue: "",
            priceValue: "",
            priceoptValue: "",
            notesValue: "",
            imagesValue: [],
            products: [],
            defaultImageSelected: null,
            isModalOpen: false,
            username: '',
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            touched:{
                username: false,
                firstname: false,
                lastname : false,
                email : false,    
                password : false    
            },
            showModalDelete: false,
            toDelete: {}
        }

        this.handleBlur = this.handleBlur.bind(this);

    }

    componentDidMount(){

        fetch(this.props.URLExternal+'/users')
        .then((response)=>response.json())
        .then((responseData)=>{
            console.log(responseData);
            this.setState({
                users: responseData
            })
        })
        .catch((error)=>{
            console.log('Error fetching and parsing data', error);
        })


    }

    toggleModalStyle = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }


    imageClickEdit = (dataImage, dataId) => {
        let objSelected = {
          "productId": dataImage.id,
          "name": dataId
        }
        let nextState = this.props.products.filter(
  
          (data, index) => data.id.indexOf(dataImage.id) !== -1
        );
        nextState[0].image = dataId
        this.setState({
          products: nextState,
          defaultImageSelected: objSelected
        })
    }

    onSendEmail(){

        console.log('send email');
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    toggleModalStyle = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    onSubmitDetail(event){

        event.preventDefault();

        let newEmail = {

            username : event.target.username.value,
            password : "",
            firstname : event.target.firstname.value,
            lastname : event.target.lastname.value,
            email : event.target.email.value,
            password : event.target.password.value

        }

        fetch(this.props.URLExternal+'/createuser', {

            method: 'post',
            headers: API_HEADERS,
            body: JSON.stringify(newEmail)
        })

        let nextState = this.state.users;

        nextState.push(newEmail);

        this.setState({
            users: nextState,
            isModalOpen: false

        })

    }

    handleBlur = (field) => (evt) =>{

        this.setState({
            touched: { ...this.state.touched, [field]: true }
        })

    }

    validate(username, firstname, lastname, email){

        const errors = {
            username: '',
            firstname: '',
            lastname: '',
            email: ''
        }

        if(this.state.touched.username && username.length < 3){
            errors.username = "User Name should be >= 3 characters"
        }
        if(this.state.touched.firstname && firstname.length < 3){
            errors.firstname = "First Name should be >= 3 characters"
        }
        if(this.state.touched.lastname && lastname.length < 3){
            errors.lastname = "Last Name Style should be >= 3 characters"
        }
        if(this.state.touched.email && email.length < 3){
            errors.email = "Email should be >= 1 characters"
        }

        return errors;
        
    }

    onUserNameChange(value){
        this.setState({
            username: value
        })
    }
    onFirstNameChange(value){
        this.setState({
            firstname: value
        })
    }
    onLastNameChange(value){
        this.setState({
            lastname: value
        })
    }
    onEmailChange(value){
        this.setState({
            email: value
        })
    }
    onPasswordChange(value){
        this.setState({
            password: value
        })
    }


    onClickBack(){
        window.history.back();
    }

    onOpenModal(){

        this.setState({
            isModalOpen: true
        })

    }

    onChangeField(event){

        this.setState({
            searchText: event.target.value
        })
    }

    onDeleteItem(dataItem,idUser){

        let nextState = this.state.users.filter(

            (data, index) => data.username.toLowerCase().indexOf(dataItem.toLowerCase()) === -1
        );

        this.setState({
            users: nextState,
            showModalDelete: false
        })

        let newEmail = {

            username : dataItem
        }

        fetch(this.props.URLExternal+'/removeuser', {

            method: 'post',
            headers: API_HEADERS,
            body: JSON.stringify(newEmail)
        })

                
    }

    onResetItem(dataItem,idUser){

        let newEmail = {

            username : dataItem
        }

        console.log(dataItem);

        // fetch(this.props.URLExternal+'/reset', {

        //     method: 'post',
        //     headers: API_HEADERS,
        //     body: JSON.stringify(newEmail)
        // })


    }

    toggleModalDelete = () => {
        this.setState({
            showModalDelete: !this.state.showModalDelete
        })
    }

    onClickDeleteModal(data){
        // console.log(data);
        this.setState({
            showModalDelete: true,
            toDelete: data
        })
    }

    render() {

        const errors = this.validate(this.state.username,this.state.firstname, this.state.lastname, this.state.email);

        let submitButton
        
        if((this.state.username === '') ||(this.state.firstname === '') || (this.state.lastname === '') || (this.state.email === '') ){

            submitButton = <Input type="submit" className="btn btn-success" name="image" id="image" placeholder="Image" disabled />
        }else{
            
            submitButton = <Input type="submit" className="btn btn-success" name="image" id="image" placeholder="Image" />
        }

        let filteredData = this.state.users.filter(

            (data, index) => data.firstname.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1 || data.lastname.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1 || data.username.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1 || data.email.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1 
        );
        
        return(            
            <div className="container">
                <Modal isOpen={this.state.showModalDelete} toggle={this.toggleModalDelete}>
                    <ModalHeader >
                        <div className="row">
                                {/* <p>Delete to {this.state.toDelete.description} </p>                                 */}
                                <p>Delete to {''} </p>                                
                        </div>

                    </ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <h5>Are you sure you want to delete this item?</h5>
                        </div>
                        <div className="row">
                            <div className="col-md-8"></div>
                            <div className="col-md-2">
                                <button className="btn btn-danger" onClick={this.onDeleteItem.bind(this, this.state.toDelete.username)} >Yes</button>
                                {/* <button className="btn btn-danger" onClick={this.props.onDeleteProduct.bind(this, this.state.toDelete.id)} >Yes</button> */}
                            </div>
                            <div className="col-md-2">
                                <button onClick={this.toggleModalDelete} className="btn btn-primary">No</button>
                            </div>
                        </div>
                    </ModalBody>
                </Modal>

                <br/>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModalStyle}>
                    <ModalHeader >
                        <div className="row">
                                <p>{'Create a new User'}</p>                                
                        </div>

                    </ModalHeader>
                    <ModalBody>

                    <Form name="contact-form" onSubmit={this.onSubmitDetail.bind(this)}>
                                <FormGroup row>
                                    <Label for="username" sm={1}>&nbsp;</Label>
                                    <Label for="username" sm={4}>User Name</Label>
                                    <Col sm={7}>
                                    <Input type="text" name="username" id="username" placeholder="User Name" 
                                        onBlur={this.handleBlur('username')}
                                        valid={this.state.username.length >= 3 }
                                        invalid={this.state.username.length < 3 }
                                        onChange={e => this.onUserNameChange(e.target.value)}
                                        value={this.state.username}                                      
                                    />
                                    <FormFeedback>{errors.username}</FormFeedback>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="firstname" sm={1}>&nbsp;</Label>
                                    <Label for="firstname" sm={4}>First Name</Label>
                                    <Col sm={7}>
                                    <Input type="text" name="firstname" id="firstname" placeholder="First Name" 
                                        onBlur={this.handleBlur('firstname')}
                                        valid={this.state.firstname.length >= 3 }
                                        invalid={this.state.firstname.length < 3 }
                                        onChange={e => this.onFirstNameChange(e.target.value)}
                                        value={this.state.firstname}                                      
                                    />
                                    <FormFeedback>{errors.firstname}</FormFeedback>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="lastname" sm={1}>&nbsp;</Label>
                                    <Label for="lastname" sm={4}>Last Name</Label>
                                    <Col sm={7}>
                                    <Input type="text" name="lastname" id="lastname" placeholder="Last Name" 
                                        onBlur={this.handleBlur('lastname')}
                                        valid={this.state.lastname.length >= 3 }
                                        invalid={this.state.lastname.length < 3 }
                                        onChange={e => this.onLastNameChange(e.target.value)}
                                        value={this.state.lastname}     
                                    />
                                    <FormFeedback>{errors.lastname}</FormFeedback>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="lastname" sm={1}>&nbsp;</Label>
                                    <Label for="email" sm={4}>Email</Label>
                                    <Col sm={7}>
                                    <Input type="email" name="email" id="email" placeholder="Email" 
                                        onBlur={this.handleBlur('email')}
                                        valid={this.state.email.length >= 3 }
                                        invalid={this.state.email.length < 3 }
                                        onChange={e => this.onEmailChange(e.target.value)}
                                        value={this.state.email}       
                                    />
                                    <FormFeedback>{errors.email}</FormFeedback>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="password" sm={1}>&nbsp;</Label>
                                    <Label for="password" sm={4}>Password</Label>
                                    <Col sm={7}>
                                    <Input type="password" name="password" id="password" placeholder="Password" 
                                        onBlur={this.handleBlur('password')}
                                        valid={this.state.password.length >= 3 }
                                        invalid={this.state.password.length < 3 }
                                        onChange={e => this.onPasswordChange(e.target.value)}
                                        value={this.state.password}       
                                    />
                                    <FormFeedback>{errors.password}</FormFeedback>
                                    </Col>
                                </FormGroup>
                                <br/>
                                <br/>
                                <FormGroup row>
                                    <Label for="style" sm={2}>&nbsp;</Label>
                                    <Col sm={10}>
                                        {submitButton}
                                        {/* <Input type="submit" className="btn btn-success" name="image" id="image" placeholder="Image" /> */}
                                    </Col>
                                </FormGroup>
                        </Form>


                    </ModalBody>
                </Modal>
                <div className="row">
                    <div className="col-md-2">
                        <button className="btn btn-warning" onClick={this.onClickBack.bind(this)}>Back</button>
                    </div>
                    <div className="col-md-10"></div>
                    {/* <nav aria-label="breadcrumb">
                        <ol style={{'padding-top':'1%','padding-left':'1%'}} class="breadcrumb">
                            <li class="breadcrumb-item">
                                <Link to={'/'}> 
                                    <p>Home</p>
                                </Link>
                            </li>
                            <li onClick={this.onClickBack.bind(this)} className="breadcrumb-item active" style={{'text-decoration':'unset','color':'#007bff','cursor':'pointer'}} aria-current="page">{'Back'}</li>
                        </ol>
                    </nav> */}
                </div>
                <br/>
                <div className="row">
                    <Card style={{'width':'100%'}}>
                        <CardBody>
                            <Input type="text" onChange={this.onChangeField.bind(this)} placeholder="Search" ></Input>
                        </CardBody>
                    </Card>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-6">
                        <h1>&nbsp;</h1>
                    </div>
                    <div className="col-md-6">
                        <Button className="btn btn-success" onClick={this.onOpenModal.bind(this)} style={{'width':'100%'}}  >
                        <i className="fa fa-plus-circle" style={{'color':'#ffffff'}} aria-hidden="true"></i>&nbsp;&nbsp;  Create a New User
                        </Button>
                        {/* <div className="btn btn-dark" onClick={this.onClicked.bind(this)} style={{'width':'100%'}}  >Create a New Product</div> */}
                    </div>
                </div>
                <div className="row">
                    <Table>
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>User Name</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map(
                            (data, index) => 
                                <tr>
                                    <td>{index+1}</td>                                                    
                                    <td>{data.username}</td>                                                    
                                    <td>{data.firstname}</td>                                                    
                                    <td>{data.lastname}</td>                                                    
                                    <td>{data.email}</td>                                                    
                                    <td>
                                        <div className="row">
                                            <div className="col-md-4"></div>
                                            {/* <div className="col-md-1">
                                                <button className="btn btn-warning" onClick={this.onResetItem.bind(this,data.username)} ><i className="fa fa-undo" title="Reset password" style={{'color':'#ffffff'}} aria-hidden="true"></i></button>
                                            </div> */}
                                            <div className="col-md-2">
                                                <button className="btn btn-danger" onClick={this.onClickDeleteModal.bind(this, data)} ><i className="fa fa-trash" style={{'color':'#ffffff'}} aria-hidden="true"></i></button>
                                                {/* <button className="btn btn-danger" onClick={this.onDeleteItem.bind(this,data.username)} ><i className="fa fa-trash" style={{'color':'#ffffff'}} aria-hidden="true"></i></button> */}
                                            </div>
                                            <div className="col-md-6"></div>
                                        </div>


                                    </td>                                                    
                                </tr>
                            )}
                        </tbody>
                    </Table>

                </div>
            </div>
        );
    }

}

export default UserComponent;
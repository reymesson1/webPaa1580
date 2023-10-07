import React, { Component } from 'react';
import { Input,
    CardBody,
    CardTitle,
    CardSubtitle } from 'reactstrap';
import { AddToCart } from './AddToCartComponent';
import Pagination from './PaginationComponent';
import { Link } from 'react-router-dom';
import {
     CardImg, CardText
  } from 'reactstrap';
import { Media, Panel,   Card,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter, Progress } from 'reactstrap';
import { Button, Col, Form, FormGroup, Label, FormText, FormFeedback } from 'reactstrap';
import QuickFavoriteComponent from './QuickFavoriteComponent';

const API_HEADERS = {

    'Content-Type':'application/json',
    Authentication: 'any-string-you-like'
}
  
var limit = 5;

class HomeComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
            searchTextCategory: "",
            limit: 4,
            sequence: 5,
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
            productId: '',
            firstname: '',
            lastname: '',
            email: '',
            touched:{
                firstname: false,
                lastname : false,
                email : false    
            },
            scrolling: false
        }  

        this.handleBlur = this.handleBlur.bind(this);

    }

    componentDidMount(){
        this.setState({
            // searchText: this.props.match.params.id
            searchTextCategory: this.props.match.params.id
        })   
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll.bind(this));
    }
    handleScroll(event) {
        if (window.scrollY === 0 && this.state.scrolling === true) {
            this.setState({scrolling: false});
        }
        else if (window.scrollY !== 0 && this.state.scrolling !== true) {
            this.setState({scrolling: true});
        }
    }
    componentDidUpdate(){
        if(this.state.scrolling){
            console.log('see more')
            // limit += 5;
            console.log(limit);
            this.onViewMore()
            // let nextState = this.state.limit;
            // nextState+=5;        
            // this.setState({
    
            //     limit: nextState
            // })

        }
    }

    onViewMore(){
        limit += 5;
    }
    onChangeField(event){
        this.setState({
            searchText: event.target.value
        })
    }
    // onViewMore(){
    //     let nextState = this.state.limit;
    //     nextState+=15;        
    //     this.setState({

    //         limit: nextState
    //     })
    // }

    onSendEmail(dataImage, dataId){

        console.log('send email');
        this.setState({
            isModalOpen: !this.state.isModalOpen,
            productId: dataImage.id
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

            id : this.state.productId,
            firstname : event.target.firstname.value,
            lastname : event.target.lastname.value,
            email : event.target.email.value

        }

        // console.log(newEmail);

        fetch(this.props.URLExternal+'/sendemail', {

            method: 'post',
            headers: API_HEADERS,
            body: JSON.stringify(newEmail)
        })

        this.setState({
            isModalOpen: false
        })


    }

    handleBlur = (field) => (evt) =>{

        this.setState({
            touched: { ...this.state.touched, [field]: true }
        })

    }

    validate(firstname, lastname, email){

        const errors = {
            firstname: '',
            lastname: '',
            email: ''
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

    onClickFavorite(){

        console.log('onClickFavorite')
    }

    onClickBack(){
        window.history.back();
    }


    render() {

        // const result = this.props.products.reduce((temp, value) => {
        //     if(temp.length<this.state.limit)
        //       temp.push(value);
        //     return temp;
        // }, []);

        const errors = this.validate(this.state.firstname, this.state.lastname, this.state.email);

        let submitButton
        
        if((this.state.firstname === '') || (this.state.lastname === '') || (this.state.email === '') ){

            submitButton = <Input type="submit" className="btn btn-success" name="image" id="image" placeholder="Image" disabled />
        }else{
            
            submitButton = <Input type="submit" className="btn btn-success" name="image" id="image" placeholder="Image" />
        }



        var productData  = this.props.products.sort( 
            (a,b) =>{
                if(a.description.toLowerCase()<b.description.toLowerCase()){
                    return 1
                }
                if(a.description.toLowerCase()>b.description.toLowerCase()){
                    return -1
                }
                return 0
            }
        )

        let filterData
        // filterData = this.props.products.filter(
        if(this.state.searchText==""){

            filterData = productData.filter(
                
                (data, index) => data.category.toLowerCase().indexOf(this.state.searchTextCategory.toLowerCase()) !== -1 
                // (data, index) => data.description.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1 || data.style.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1 || data.companystyle.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1 || data.category.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1 || data.company.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1  || data.notes.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1
                );
        }else{

            let filterDataCategory = productData.filter(
                
                (data, index) => data.category.toLowerCase().indexOf(this.state.searchTextCategory.toLowerCase()) !== -1 
                // (data, index) => data.description.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1 || data.style.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1 || data.companystyle.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1 || data.category.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1 || data.company.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1  || data.notes.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1
                );

            filterData = filterDataCategory.filter(
                
                // (data, index) => data.category.toLowerCase().indexOf(this.state.searchTextCategory.toLowerCase()) !== -1 
                (data, index) => data.description.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1 || data.style.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1 || data.companystyle.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1 || data.category.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1 || data.company.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1  || data.notes.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1
                );
        }

        const result = filterData.reduce((temp, value) => {
            if(this.state.searchText==""){
                if(temp.length<limit){

                    temp.push(value);
                }
            }else{
                
                temp.push(value);
            }
            return temp;
        }, []);

        let showViewMore

        // if(this.state.limit==result.length){
        if(result.length>limit){

            showViewMore = <Button onClick={this.onViewMore.bind(this)} outline color="primary">See More</Button>

            // showViewMore = <p style={{'text-decoration':'underline','color':'blue','cursor':'pointer'}} onClick={this.onViewMore.bind(this)} > {'View More'} </p>
            // showViewMore = <p style={{'text-decoration':'underline','color':'blue','cursor':'pointer'}} onClick={this.onViewMore.bind(this)} > {'View More'} </p>
        }

        const menu = result.map((product, index) => {
            return (
                <div key={product.id} className="col-md-3">
                     <div>
                        <Card>
                            <Link to={'/productdetail/'+product.id}> 
                                <CardImg top width="100%" src={this.props.URLExternal+"/images/"+ product.image} alt="Card image cap" />
                                {/* <CardImg top width="100%" src={this.props.URLExternal+"/images/output-"+ product.image} alt="Card image cap" /> */}
                            </Link>
                            <CardBody>
                            <CardTitle tag="h5">{product.description}</CardTitle>
                            <CardText>{product.category}</CardText>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">{'$ '+product.price}</CardSubtitle>
                            <div className="row">
                                <div className="col-md-4">
                                    <Button className="btn btn-success" onClick={this.onSendEmail.bind(this, product)} ><i className="fa fa-envelope" style={{'color':'#ffffff'}} aria-hidden="true"></i></Button>
                                </div>
                                <div className="col-md-4">
                                    <QuickFavoriteComponent 
                                        URLExternal={this.props.URLExternal}
                                        product={product} 
                                    />
                                    {/* <Button className="btn btn-danger" onClick={this.onClickFavoriteToggle.bind(this,product)} ><i className="fa fa-star" style={{'color':'#ffffff'}} aria-hidden="true"></i></Button> */}
                                </div>
                                <div className="col-md-4">
                                    <Link to={'/editproduct/'+product.id}>
                                        <Button className="btn btn-warning"><i className="fa fa-pencil" style={{'color':'#ffffff'}} aria-hidden="true"></i></Button>
                                    </Link>
                                </div>
                            </div>
                            </CardBody>
                        </Card>
                        </div>
                        <br/>

                    {/* <Link to={'/productdetail/'+product.id}> 
                        <div className="card" style={{'margin':'5%'}}>
                                <img src={this.props.URLExternal+"/images/output-"+ product.image}  alt="Avatar" style={{"width":"100%","height":"100%"}}/>
                        </div>
                    </Link>
                    <h5>{product.description}</h5> */}
                </div>
            )

        })
        
        return(
            <div className="container">    
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModalStyle}>
                    <ModalHeader>
                    <p>Send an email</p>
                    </ModalHeader>
                    <ModalBody>
                        <div className="row">

                            <Form onSubmit={this.onSubmitDetail.bind(this)}>
                                    <FormGroup row>
                                        <Label for="firstname" sm={4}>&nbsp;</Label>
                                        <Col sm={8}>
                                        <Input style={{'display':'none'}} type="text" name="id" id="id" value={this.props.match.params.id} disabled />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="firstname" sm={4}>First Name</Label>
                                        <Col sm={7}>
                                        <Input type="text" name="firstname" id="firstname" placeholder="First Name" 
                                            onBlur={this.handleBlur('firstname')}
                                            valid={this.state.firstname.length >= 3 }
                                            invalid={this.state.firstname.length < 3 }
                                            onChange={e => this.onFirstNameChange(e.target.value)}
                                            value={this.state.firstname}  
                                            style={{'width':'275px'}}                                                                                                                             
                                        
                                        />
                                        <FormFeedback>{errors.firstname}</FormFeedback>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="lastname" sm={4}>Last Name</Label>
                                        <Col sm={7}>
                                        <Input type="text" name="lastname" id="lastname" placeholder="Last Name" 
                                            onBlur={this.handleBlur('lastname')}
                                            valid={this.state.lastname.length >= 3 }
                                            invalid={this.state.lastname.length < 3 }
                                            onChange={e => this.onLastNameChange(e.target.value)}
                                            value={this.state.lastname}     
                                            style={{'width':'275px'}}                                                                                                                             
                                                                                
                                        />
                                        <FormFeedback>{errors.lastname}</FormFeedback>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="email" sm={4}>Email</Label>
                                        <Col sm={7}>
                                        <Input type="email" name="email" id="email" placeholder="Email" 
                                            onBlur={this.handleBlur('email')}
                                            valid={this.state.email.length >= 3 }
                                            invalid={this.state.email.length < 3 }
                                            onChange={e => this.onEmailChange(e.target.value)}
                                            value={this.state.email}       
                                            style={{'width':'275px'}}                                                                                                                             
                                        />
                                        <FormFeedback>{errors.email}</FormFeedback>
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

                        </div>
                    </ModalBody>
                </Modal>
                <br/>            
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
                            <li class="breadcrumb-item active" aria-current="page">{this.props.match.params.id.toUpperCase()}</li>
                        </ol>
                    </nav> */}
                </div>
                <br/>
                {/* <br/>
                <div className="row">
                    <h1>{this.props.match.params.id.toUpperCase()}</h1>
                </div> */}
                <div className="row">
                    <Card style={{'width':'100%'}}>
                        <CardBody>
                        </CardBody>
                        <CardBody>
                            <Input type="text" onChange={this.onChangeField.bind(this)} placeholder="Search" ></Input>
                        </CardBody>
                    </Card>
                </div>
                <br/>
                <div className="row">                    
                    {menu}
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        {showViewMore}
                    </div>
                    <div className="col-md-4"></div>                            
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
        );
    }

}

export default HomeComponent;
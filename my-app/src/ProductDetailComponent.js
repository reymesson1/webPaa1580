
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Media, Panel,   Card,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter, Progress } from 'reactstrap';
import { Button, Col, Form, FormGroup, Label, Input, FormText, FormFeedback } from 'reactstrap';
import moment from 'moment'

const API_HEADERS = {

    'Content-Type':'application/json',
    Authentication: 'any-string-you-like'
}


class ProductDetailComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
            firstname: '',
            lastname: '',
            email: '',
            touched:{
                firstname: false,
                lastname : false,
                email : false    
            }
        }

        this.handleBlur = this.handleBlur.bind(this);


    }

    componentDidMount() {
        window.scrollTo(0, 0)      
        this.props.closeDropdownQS();
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

            id : event.target.id.value,
            firstname : event.target.firstname.value,
            lastname : event.target.lastname.value,
            email : event.target.email.value

        }

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

    onClickFavoriteToggle(dataImage, dataId){

        let nextState = this.props.products.filter(
  
          (data, index) => data.id.indexOf(dataImage.id) !== -1
        );
        
        nextState[0].favorite = !nextState[0].favorite
        
        this.setState({
          products: nextState
        })
  
        let objSelected = {
          "productId": dataImage.id,
          "favorite": nextState[0].favorite,
        }
  
        fetch(this.props.URLExternal+'/setfavorite', {
  
          method: 'post',
          headers: API_HEADERS,
          body: JSON.stringify(objSelected)
        })
  
    }
    
    onPrint(){
        window.print();
    }

    onClickBack(){
        window.history.back();
        this.props.onFilterSearch();
    }
  

  
    render() {

        // console.log(window.history.back());

        const errors = this.validate(this.state.firstname, this.state.lastname, this.state.email);

        let submitButton
        
        if((this.state.firstname === '') || (this.state.lastname === '') || (this.state.email === '') ){

            submitButton = <Input type="submit" className="btn btn-success" name="image" id="image" placeholder="Image" disabled />
        }else{
            
            submitButton = <Input type="submit" className="btn btn-success" name="image" id="image" placeholder="Image" />
        }


        let filteredData = this.props.products.filter(

            (data, index) => data.id.indexOf(this.props.match.params.id) !== -1
        );

        let style 
            
        let company  
        
        let companyStyle 
        
        let category 
        
        let notes 

        let favorite 

        let diffDay 

        if(filteredData.length>0){

            if(filteredData[0].hidden){
                
                style = 'Style: ' + filteredData[0].style
                
                company =  'Company: ' + filteredData[0].company 
                
                companyStyle = 'Company Style: ' + filteredData[0].companystyle
                
                category = 'Category: ' + filteredData[0].category
                
                notes = 'Notes: ' + filteredData[0].notes

                favorite = filteredData[0].favorite

            }

            var date = parseInt(filteredData[0].id, 10); // you want to use radix 10

            let yesterday = moment(date).format('YYYY-MM-DD');
            let yesterdayYY = moment(date).format('YYYY');
            let yesterdayMM = moment(date).format('MM');
            let yesterdayDD = moment(date).format('DD');

            let today = moment(new Date()).format('YYYY-MM-DD');
            let todayYY = moment(new Date()).format('YYYY');
            let todayMM = moment(new Date()).format('MM');
            let todayDD = moment(new Date()).format('DD');
            
            var a = moment([yesterdayYY, yesterdayMM-1, yesterdayDD]);
            var b = moment([todayYY, todayMM-1, todayDD]);

            diffDay = ( b.diff(a, 'days')  )   // =1

            let flagFavorite

            if(filteredData[0].favorite){

                flagFavorite = <h1 onClick={this.onClickFavoriteToggle.bind(this,filteredData[0])} style={{'text-decoration':'underline','color':'red','cursor':'pointer'}} ><i className="fa fa-star fa-lg"></i> <a href="mailto:confusion@food.net"/></h1>                
                // flagFavorite = <h1 onClick={this.props.onClickFavoriteToggle.bind(this,filteredData[0])} style={{'text-decoration':'underline','color':'red','cursor':'pointer'}} ><i className="fa fa-star fa-lg"></i> <a href="mailto:confusion@food.net"/></h1>                
            }else{
                
                flagFavorite = <h1 onClick={this.onClickFavoriteToggle.bind(this,filteredData[0])} style={{'text-decoration':'underline','color':'gray','cursor':'pointer'}} ><i className="fa fa-star fa-lg"></i> <a href="mailto:confusion@food.net"/></h1>
                // flagFavorite = <h1 onClick={this.props.onClickFavoriteToggle.bind(this,filteredData[0])} style={{'text-decoration':'underline','color':'gray','cursor':'pointer'}} ><i className="fa fa-star fa-lg"></i> <a href="mailto:confusion@food.net"/></h1>
            }
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
                        {/* <div className="col-md-2">
                            <button className="btn btn-warning" onClick={this.onClickBack.bind(this)}>Back</button>
                        </div>
                        <div className="col-md-8"></div>
                        <div className="col-md-1">
                            <Link style={{'margin':'10px'}} className="btn btn-primary" to={'/editproduct/'+filteredData[0].id} ><i className="fa fa-edit" style={{'color':'#ffffff'}} aria-hidden="true"></i></Link>                                                        
                        </div>
                        <div className="col-md-1">
                            {flagFavorite}
                        </div> */}
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
                    <div className="col-md-3">
                        {/* <button className="btn btn-warning" onClick={this.onClickBack.bind(this)}>Back</button> */}
                        <button className="btn btn-warning" onClick={this.props.onFilterSearchGoBack.bind(this)}>Back</button>
                    </div>
                    <div className="col-md-6">

                            <div class="card mb-3">
                                <h3 class="card-header">{filteredData[0].description}</h3>
                                <Link to={'/productdetailzoom/'+filteredData[0].image}>
                                    <img src={this.props.URLExternal+'/images/'+filteredData[0].image}/>
                                </Link>
                                <div class="card-body">
                                    <h5 class="card-text"><p>{'Style Number: ' + filteredData[0].description}</p></h5>
                                    <h5 class="card-text ">{'Price: ' +filteredData[0].price}</h5>
                                    <h5 class="card-text ">{'Price opt: ' +filteredData[0].priceopt}</h5>
                                    <h5 class="card-text ">{company}</h5>
                                    <h5 class="card-text ">{companyStyle}</h5>
                                    <h5 class="card-text ">{style}</h5>
                                    <h5 class="card-text ">{category}</h5>
                                    <p class="card-text">{notes}</p>
                                </div>

                                <div class="card-body">
                                </div>
                                <ul class="list-group list-group-flush">
                                    {/* <li class="list-group-item">{ 'Price: ' + filteredData[0].price}</li>
                                    <li class="list-group-item">{ 'Price Opt: ' + filteredData[0].priceopt}</li> */}
                                    <li class="list-group-item"></li>
                                </ul>
                                <div class="card-body">
                                    <div className="row">
                                    {filteredData[0].images.map(
                                        (data, index) =>
                                            <div className="col-md-3" style={{'cursor':'pointer'}} onClick={this.imageClickEdit.bind(this,filteredData[0],data)} >
                                                <img style={{'margin':'2px','border':'4px solid #000000', 'border-radius':'7px'}}  src={this.props.URLExternal+"/images/"+data}/>
                                            </div>
                                    )}
                                            
                                    </div>
                                    <hr/>
                                </div>
                                <div class="card-footer text-muted">
                                    {diffDay + ' days ago'} 
                                </div>
                                </div>
                        </div>
                        <div className="col-md-1"></div>
                        <div className="col-md-1">
                            <Link style={{'margin':'10px'}} className="btn btn-primary" to={'/editproduct/'+filteredData[0].id} ><i className="fa fa-edit" style={{'color':'#ffffff'}} aria-hidden="true"></i></Link>                                                        
                        </div>
                        <div className="col-md-1">
                            {/* <h1 style={{'text-decoration':'underline','color':'red','cursor':'pointer'}} ><i className="fa fa-star fa-lg"></i> <a href="mailto:confusion@food.net"/></h1> */}
                            {flagFavorite}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-10"></div>

                        <div className="col-md-1">
                                <h1 style={{'text-decoration':'underline','color':'green','cursor':'pointer'}} onClick={this.onSendEmail.bind(this)} ><i className="fa fa-envelope fa-lg"></i></h1>
                        </div>
                        <div className="col-md-1">
                            <h1 onClick={this.onPrint.bind(this)} style={{'text-decoration':'underline','color':'gray','cursor':'pointer'}} ><i className="fa fa-print fa-lg"></i> <a href="mailto:confusion@food.net"/></h1>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-md-1"></div>
                        {/* <div className="col-md-4">
                            <div className="row">
                                <Link to={'/productdetailzoom/'+filteredData[0].image}>
                                    <img src={this.props.URLExternal+'/images/'+filteredData[0].image}/>
                                </Link>
                            </div>
                            <br/>
                            <br/>
                            <div className="row">
                            {filteredData[0].images.map(
                                        (data, index) =>
                                        <div className="col-md-3">
                                            <div className="row">
                                                <button className="btn btn-white" onClick={this.imageClickEdit.bind(this,filteredData[0],data)}>
                                                    <img src={this.props.URLExternal+"/images/output-"+data} height="70px" width="40px" />                                                                                
                                                </button>
                                            </div>
                                        </div>                                         
                            )}
                            </div>
                        </div> */}
                        <div className="col-md-1"></div>
                        {/* <div className="col-md-4">

                            <br/>
                            <div className="row">
                                <div className="col-md-6 text-align">
                                    <h4>Style Number:</h4>
                                </div>
                                <div className="col-md-6">
                                    <p>{filteredData[0].description}</p>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-md-6 text-align">
                                    <h4>Style:</h4>
                                </div>
                                <div className="col-md-6 text-align">
                                    <p>{style}</p>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-md-6 text-align">
                                    <h4>Company:</h4>
                                </div>
                                <div className="col-md-6 text-align">
                                    <p>{company}</p>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-md-6 text-align">
                                    <h4>Company Style:</h4>
                                </div>
                                <div className="col-md-6 text-align">
                                    <p>{companyStyle}</p>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-md-6 text-align">
                                    <h4>Price:</h4>
                                </div>
                                <div className="col-md-6 text-align">
                                    <p>{filteredData[0].price}</p>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-md-6 text-align">
                                    <h4>Price Opt:</h4>
                                </div>
                                <div className="col-md-6 text-align">
                                    <p>{filteredData[0].priceopt}</p>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-md-6 text-align">
                                    <h4>Category:</h4>
                                </div>
                                <div className="col-md-6 text-align">
                                    <p>{category}</p>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-md-6 text-align">
                                    <h4>Notes:</h4>
                                </div>
                                <div className="col-md-6 text-align">
                                    <p>{notes}</p>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-md-3">
                                        <h1 style={{'text-decoration':'underline','color':'green','cursor':'pointer'}} onClick={this.onSendEmail.bind(this)} ><i className="fa fa-envelope fa-lg"></i></h1>
                                </div>
                                <div className="col-md-3">
                                    <h1 onClick={this.onPrint.bind(this)} style={{'text-decoration':'underline','color':'gray','cursor':'pointer'}} ><i className="fa fa-print fa-lg"></i> <a href="mailto:confusion@food.net"/></h1>
                                </div>
                                <div className="col-md-3">
                                </div>
                                <div className="col-md-3"></div>
                            </div>
                        </div> */}
                    </div>
                    <div className="col-md-2"></div>

                    <br/>
                    <br/>
                    <br/> 
                </div>

            );
        }else{
            return(
                <div>
                    <h1>{''}</h1>
                </div>
            );
        }
    }

}

export default ProductDetailComponent; 
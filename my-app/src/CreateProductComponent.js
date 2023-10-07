import React, { Component } from 'react';
import { Button, Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Media, Panel,   Card,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter, Progress, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom';
import  axios  from 'axios'
const API_HEADERS = {

    'Content-Type':'application/json',
    Authentication: 'any-string-you-like'
  }
  

class CreateProductComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newCompanyModal: false,
            newStyleModal: false,
            newLoadingModal: true,
            productHiddenBtn: true,
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
            description: '',
            price: '',
            company: '',
            style: '',  
            companystyle: '',  
            category: '',  
            priceopt: '',  
            notes: '', 
            touched:{
                description: false,
                price: false,
                company: false,
                style: false,  
                companystyle: false,  
                category: false,  
                priceopt: false,  
                notes: false,         
            },
            uploadingPic: [],
            productLoadingModal: false,
            productLoadingModalLabel: "Loading...",
            productLoadingModalLabelPcnt: "0",
            productLoadingModalMessageErrorLabel: "Loading...",
            productLoadingModalMessageError: false,
            images: [],
            file: null,
            fileName: "",
            fileUploaded: false,
            defaultImage: ""
        }

        this.handleBlur = this.handleBlur.bind(this);

    }


    toggleModal = () => {
        this.setState({
            newCompanyModal: !this.state.newCompanyModal
        })
    }

    toggleModalStyle = () => {
        this.setState({
            newStyleModal: !this.state.newStyleModal
        })
    }

    openNewCompanyModal(){

        this.setState({

            newCompanyModal: true
        })
        // console.log('open modal');
    }

    openNewStyleModal(){

        this.setState({

            newStyleModal: true
        })
    }

    onChangeDescription(value){

        if(value.length>0){

            this.setState({
                productHiddenBtn: false
            })
        }else{

            this.setState({
                productHiddenBtn: true
            })
        }

    }

    onGotoCreateProduct(event){
        
        window.location.reload();
    }

    onClickBack(){
        window.history.back();
    }

    handleBlur = (field) => (evt) =>{

        this.setState({
            touched: { ...this.state.touched, [field]: true }
        })

    }

    validate(description, companystyle, price){

        const errors = {
            description: '',
            companystyle: '',
            price: ''
        }

        // if(this.state.touched.description && description.length < 3){
        //     errors.description = "Style Number should be >= 3 characters"
        // }

        let filteredProduct = this.props.products.filter(

            (data, index) => data.description.indexOf(this.state.description) !== -1
        );

        if(filteredProduct.length == 1 ){

            errors.description = "Another similar Style Number already exists"    
        }

        if(this.state.touched.companystyle && companystyle.length < 3){
            errors.companystyle = "Company Style Style should be >= 3 characters"
        }
        if(this.state.touched.price && price.length < 3){
            errors.price = "Price should be >= 1 characters"
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

    onDescriptionChange(value){
        this.setState({
            description: value
        })
    }
    onCompanyStyleChange(value){
        this.setState({
            companystyle: value
        })
    }
    onPriceChange(value){
        this.setState({
            price: value
        })
    }

    onCompanyChange(value){
        this.setState({
            company: value
        })
    }
    onCategoryChange(value){
        this.setState({
            category: value
        })
    }
    onStyleChange(value){
        this.setState({
            style: value
        })
    }

    onCreateProductUpload(event){

        if (event.target.files && event.target.files[0]) {
          let img = event.target.files[0];
          this.setState({
            image: img,
            images: event.target.files,
            file: URL.createObjectURL(event.target.files[0]),
            fileName: event.target.files[0].name
          });  
        }
  
      }
  
      onAddImagePartial(){
  
  
        let nextState = this.state.uploadingPic;
  
        let today = Date.now();
  
        const data = new FormData();
        data.append("description", today);
        data.append("price", "");
        data.append("company", "");
        data.append("style", "");
  
        for (let i = 0; i < this.state.images.length; i++) {
          console.log(this.state.images[i]);
          data.append('single-file', this.state.images[i]);
          nextState.push(today+"-test-"+i);
        }

        setTimeout(() => {
            this.setState({
                uploadingPic: nextState
            })
        }, 2000);
  
        axios.post(this.props.URLExternal+'/createproduct5', data, {
          onUploadProgress: ProgressEvent =>{
            let dataProgress = Math.round(  ProgressEvent.loaded / ProgressEvent.total * 100 );
            this.setState({
            //   productLoadingModalLabel:  dataProgress + "%",
            //   productLoadingModalLabelPcnt: dataProgress
            })  
          }
        }).then((res)=>{
          console.log(res);
        });
  
      }
  
      onCreateProduct(event){
  
        event.preventDefault(); 
  
        this.setState({
          productLoadingModalLabel: "Loading....",
          fileUploaded: true,
          productHiddenBtn: true
        })
  
  
        let trimDescription = event.target.description.value;
        let replaced = trimDescription.split(' ').join('');
  
        const data = new FormData();
        data.append("description", replaced);
        data.append("price", event.target.price.value);
        data.append("company", event.target.company.value);
        data.append("style", event.target.style.value);
  
        for (let i = 0; i < this.state.images.length; i++) {
          console.log(this.state.images[i]);
          data.append('single-file', this.state.images[i])
        }
  
        let imagesArr = [];
  
        // for (let i = 0; i < this.state.images.length; i++) {  
        //     imagesArr.push(replaced +'-'+ event.target.style.value+'-'+i+'.jpg');
        // }
        for (let i = 0; i < this.state.uploadingPic.length; i++) {  
            imagesArr.push(this.state.uploadingPic[i]+'.jpg');
        }

        let defaultImage

        if(this.state.defaultImage!=''){
            defaultImage = this.state.defaultImage
        }else{
            defaultImage = this.state.uploadingPic[0]
        }
  
        let newProduct = {
  
          "id": Date.now(),
          "description": replaced,
          "price": event.target.price.value,
          "company": event.target.company.value,
          "style": event.target.style.value,  
          "companystyle": event.target.companystyle.value,  
          "category": event.target.category.value,  
          "priceopt": event.target.priceopt.value,  
          "notes": event.target.notes.value,  
          "favorite": false,  
          "hidden": false,  
          "image": defaultImage + '.jpg',
        //   "image": this.state.uploadingPic[0] + '.jpg',
          // "image": replaced +'-'+ event.target.style.value + '-0.jpg',
          "images": imagesArr
        }
      
        axios.post(this.props.URLExternal+'/createproduct', data, {
          onUploadProgress: ProgressEvent =>{
            console.log('Progress ' + Math.round(  ProgressEvent.loaded / ProgressEvent.total * 100 ) + '%');
            let dataProgress = Math.round(  ProgressEvent.loaded / ProgressEvent.total * 100 );
            this.setState({
              productLoadingModalLabel:  dataProgress + "%",
              productLoadingModalLabelPcnt: dataProgress
            })  
            if(dataProgress == 100){
  
              setTimeout(() => {
                
                this.setState({
                  productLoadingModal: true,
                  productLoadingModalLabel: "Image uploaded successfully completed"             
                });
  
              }, 700);
  
              fetch(this.props.URLExternal+'/createproduct3', {
  
                method: 'post',
                headers: API_HEADERS,
                body: JSON.stringify(newProduct)
              })
  
            }
          }
        }).then((res)=>{
          console.log(res);
        });
  
        fetch(this.props.URLExternal+'/createproduct2', {
  
          method: 'post',
          headers: API_HEADERS,
          body: JSON.stringify(newProduct)
        });
  
      }

      onEditDeletePicture(value, data){

        this.setState({
            defaultImage: data
        });

      }


    render() {

        const errors = this.validate(this.state.description, this.state.companystyle, this.state.price);
        // const errors = this.validate(this.state.firstname, this.state.lastname, this.state.email);

        let filteredProductDetect = this.props.products.filter(

            (data, index) => data.description.indexOf(this.state.description) !== -1
        );

        let detectedExist = false

        if(filteredProductDetect.length == 1 ){

            detectedExist = true
        }else{

            detectedExist = false
        }

        let submitButton
        
        if((this.state.description === '')  ){

            submitButton = <Input type="submit" className="btn btn-success" name="image" id="image" placeholder="Image" disabled />
        }else{
            
            submitButton = <Input type="submit" className="btn btn-success" name="image" id="image" placeholder="Image" />
        }



        let showUpload;
        let hiddenBtnCheck;

        if(this.state.fileUploaded){

            // showUpload = <div className="form-group"><label for="formFile" className="form-label mt-4">Default file input example</label><input className="form-control" type="file" multiple name="single-file" id="formFile" onChange={this.props.onCreateProductUpload.bind(this)} /></div>

            // showUpload = <Input type="file" style={{'display':'none'}} multiple name="single-file" id="single-file"  onChange={this.props.onCreateProductUpload.bind(this)} placeholder="Image" />
            showUpload = <div> <Progress value={this.state.productLoadingModalLabelPcnt} /> {this.state.productLoadingModalLabel} </div> 

        }else{
            // showUpload = <Input type="file" multiple name="single-file" id="single-file"  onChange={this.props.onCreateProductUpload.bind(this)} placeholder="Image" />
            showUpload = <input style={{'color':'#c7bfbf','height':'50px'}} className="form-control" type="file" multiple name="single-file" id="formFile" onChange={this.onCreateProductUpload.bind(this)} />

        }

        if(!this.state.productHiddenBtn){

            hiddenBtnCheck = <Input type="submit" className="btn btn-success" name="image" id="image" placeholder="Image" />
        }else{
            
            hiddenBtnCheck = <Input type="submit" className="btn btn-success" name="image" id="image" placeholder="Image" disabled />
        }

        // console.log(this.props.companies);

        let users = this.props.companies;

        // console.log(
        users.sort(function(a, b){
            if(a.description.toLowerCase() < b.description.toLowerCase()) { return -1; }
            if(a.description.toLowerCase() > b.description.toLowerCase()) { return 1; }
            return 0;
        }) 
        // )
        
        let users2 = this.props.styles;

        // console.log(
        users2.sort(function(a, b){
            if(a.description.toLowerCase() < b.description.toLowerCase()) { return -1; }
            if(a.description.toLowerCase() > b.description.toLowerCase()) { return 1; }
            return 0;
        }) 
        // )

        let buttonPlus

        if(this.state.images.length>0){

            buttonPlus = <button className="btn btn-dark" onClick={this.onAddImagePartial.bind(this)}><i className="fa fa-plus"></i></button>
        }else{
                        
            buttonPlus = <button className="btn btn-dark" onClick={this.onAddImagePartial.bind(this)} disabled><i className="fa fa-plus"></i></button>
        }

        
        return(
            <div className="container">
                <Modal isOpen={this.state.productLoadingModal}>
                    <ModalHeader>
                    <p>Message</p>
                    </ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <h5>&nbsp;&nbsp;&nbsp;{this.state.productLoadingModalLabel}</h5>
                        </div>
                    </ModalBody>
                    <ModalFooter>  
                        <div className="col-md-0">
                            <Link className="btn btn-success" to={'/product'}>Go Back</Link>
                        </div>
                        <div className="col-md-offset'2">
                            <button className="btn btn-success" onClick={this.onGotoCreateProduct.bind(this)}>Create Product</button>
                        </div>
                    </ModalFooter>                    
                </Modal>
                <Modal isOpen={this.state.productLoadingModalMessageError}>
                    <ModalHeader>
                    <p>Message</p>
                    </ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <h5>{this.state.productLoadingModalMessageErrorLabel}</h5>
                        </div>
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.newStyleModal} toggle={this.toggleModalStyle}>
                    <ModalHeader>
                    <p>Create a new Style</p>
                    </ModalHeader>
                    <ModalBody>
                        <div className="row">
                                <Form onSubmit={this.props.onCreateStyle.bind(this)}>
                                    <FormGroup row>
                                        <Label for="description" sm={2}>Name</Label>
                                        <Col sm={10}>
                                        <Input type="text" name="description" id="description" placeholder="Name" />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="style" sm={2}>Notes</Label>
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
                    </ModalBody>
                    <ModalFooter>  
                    <button className="btn btn-white" onClick={this.toggleModalStyle} >Close</button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.newCompanyModal} toggle={this.toggleModal}>
                    <ModalHeader>
                    <p>Create a new Company</p>
                    </ModalHeader>
                    <ModalBody>
                        <div className="row">
                                <Form onSubmit={this.props.onCreateCompany.bind(this)}>
                                    <FormGroup row>
                                        <Label for="description" sm={2}>Name</Label>
                                        <Col sm={10}>
                                        <Input type="text" name="description" id="description" placeholder="Name" />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="style" sm={2}>Notes</Label>
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
                    </ModalBody>
                    <ModalFooter>  
                    <button className="btn btn-white" onClick={this.toggleModal} >Close</button>
                    </ModalFooter>
                </Modal>
                <br/>
                <div className="row">
                    <div className="col-md-2">
                        <button className="btn btn-warning" onClick={this.onClickBack.bind(this)}>Back</button>
                    </div>
                    <div className="col-md-10"></div>
                </div>
                <div className="row">
                    <h1>Create New Product</h1>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-4">
                        <div className="row">
                            <img src={this.state.file} style={{'width':'350px','height':'350px'}}/>
                        </div>
                        <div style={{'text-align':'center'}}>
                            <h5>{this.state.fileName}</h5>
                        </div>
                        <div className="row">
                            <div className="col-md-8"></div>
                            <div className="col-md-4">
                                {buttonPlus}
                            </div>
                        </div>
                        <div className="row">
                            {this.state.uploadingPic.map(
                                        (data, index) =>
                                        <div className="col-md-3">
                                            <div className="row">
                                                <button className="btn btn-white">
                                                    {/* <p>{this.props.URLExternal+'/images/'+data+'.jpg'}</p>  */}
                                                    <img src={this.props.URLExternal+'/images/'+data+'.jpg'} height="70px" width="40px"/>
                                                </button>
                                            </div>
                                            <div className="row">
                                                <button className="btn btn-danger" onClick={this.onEditDeletePicture.bind(this, this.state.uploadingPic[0],data)} >Default</button>
                                            </div>
                                        </div>                                         
                            )}
                        </div>                        
                    </div>
                    <div className="col-md-8">
                        <Form onSubmit={this.onCreateProduct.bind(this)} enctype="multipart/form-data" >
                                <FormGroup row>
                                    <Label for="image" sm={2}>Image</Label>
                                    <Col sm={10}>
                                        {showUpload}
                                        {/* <div className="form-group"><label for="formFile" className="form-label mt-4">Default file input example</label><input className="form-control" type="file" multiple name="single-file" id="formFile" onChange={this.props.onCreateProductUpload.bind(this)} /></div> */}
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="description" sm={2}>Style Number</Label>
                                    <Col sm={10}>
                                        <Input type="text" name="description" id="description" placeholder="Style Number" 
                                            onBlur={this.handleBlur('description')}
                                            // valid={this.state.description.length >= 10 }
                                            valid={!detectedExist }
                                            invalid={detectedExist }
                                            // invalid={this.state.description.length < 10 }
                                            onChange={e => this.onDescriptionChange(e.target.value)}
                                            value={this.state.description}  
                                        />
                                        <FormFeedback style={{'text-align':'left'}}>{errors.description}</FormFeedback>                                        
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="exampleSelect" sm={2}>Company</Label>
                                    <Col sm={7}>
                                        <Input type="select" style={{'color':'#c7bfbf','height':'50px'}} name="company" id="company" placeholder="Company Name" onChange={e => this.onCompanyChange(e.target.value)} value={this.state.company} >
                                        {this.props.companies.map( 
                                            (data,index) => <option>{data.description}</option>
                                        )}

                                    </Input>
                                    </Col>
                                    <Label for="exampleSelect" sm={3} style={{'font-size':'12px','text-decoration':'underline','color':'blue'}} onClick={this.openNewCompanyModal.bind(this)}> <i className="fa fa-plus-circle" style={{'color':'blue'}} aria-hidden="true"></i> Create Company</Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="companystyle" sm={2}>Comp Style #</Label>
                                    <Col sm={10}>
                                    <Input type="text" name="companystyle" id="companystyle" placeholder="Company Style Number" 
                                            onBlur={this.handleBlur('companystyle')}
                                            valid={this.state.companystyle.length >= 3 }
                                            invalid={this.state.companystyle.length < 3 }
                                            onChange={e => this.onCompanyStyleChange(e.target.value)}
                                            value={this.state.companystyle}                                                                        
                                    />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="exampleSelect" sm={2}>Category</Label>
                                    <Col sm={10}>
                                        <Input type="select" style={{'color':'#c7bfbf','height':'50px'}} name="category" id="category" placeholder="Category" onChange={e => this.onCategoryChange(e.target.value)} >
                                                <option>{' '}</option>
                                            {this.props.categories.map( 
                                                (data,index) => <option>{data.description}</option>
                                            )}

                                            {/* <option>{' '}</option>
                                            <option>{'Bracelet'}</option>
                                            <option>{'RM'}</option>
                                            <option>{'Rings'}</option>
                                            <option>{'Pendant'}</option>
                                            <option>{'Pins'}</option>
                                            <option>{'Necklace'}</option>
                                            <option>{'Earings'}</option>
                                            <option>{'Watches'}</option> */}
                                    </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="exampleSelect" sm={2}>Style</Label>
                                    <Col sm={8}>
                                        <Input type="select" style={{'color':'#c7bfbf','height':'50px'}} name="style" id="style" placeholder="Style" onChange={e => this.onStyleChange(e.target.value)} >
                                        {this.props.styles.map( 
                                            (data,index) => <option>{data.description}</option>
                                        )}
                                    </Input>
                                    </Col>
                                    <Label for="exampleSelect" sm={2} style={{'font-size':'12px','text-decoration':'underline','color':'blue'}} onClick={this.openNewStyleModal.bind(this)}> <i className="fa fa-plus-circle" style={{'color':'blue'}} aria-hidden="true"></i> Create Style</Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="price" sm={2}>Price</Label>
                                    <Col sm={5}>
                                    <Input type="number" name="price" id="price" placeholder="Price"
                                        onBlur={this.handleBlur('price')}
                                        valid={this.state.price.length >= 3 }
                                        invalid={this.state.price.length < 3 }
                                        onChange={e => this.onPriceChange(e.target.value)}
                                        value={this.state.price}                                                                                                            
                                    />
                                    </Col>
                                    <Col sm={5}>
                                    <Input type="number" name="priceopt" id="priceopt" placeholder="Price Optional" />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="notes" sm={2}>Notes</Label>
                                    <Col sm={10}>
                                    <Input type="textarea" name="notes" id="notes" placeholder="Notes" />
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
                </div>
            </div>    
        )
    }

}

export default CreateProductComponent;
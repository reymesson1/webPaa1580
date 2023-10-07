
import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Input, Media, Panel,   Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter, Col, Form, FormGroup, Label, Progress, Button } from 'reactstrap';

class EditProductComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            newCompanyModal: false,
            newStyleModal: false,
            newLoadingModal: true,
            descriptionValue: "",
            companyValue: "",
            companystyleValue: "",
            priceValue: "",
            priceoptValue: "",
            notesValue: "",
            imagesValue: [],
            productHiddenBtn: true,
            imageHidden: true,
            companyHidden: true,
            companyStyleHidden: true,
            categoryHidden: true,
            styleHidden: true,
            priceHidden: true,
            priceoptHidden: true,
            notesHidden: true
        }
    }

    componentDidMount(){

        let filteredData = this.props.products.filter(
            (data, index) => data.id.indexOf(this.props.match.params.id) !== -1
        );

        if(filteredData.length>0){

            
        this.setState({
            descriptionValue: filteredData[0].description,
            companyValue: filteredData[0].company,
            companystyleValue: filteredData[0].companystyle,
            priceValue: filteredData[0].price,
            priceoptValue: filteredData[0].priceopt,
            notesValue: filteredData[0].notes,
            imagesValue: filteredData[0].images,
        })

        }

        this.props.onEditCloseModal();

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
        // console.log('open modal');
    }
    onChangeDescription(value){
        // console.log(event.target.description.value);
        this.setState({
            descriptionValue: value
        })
                
    }
    onChangeCompanyValue(value){
        // console.log(event.target.description.value);
        this.setState({
            companyValue: value
        })
                
    }
    onChangeCompanyStyleValue(value){
        // console.log(event.target.description.value);
        // console.log(value);
        this.setState({
            companystyleValue: value
        })
                
    }
    onChangePriceValue(value){
        // console.log(event.target.description.value);
        this.setState({
            priceValue: value
        })
                
    }
    onChangePriceOptValue(value){
        // console.log(event.target.description.value);
        this.setState({
            priceoptValue: value
        })      
    }
    onChangeNotesValue(value){
        // console.log(event.target.description.value);
        this.setState({
            notesValue: value
        })      
    }
    onChangeImagesValue(value){
        // console.log(event.target.description.value);
        this.setState({
            imagesValue: value
        })      
    }

    imageClick = (data) => {
        console.log(data);
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

    
    onClickBack(){
        window.history.back();
    }

    onClickCompanyEdit(){

        this.setState({
            companyHidden: !this.state.companyHidden,
            productHiddenBtn: !this.state.productHiddenBtn
        })
    }

    onClickCompanyStyleEdit(){

        this.setState({
            companyStyleHidden: !this.state.companyStyleHidden,
            productHiddenBtn: !this.state.productHiddenBtn
        })
    }

    onClickStyleEdit(){

        this.setState({
            styleHidden: !this.state.styleHidden,
            productHiddenBtn: !this.state.productHiddenBtn
        })
    }

    onClickCategoryEdit(){

        this.setState({
            categoryHidden: !this.state.categoryHidden,
            productHiddenBtn: !this.state.productHiddenBtn
        })
    }

    onClickPriceEdit(){

        this.setState({
            priceHidden: !this.state.priceHidden,
            productHiddenBtn: !this.state.productHiddenBtn
        })
    }

    onClickPriceOptEdit(){

        this.setState({
            priceoptHidden: !this.state.priceoptHidden,
            productHiddenBtn: !this.state.productHiddenBtn
        })
    }

    onClickNotesEdit(){

        this.setState({
            notesHidden: !this.state.notesHidden,
            productHiddenBtn: !this.state.productHiddenBtn
        })
    }

    onClickImageEdit(){

        this.setState({
            imageHidden: !this.state.imageHidden,
            productHiddenBtn: !this.state.productHiddenBtn
        })
    }

    
    render() {

        let showUpload;
        let hiddenBtnCheck;
        let companyHiddenBtn;
        let companyStyleHiddenBtn;
        let categoryHiddenBtn;
        let styleHiddenBtn;
        let priceHiddenBtn;
        let priceoptHiddenBtn;
        let notesHiddenBtn;
        
        // if(this.props.fileUploaded){
        //     showUpload = <Input type="file" style={{'display':'none'}} multiple name="single-file" id="single-file"  onChange={this.props.onCreateProductUpload.bind(this)} placeholder="Image" disabled />
        //     showUpload = <div> <Progress value={this.props.productLoadingModalLabelPcnt} /> {this.props.productLoadingModalLabel} </div> 

        // }else{
        //     // showUpload = <Input type="file" multiple name="single-file" id="single-file"  onChange={this.props.onCreateProductUpload.bind(this)} placeholder="Image" />

        if(this.state.imageHidden){

            showUpload = <input style={{'color':'#c7bfbf','height':'50px'}} className="form-control" type="file" multiple name="single-file" id="formFile" onChange={this.props.onCreateProductUpload.bind(this)} disabled />
        }else{

            showUpload = <input style={{'color':'#c7bfbf','height':'50px'}} className="form-control" type="file" multiple name="single-file" id="formFile" onChange={this.props.onCreateProductUpload.bind(this)} />
        }

        if(!this.state.productHiddenBtn){

            hiddenBtnCheck = <Input type="submit" className="btn btn-success" name="image" id="image" placeholder="Image" />
        }else{
            
            hiddenBtnCheck = <Input type="submit" value="Submit" className="btn btn-success" name="image" id="image" placeholder="Image" disabled />
        }


        let filteredData = this.props.products.filter(

            (data, index) => data.id.indexOf(this.props.match.params.id) !== -1
        );

        if(filteredData.length>0){

            let filteredDataCompany = this.props.companies.filter(

                (data, index) => data.description.indexOf(filteredData[0].company) !== -1
            );
            let filteredDataStyle = this.props.styles.filter(

                (data, index) => data.description.indexOf(filteredData[0].style) !== -1
            );
            let filteredDataCategory = this.props.categories.filter(

                (data, index) => data.description.indexOf(filteredData[0].category) !== -1
            );

            if(this.state.companyHidden){

                companyHiddenBtn = <Input type="select" style={{'color':'#c7bfbf','height':'50px'}} name="company" id="company" placeholder="Company Name" disabled > {filteredDataCompany.map(  (data,index) => <option>{data.description}</option>)}</Input>    
            }else{
                
                companyHiddenBtn = <Input type="select" style={{'color':'#c7bfbf','height':'50px'}} name="company" id="company" placeholder="Company Name" > {this.props.companies.map(  (data,index) => <option>{data.description}</option>)} </Input>    
            }

            if(this.state.companyStyleHidden){

                companyStyleHiddenBtn = <Input type="text" name="companystyle" id="companystyle" placeholder="Company Style Number" onChange={e => this.onChangeCompanyStyleValue(e.target.value)} value={this.state.companystyleValue} disabled/>  
            }else{
                
                companyStyleHiddenBtn = <Input type="text" name="companystyle" id="companystyle" placeholder="Company Style Number" onChange={e => this.onChangeCompanyStyleValue(e.target.value)} value={this.state.companystyleValue}/>  
            }

            if(this.state.categoryHidden){

                categoryHiddenBtn = <Input type="select" style={{'color':'#c7bfbf','height':'50px'}} name="category" id="category" placeholder="Company Name" disabled > {filteredDataCategory.map(  (data,index) => <option>{data.description}</option>)}</Input>    
            }else{
                
                categoryHiddenBtn = <Input type="select" style={{'color':'#c7bfbf','height':'50px'}} name="category" id="category" placeholder="Company Name" > {this.props.categories.map(  (data,index) => <option>{data.description}</option>)} </Input>    
            }

            if(this.state.styleHidden){

                styleHiddenBtn = <Input type="select" style={{'color':'#c7bfbf','height':'50px'}} name="style" id="style" placeholder="Company Name" disabled > {filteredDataStyle.map(  (data,index) => <option>{data.description}</option>)}</Input>    
            }else{
                
                styleHiddenBtn = <Input type="select" style={{'color':'#c7bfbf','height':'50px'}} name="style" id="style" placeholder="Company Name" > {this.props.styles.map(  (data,index) => <option>{data.description}</option>)} </Input>    
            }

            if(this.state.priceHidden){

                priceHiddenBtn = <Input type="number" name="price" id="price" placeholder="Price" onChange={e => this.onChangePriceValue(e.target.value)} value={this.state.priceValue} disabled/>
            }else{   
                             
                priceHiddenBtn = <Input type="number" name="price" id="price" placeholder="Price" onChange={e => this.onChangePriceValue(e.target.value)} value={this.state.priceValue} />  
            }

            if(this.state.priceoptHidden){

                priceoptHiddenBtn = <Input type="number" name="priceopt" id="priceopt" placeholder="Price" onChange={e => this.onChangePriceOptValue(e.target.value)} value={this.state.priceValue} disabled/>
            }else{   

                priceoptHiddenBtn = <Input type="number" name="priceopt" id="priceopt" placeholder="Price" onChange={e => this.onChangePriceOptValue(e.target.value)} value={this.state.priceValue} />  
            }

            if(this.state.notesHidden){

                notesHiddenBtn = <Input type="textarea" name="notes" id="notes" placeholder="Notes" onChange={e => this.onChangeNotesValue(e.target.value)} value={this.state.notesValue} disabled/>
            }else{   

                notesHiddenBtn = <Input type="textarea" name="notes" id="notes" placeholder="Notes" onChange={e => this.onChangeNotesValue(e.target.value)} value={this.state.notesValue} />
            }
        
            
            return(
                <div className="container">
                    <Modal isOpen={this.props.productLoadingModal}>
                        <ModalHeader>
                        <p>Message</p>
                        </ModalHeader>
                        <ModalBody>
                            <div className="row">
                                <h5>&nbsp;&nbsp;&nbsp;{ this.props.productLoadingModalLabel}</h5>
                            </div>
                        </ModalBody>
                        <ModalFooter>  
                            <div className="col-md-12">
                                <button className="btn btn-success" onClick={this.onClickBack.bind(this)}  >Close</button>
                                {/* <Link className="btn btn-success" to={'/product'}>Go Back</Link> */}
                            </div>
                            <div className="col-md-">
                            </div>
                        </ModalFooter>
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
                                    <li onClick={this.onClickBack.bind(this)} className="breadcrumb-item active" style={{'text-decoration':'unset','color':'#007bff','cursor':'pointer'}} aria-current="page">{'Back'}</li>
                                </ol>
                            </nav> */}
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="row">
                                <img src={this.props.URLExternal+'/images/'+filteredData[0].image}/>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-md-8"></div>
                                <div className="col-md-4">
                                    <button className="btn btn-dark" onClick={this.props.onAddImagePartial.bind(this)}><i className="fa fa-plus"></i></button>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-md-8"></div>
                                <div className="col-md-4">
                                    <button className="btn btn-primary" onClick={this.props.defaultImageSelectedFunc.bind(filteredData[0], filteredData[0].id, filteredData[0].image)}>Default</button>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                            {filteredData[0].images.map(
                                        (data, index) =>
                                        <div className="col-md-3">
                                            <div className="row">
                                                <button className="btn btn-white" onClick={this.imageClickEdit.bind(this,filteredData[0],data)}>
                                                    <img src={this.props.URLExternal+"/images/"+data} height="70px" width="40px" />                                                                                
                                                </button>
                                            </div>
                                            <div className="row">
                                                <button className="btn btn-danger" onClick={this.props.onEditDeletePicture.bind(this, filteredData[0],data)} >Delete</button>
                                            </div>
                                        </div>                                         
                            )}
                            </div>
                            <div className="row">
                            {this.props.uploadingPic.map(
                                        (data, index) =>
                                        <div className="col-md-3">
                                            <div className="row">
                                                <button className="btn btn-white" onClick={this.imageClickEdit.bind(this,filteredData[0],data)}>
                                                    <img src={this.props.URLExternal+"/images/"+data+'.jpg'} height="70px" width="40px" />                                                                                
                                                </button>
                                            </div>
                                            <div className="row">
                                                <button className="btn btn-danger" onClick={this.props.onEditDeletePicture.bind(this, filteredData[0],data)} >Delete</button>
                                            </div>
                                        </div>                                         
                            )}
                            </div>
                        </div>
                        <div className="col-md-8">
                        <br/>
                        <br/>
                        <div className="row">
                        </div>
                        {/* <Form onSubmit={this.props.onCreateProductUpload.bind(this)} enctype="multipart/form-data" > */}
                        <Form onSubmit={this.props.onEditProduct.bind(this)} enctype="multipart/form-data" >
                            {/* <Form > */}
                                <FormGroup row>
                                    <Label for="description" sm={2}>&nbsp;</Label>
                                    <Col sm={8}>
                                        {showUpload}
                                    </Col>
                                    <Col sm={2}>
                                        <Button onClick={this.onClickImageEdit.bind(this)} color="danger" ><i className="fa fa-edit" style={{'color':'#ffffff'}} aria-hidden="true"></i></Button>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col sm={10}>
                                    <Input type="text" style={{'display':'none'}} name="id" id="id" placeholder="ID" value={this.props.match.params.id} disabled />
                                    {/* <Input type="text" name="id" id="id" placeholder="ID" value={this.props.match.params.id} disabled /> */}
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="description" sm={2}>Style Number</Label>
                                    <Col sm={10}>
                                    <Input type="text" name="description" id="description" placeholder="Style Number" onChange={e => this.onChangeDescription(e.target.value)} value={this.state.descriptionValue} disabled />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="exampleSelect" sm={2}>Company</Label>
                                    <Col sm={8}>
                                        {companyHiddenBtn}
                                    </Col>
                                    <Col sm={2}>
                                        <Button onClick={this.onClickCompanyEdit.bind(this)} color="danger" ><i className="fa fa-edit" style={{'color':'#ffffff'}} aria-hidden="true"></i></Button>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="companystyle" sm={2}>Comp Style #</Label>
                                    <Col sm={8}>
                                    {/* <Input type="text" name="companystyle" id="companystyle" placeholder="Company Style Number" onChange={e => this.onChangeCompanyValue(e.target.value)} value={this.state.companystyleValue} /> */}
                                    {companyStyleHiddenBtn}
                                    </Col>
                                    <Col sm={2}>
                                            <Button onClick={this.onClickCompanyStyleEdit.bind(this)} color="danger" ><i className="fa fa-edit" style={{'color':'#ffffff'}} aria-hidden="true"></i></Button>
                                        {/* <button className="btn btn-danger" onClick={this.onClickEditDeletePicture.bind(this, filteredData[0],data)} >Edit</button> */}
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="exampleSelect" sm={2}>Category</Label>
                                    <Col sm={8}>
                                        {categoryHiddenBtn}
                                    </Col>
                                    <Col sm={2}>
                                        <Button onClick={this.onClickCategoryEdit.bind(this)} color="danger" ><i className="fa fa-edit" style={{'color':'#ffffff'}} aria-hidden="true"></i></Button>
                                        {/* <button className="btn btn-danger" onClick={this.onClickEditDeletePicture.bind(this, filteredData[0],data)} >Edit</button> */}
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="exampleSelect" sm={2}>Style</Label>
                                    <Col sm={8}>
                                        {styleHiddenBtn}
                                    </Col>
                                    <Col sm={2}>
                                        <Button onClick={this.onClickStyleEdit.bind(this)} color="danger" ><i className="fa fa-edit" style={{'color':'#ffffff'}} aria-hidden="true"></i></Button>
                                        {/* <button className="btn btn-danger" onClick={this.onClickEditDeletePicture.bind(this, filteredData[0],data)} >Edit</button> */}
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="price" sm={2}>Price</Label>
                                    <Col sm={3}>
                                        {priceHiddenBtn}
                                    </Col>
                                    <Col sm={2}>
                                        <Button onClick={this.onClickPriceEdit.bind(this)} color="danger" ><i className="fa fa-edit" style={{'color':'#ffffff'}} aria-hidden="true"></i></Button>
                                        {/* <button className="btn btn-danger">Edit</button> */}
                                        {/* <button className="btn btn-danger" onClick={this.onClickEditDeletePicture.bind(this, filteredData[0],data)} >Edit</button> */}
                                    </Col>
                                    <Col sm={3}>
                                        {priceoptHiddenBtn}
                                    </Col>
                                    <Col sm={2}>
                                    <Button onClick={this.onClickPriceOptEdit.bind(this)} color="danger" ><i className="fa fa-edit" style={{'color':'#ffffff'}} aria-hidden="true"></i></Button>
                                        {/* <button className="btn btn-danger" onClick={this.onClickEditDeletePicture.bind(this, filteredData[0],data)} >Edit</button> */}
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="notes" sm={2}>Notes</Label>
                                    <Col sm={8}>
                                        {notesHiddenBtn}
                                        {/* <Input type="textarea" name="notes" id="notes" placeholder="Notes" onChange={e => this.onChangeNotesValue(e.target.value)} value={this.state.notesValue} /> */}
                                    </Col>
                                    <Col sm={2}>
                                        <Button onClick={this.onClickNotesEdit.bind(this)} color="danger" ><i className="fa fa-edit" style={{'color':'#ffffff'}} aria-hidden="true"></i></Button>
                                        {/* <button className="btn btn-danger">Edit</button> */}
                                        {/* <button className="btn btn-danger" onClick={this.onClickEditDeletePicture.bind(this, filteredData[0],data)} >Edit</button> */}
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col sm={10}>
                                        {/* {notesHiddenBtn} */}
                                    {/* <Input type="textarea" style={{'display':'none'}} name="images" id="images" placeholder="Images" onChange={e => this.onChangeImagesValue(e.target.value)} value={this.state.imagesValue} disabled /> */}
                                    </Col>
                                </FormGroup>
                                <br/>
                                <FormGroup row>
                                    <Label for="style" sm={2}>&nbsp;</Label>
                                    <Col sm={10}>
                                    {/* <Input type="submit" className="btn btn-success" name="image" id="image" placeholder="Image" /> */}
                                    {hiddenBtnCheck}
                                    </Col>
                                </FormGroup>
                            </Form>
                        
                        </div>
                    </div>
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

export default EditProductComponent; 
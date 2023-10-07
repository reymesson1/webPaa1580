import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Input, Media, Panel,   Card, Button,
    CardBody,
    CardTitle,
    CardSubtitle,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter, Col, Form, FormGroup, Label } from 'reactstrap';
var limit = 5;

class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            showModal: false,
            showModalHidden: false,
            description: "",
            price: "",
            style: "",
            company: "",
            limit: 5,
            sequence: 5,
            toDelete: {},
            scrolling: false
        }  
    }

    componentDidMount() {
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
            // console.log('see more')
            // limit += 5;
            // console.log(limit);
            this.onViewMore()
            // let nextState = this.state.limit;
            // nextState+=5;        
            // this.setState({
    
            //     limit: nextState
            // })

        }
    }

    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    }
    toggleModalHidden = () => {
        this.setState({
            showModalHidden: !this.state.showModalHidden
        })
    }

    openEditModal(id){
        this.setState({
            showModal: true
        })

        let filteredData = this.props.products.filter(

            (data, index) => data.id.toLowerCase().indexOf(id.toLowerCase()) !== -1
        );

        this.setState({
            id: filteredData[0].id,
            description: filteredData[0].description,
            price: filteredData[0].price,
            style: filteredData[0].style,
            company: filteredData[0].company,
            category: filteredData[0].category
        })
        
    }

    onChangeField(event){

        this.setState({
            searchText: event.target.value
        })
    }

    onClicked(){
        window.location.href = '/createproduct'
    }

    onViewMore(){
        limit += 5;
    }
    // onViewMore(){
    //     let nextState = this.state.limit;
    //     nextState+=5;        
    //     this.setState({

    //         limit: nextState
    //     })
    // }

    onClickDeleteModal(data){
        // console.log(data.hidden);
        if(!data.hidden){
            this.setState({
                showModalHidden: true,
                toDelete: data
            })
        }else{
            this.setState({
                showModal: true,
                toDelete: data
            })
        }
    }



    render() {

        // console.log(this.state.scrolling);
        var productData  = this.props.products.sort( 
            (a,b) =>{
                if(a.id<b.id){
                    return 1
                }
                if(a.id>b.id){
                    return -1
                }
                return 0
            }
        )

        const result = productData.reduce((temp, value) => {
            if(this.state.searchText==""){
                // if(temp.length<this.state.limit){
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
        // if(result.length>limit){

        //     // showViewMore = <p style={{'text-decoration':'underline','color':'blue','cursor':'pointer'}} onClick={this.onViewMore.bind(this)} > {'View More'} </p>
        //     // showViewMore = <p style={{'text-decoration':'underline','color':'blue','cursor':'pointer'}} onClick={this.onViewMore.bind(this)} > {'View More'} </p>
        //     showViewMore = <Button onClick={this.onViewMore.bind(this)} outline color="primary">See More</Button>

        // }

        let filteredData = result.filter(

            (data, index) => data.description.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1 || data.style.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1 || data.companystyle.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1 || data.category.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1 || data.company.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1 || data.notes.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1
        );

        return(
            <div className="container">
                <Modal isOpen={this.state.showModalHidden} toggle={this.toggleModalHidden}>
                    <ModalHeader >
                        <div className="row">
                                <p>Delete to {this.state.toDelete.description} </p>                                
                        </div>

                    </ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <h5>You should be in unhidden mode to delete this item</h5>
                        </div>
                        <div className="row">
                            <div className="col-md-8"></div>
                            <div className="col-md-3">
                                <button onClick={this.toggleModalHidden} className="btn btn-primary">Close</button>
                            </div>
                            <div className="col-md-1"></div>
                        </div>
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.showModal} toggle={this.toggleModal}>
                    <ModalHeader >
                        <div className="row">
                                <p>Delete to {this.state.toDelete.description} </p>                                
                        </div>

                    </ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <h5>Are you sure you want to delete this item?</h5>
                        </div>
                        <div className="row">
                            <div className="col-md-8"></div>
                            <div className="col-md-2">
                                <button className="btn btn-danger" onClick={this.props.onDeleteProduct.bind(this, this.state.toDelete.id)} >Yes</button>
                            </div>
                            <div className="col-md-2">
                                <button onClick={this.toggleModal} className="btn btn-primary">No</button>
                            </div>
                        </div>
                    </ModalBody>
                </Modal>

                <br/>
                <div className="row">
                    {/* <Input type="text" placeholder="Search" ></Input> */}
                    <Card style={{'width':'100%'}}>
                        <CardBody>
                            {/* <CardTitle tag="h5">Card title</CardTitle> */}
                            {/* <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle> */}
                        </CardBody>
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
                        <Link className="btn btn-success" to={'/createproduct'} style={{'width':'100%'}}  ><i className="fa fa-plus-circle" style={{'color':'#ffffff'}} aria-hidden="true"></i> &nbsp;&nbsp; Create a New Product</Link>
                        {/* <div className="btn btn-dark" onClick={this.onClicked.bind(this)} style={{'width':'100%'}}  >Create a New Product</div> */}
                    </div>
                </div>
                <div className="row">
                <Table>
                <thead>
                    <tr>
                    <th>&nbsp;</th>
                    <th>No.</th>
                    <th>Style Number</th>
                    <th>Price</th>
                    <th>Price Optional</th>
                    <th>Style</th>
                    <th>Company Style Number</th>
                    <th>Category</th>
                    <th>Company</th>
                    <th>Notes</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map(
                        (data, index) => 
                                            <tr>
                                                <td style={{"padding-top":"5%"}} >{index+1}</td>
                                                <td style={{"width":"12%","height":"12%"}}>
                                                    <Link to={'/productdetail/'+data.id}> 
                                                        <img src={this.props.URLExternal+"/images/"+ data.image}  alt="Avatar"/>
                                                        {/* <img src={this.props.URLExternal+"/images/output-"+ data.description +  '-' + data.style + '-0.jpg' }  alt="Avatar" style={{"width":"100%","height":"100%"}}/> */}
                                                    </Link>
                                                </td>
                                                <td style={{"padding-top":"5%"}} >{data.description}</td>
                                                <td style={{"padding-top":"5%"}}>{data.price}</td>
                                                <td style={{"padding-top":"5%"}}>{data.priceopt}</td>
                                                <td style={{"padding-top":"5%"}}>{data.style}</td>
                                                <td style={{"padding-top":"5%"}}>{data.companystyle}</td>
                                                <td style={{"padding-top":"5%"}}>{data.category}</td>
                                                <td style={{"padding-top":"5%"}}>{data.company}</td>
                                                <td style={{"padding-top":"5%"}}>{data.notes}</td>
                                                <td style={{"padding-top":"5%"}}>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            {/* <button className="btn btn-primary" onClick={this.openEditModal.bind(this, data.id)} >Edit</button>                                                         */}
                                                            
                                                            <Link className="btn btn-primary" to={'/editproduct/'+data.id} ><i className="fa fa-edit" style={{'color':'#ffffff'}} aria-hidden="true"></i></Link>                                                        
                                                        </div>
                                                        <div className="col-md-6">
                                                            <button className="btn btn-danger" onClick={this.onClickDeleteModal.bind(this,data)} ><i className="fa fa-trash" style={{'color':'#ffffff'}} aria-hidden="true"></i></button>                                                        
                                                            {/* <button className="btn btn-danger" onClick={this.props.onDeleteProduct.bind(this, data.id)} ><i className="fa fa-trash" style={{'color':'#ffffff'}} aria-hidden="true"></i></button>                                                         */}
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                    )}
                </tbody>
                </Table>
                </div>
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

export default Product; 
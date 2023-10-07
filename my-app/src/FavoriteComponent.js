import React, { Component } from 'react';
import { Button, Col, Form, FormGroup, Label, FormText } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Input, Card,
    CardBody,
    CardTitle,
    CardSubtitle } from 'reactstrap';
import { CardImg, CardText } from 'reactstrap';

const API_HEADERS = {

    'Content-Type':'application/json',
    Authentication: 'any-string-you-like'
  }
  
var limit = 5;

class FavoriteComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterAPI: [],
            products: [],
            limit: 5,
            sequence: 5,
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

    onViewMore(){
        limit += 5;
    }
    
    onFilterSearch(event){

        event.preventDefault();

        var newFilter = {
            
            "company": event.target.company.value,
            "companystyle": event.target.companystyle.value,
            "style": event.target.style.value,
            "price": event.target.price.value,
            "priceopt": event.target.priceopt.value
        }    

        fetch(this.props.URLExternal+'/filterapiui', {

            method: 'post',
            headers: API_HEADERS,
            body: JSON.stringify({newFilter})
        })
        .then((response)=>response.json())
        .then((responseData)=>{
            console.log(responseData);
                this.setState({

                    filterAPI: responseData
                })
        })


    }

    // onViewMore(){
    //     let nextState = this.state.limit;
    //     nextState+=5;        
    //     this.setState({

    //         limit: nextState
    //     })
    // }

    onClickFavoriteToggle(dataImage, dataId){

        let nextState = this.state.products.filter(
  
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
  
        // fetch(API_URL+'/setfavorite', {
  
        //   method: 'post',
        //   headers: API_HEADERS,
        //   body: JSON.stringify(objSelected)
        // })
  
      } 
  
    onClickBack(){
        window.history.back();
    }

    render() {

        let showViewMore

        if(this.props.products.length==limit){

            showViewMore = <p style={{'text-decoration':'underline','color':'blue','cursor':'pointer'}} onClick={this.onViewMore.bind(this)} > {'View More'} </p>
        }

        let filteredData = this.props.products.filter(

            (data, index) => data.favorite === true
        );

        const result = filteredData.reduce((temp, value) => {
            if(temp.length<limit)
            // if(temp.length<this.state.limit)
              temp.push(value);
            return temp;
        }, []);

        const menu = result.map((product, index) => {
            return (
                <div key={product.id} className="col-md-4">
                    <br/>
                    <Card>
                            <Link to={'/productdetail/'+product.id}> 
                                <CardImg top width="100%" src={this.props.URLExternal+"/images/"+ product.image} alt="Card image cap" />
                            </Link>
                            <CardBody>
                            <CardTitle tag="h5">{product.description}</CardTitle>
                            <CardText>{product.category}</CardText>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">{'$ '+product.price}</CardSubtitle>
                            <div className="row">
                                <div className="col-md-4">
                                </div>
                                <div className="col-md-4">
                                    {/* <Button className="btn btn-danger" onClick={this.onClickFavoriteToggle.bind(this,product)} ><i className="fa fa-star" style={{'color':'#ffffff'}} aria-hidden="true"></i></Button> */}
                                </div>
                                <div className="col-md-4">

                                </div>
                            </div>
                            </CardBody>
                        </Card>
                </div>
            )

        })

        
        return(
            <div className="container">
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
                            <li class="breadcrumb-item active" aria-current="page">{'Favorite'}</li>
                        </ol>
                    </nav> */}
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-3">
                        <h1>Favorite</h1>
                    </div>
                    <div className="col-md-9"></div>
                </div>

                {/* <div className="row">
                    <h1>Favorite</h1>
                </div> */}
                <br/>
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                        <div className="row">
                            {menu}
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
                    <div className="col-md-2"></div>
                </div>
            </div>    
        )
    }

}

export default FavoriteComponent;
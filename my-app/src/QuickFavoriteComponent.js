import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Input, Media, Panel,   Card,
    CardBody,
    CardTitle,
    CardSubtitle } from 'reactstrap';
import {CardImg, CardText,Button} from 'reactstrap';

const API_HEADERS = {

    'Content-Type':'application/json',
    Authentication: 'any-string-you-like'
}
   
class QuickFavoriteComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: []
        }  
    }

    onClickFavoriteToggle(dataImage, dataId){

        console.log(dataImage.id)
        console.log(this.props.product);
        let nextState = [];
        
        nextState.push(this.props.product);
        // let nextState = this.props.products.filter(
  
        //   (data, index) => data.id.indexOf(dataImage.id) !== -1
        // );
        
        nextState[0].favorite = !nextState[0].favorite
        
        this.setState({
          products: nextState
        })
  
        let objSelected = {
          "productId": dataImage.id,
          "favorite": nextState[0].favorite,
        }

        // console.log(objSelected);
        fetch(this.props.URLExternal+'/setfavorite', {
  
          method: 'post',
          headers: API_HEADERS,
          body: JSON.stringify(objSelected)
        })
  
    }



    render() {

        let favorite

        if(this.props.product.favorite){

            favorite = <Button className="btn btn-danger" onClick={this.onClickFavoriteToggle.bind(this,this.props.product)} ><i className="fa fa-star" style={{'color':'#ffffff'}} aria-hidden="true"></i></Button>
        }else{
            
            favorite = <Button className="btn btn-primary" onClick={this.onClickFavoriteToggle.bind(this,this.props.product)} ><i className="fa fa-star" style={{'color':'#ffffff'}} aria-hidden="true"></i></Button>
        }
        
        return(
            <div>
                {favorite}
            </div>
        );
    }

}

export default QuickFavoriteComponent; 
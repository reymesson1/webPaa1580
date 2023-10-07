import React, { Component } from 'react';
import { Media } from 'reactstrap';
import { AddToCart } from './AddToCartComponent';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Button, ButtonGroup } from 'reactstrap';

class BreadcrumbComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        
        return(
            <div>
                <br/>
                <div className="row">
                    <div className="col-md-1">
                        <h1>
                            <i className="fa fa-bars" style={{'color':'#aaafaf'}} aria-hidden="true"></i>
                        </h1>
                    </div>
                    <div className="col-md-6">
                    <Breadcrumb tag="nav" listTag="div">
                        <BreadcrumbItem tag="a" href="#">Home</BreadcrumbItem>
                        <BreadcrumbItem tag="a" href="#">Browse</BreadcrumbItem>
                    </Breadcrumb>
                    </div>
                    <div className="col-md-2"></div>
                    <div className="col-md-3">
                    <Breadcrumb tag="nav" listTag="div">
                        <div tag="a" href="#">Sort By: &nbsp;
                        <ButtonGroup>
                            <Button color="primary" onClick={this.props.newestClicked.bind(this)} >Newest</Button>
                            <Button onClick={this.props.oldestClicked.bind(this)} >Oldest</Button>
                        </ButtonGroup>
                        </div>
                    </Breadcrumb>
                    </div>
                </div>
            </div>
        );
    }

}

export default BreadcrumbComponent;
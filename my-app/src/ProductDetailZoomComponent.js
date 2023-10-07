import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProductDetailZoomComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            backgroundImage: `url(${this.props.URLExternal+'"/images/"+ '+ this.props.match.params.id})`,
            backgroundPosition: '0% 0%',
            src: this.props.URLExternal+"/images/"+ this.props.match.params.id
        }
    }

    componentDidMount(){
        this.setState({
            id: this.props.match.params.id,
            backgroundImage: `url(${this.props.URLExternal+"/images/"+ this.props.match.params.id})`,
        });


    }

    handleMouseMove = e => {
        const { left, top, width, height } = e.target.getBoundingClientRect()
        const x = (e.pageX - left) / width * 100
        const y = (e.pageY - top) / height * 100
        this.setState({ backgroundPosition: `${x}% ${y}%` })
    }    

    onClickBack(){
        window.history.back();
    }

    render() {

        let filterData = this.props.products.filter(

            (data, index) => data.image.indexOf(this.props.match.params.id) !== -1 
        );

        
        return(
            <div className="container">                
                <br/>
                <br/>
                <div className="row">
                        <div className="col-md-2">
                            <button className="btn btn-warning" onClick={this.onClickBack.bind(this)}>Back</button>
                        </div>
                        <div className="col-md-10"></div>
                </div>
                <br/>
                <div className="row">
                    <h1>Product Detail Zoom</h1>
                </div>
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                        <div className="card" style={{'margin':'5%'}}>
                            <div className="row">
                                <div className="col-md-7">
                                    <figure onMouseMove={this.handleMouseMove} style={this.state}>
                                        <img src={this.state.src} alt="Avatar" style={{"width":"100%","height":"100%"}} />
                                    </figure>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2"></div>
                </div>
            </div>
        );
    }

}

export default ProductDetailZoomComponent; 
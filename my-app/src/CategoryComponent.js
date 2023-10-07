import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Input, Media, Panel,   Card,
    CardBody,
    CardTitle,
    CardSubtitle, Button } from 'reactstrap';
import { Redirect } from 'react-router';

class CategoryComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: ""
        }  

        
    }

    handleOnClickFilter = () => {
        // some action...
        // then redirect
        this.setState({filter: true});
    }

    handleOnClickFavorite = () => {
        // some action...
        // then redirect
        this.setState({favorite: true});
    }

    handleOnClickBracelet = () => {
        // some action...
        // then redirect
        this.setState({bracelet: true});
    }

    handleOnClickRM = () => {
        // some action...
        // then redirect
        this.setState({rm: true});
    }
      
    handleOnClickRings = () => {
        // some action...
        // then redirect
        this.setState({rings: true});
    }

    handleOnClickPendant = () => {
        // some action...
        // then redirect
        this.setState({pendant: true});
    }

    handleOnClickPins = () => {
        // some action...
        // then redirect
        this.setState({pins: true});
    }

    handleOnClickNecklace = () => {
        // some action...
        // then redirect
        this.setState({necklace: true});
    }
      
    handleOnClickEarings = () => {
        // some action...
        // then redirect
        this.setState({earings: true});
    }
      
    handleOnClickWatches = () => {
        // some action...
        // then redirect
        this.setState({watches: true});
    }
      
    

    onChangeField(event){

        this.setState({
            searchText: event.target.value
        })
    }

    render() {

        if (this.state.filter) {
            return <Redirect push to="/filter" />;
        }
        
        if (this.state.favorite) {
            return <Redirect push to="/favorite" />;
        }

        if (this.state.bracelet) {
            return <Redirect push to="/home/bracelet" />;
        }

        if (this.state.rm) {
            return <Redirect push to="/home/rm" />;
        }

        if (this.state.rings) {
            return <Redirect push to="/home/rings" />;
        }

        if (this.state.pendant) {
            return <Redirect push to="/home/pendant" />;
        }

        if (this.state.pins) {
            return <Redirect push to="/home/pins" />;
        }

        if (this.state.necklace) {
            return <Redirect push to="/home/necklace" />;
        }

        if (this.state.earings) {
            return <Redirect push to="/home/earings" />;
        }

        if (this.state.watches) {
            return <Redirect push to="/home/watches" />;
        }
        
        
        return(
            <div className="container">
                <br/>
                <div className="row">
                    <div className="col-md-1">
                    <Button outline onClick={this.handleOnClickFilter} color="primary"><i className="fa fa-filter" style={{'color':'blue'}} aria-hidden="true"></i></Button>{' '}
                        <Link to={'/filter'}> 
                        </Link>
                    </div>
                    &nbsp;|
                    <div className="col-md-1">
                        <Button outline onClick={this.handleOnClickFavorite}  color="danger"><i className="fa fa-star" style={{'color':'red'}} aria-hidden="true"></i> </Button>{' '}
                    </div>
                    <div className="col-md-10"></div>
                </div>
                {/* <br/> */}
                {/* <div className="row">
                    <div className="col-md-3">
                        <Link to={'/home/bracelet'}> 
                            <img src={this.props.URLExternal+"/images/folder-bracelets.jpg"} style={{"position":"relative"}}  alt="Avatar"/>
                        </Link>
                        <Button style={{"position":"absolute", "top":"87%", "margin-left":"-20%"}} outline onClick={this.handleOnClickBracelet} color="info">
                            {'Bracelet'}
                        </Button>{' '}
                    </div>
                    <div className="col-md-3">
                        <Link to={'/home/rm'}> 
                            <img src={this.props.URLExternal+"/images/folder-rm.jpg"} style={{"position":"relative"}}  alt="Avatar"/>
                        </Link>
                        <Button style={{"position":"absolute", "top":"87%", "margin-left":"-12%"}} outline onClick={this.handleOnClickRM} color="info">
                            {'RM'}
                        </Button>{' '}
                    </div>
                    <div className="col-md-3">
                        <Link to={'/home/rings'}> 
                            <img src={this.props.URLExternal+"/images/folder-rings.jpg"} style={{"position":"relative"}}  alt="Avatar"/>
                        </Link>
                        <Button style={{"position":"absolute", "top":"87%", "margin-left":"-12%"}} outline onClick={this.handleOnClickRings} color="info">
                            {'Rings'}
                        </Button>{' '}
                    </div>
                    <div className="col-md-3">
                        <Link to={'/home/pendant'}> 
                            <img src={this.props.URLExternal+"/images/folder-pendant.jpg"} style={{"position":"relative"}}  alt="Avatar"/>
                        </Link>
                        <Button style={{"position":"absolute", "top":"87%", "margin-left":"-20%"}} outline onClick={this.handleOnClickPendant} color="info">
                            {'Pendant'}
                        </Button>{' '}
                    </div>
                </div> */}
                <br/>
                <div className="row">

                    {this.props.categories.map(
                                (data, index) => 
                                    <div className="col-md-3" style={{'margin-bottom':'23px'}}>
                                        <Link to={'/home/'+data.description.toLowerCase()}>
                                            <img src={this.props.URLExternal+"/images/"+data.image+".jpg"} style={{"position":"relative"}}  alt="Avatar"/>
                                        </Link>
                                        <Button style={{"position":"absolute","top":"87%","margin-left":"-18%"}} outline onClick={this.handleOnClickBracelet} color="info">
                                            {data.description}
                                        </Button>{' '}

                                    </div>
                    )}

                    {/* <div className="col-md-3">
                        <Link to={'/home/pins'}> 
                            <img src={this.props.URLExternal+"/images/folder-pins.png"} style={{"position":"relative"}}  alt="Avatar"/>
                        </Link>
                        <Button style={{"position":"absolute","top":"87%","margin-left":"-12%"}} outline onClick={this.handleOnClickPins} color="info">
                            {'Pins'}
                        </Button>{' '}
                    </div>
                    <div className="col-md-3">
                        <Link to={'/home/necklace'}> 
                            <img src={this.props.URLExternal+"/images/folder-necklace.jpg"} style={{"position":"relative"}}  alt="Avatar"/>
                        </Link>
                        <Button style={{"position":"absolute","top":"87%","margin-left":"-20%"}} outline onClick={this.handleOnClickNecklace} color="info">
                            {'Necklace'}
                        </Button>{' '}
                    </div>
                    <div className="col-md-3">
                        <Link to={'/home/earings'}> 
                            <img src={this.props.URLExternal+"/images/folder-earrings.jpg"} style={{"position":"relative"}}  alt="Avatar"/>
                        </Link>
                        <Button style={{"position":"absolute","top":"87%","margin-left":"-20%"}} outline onClick={this.handleOnClickEarings} color="info">
                            {'Earings'}
                        </Button>{' '}
                    </div>
                    <div className="col-md-3">
                        <Link to={'/home/watches'}> 
                            <img src={this.props.URLExternal+"/images/folder-watches.jpg"} style={{"position":"relative"}}  alt="Avatar"/>
                        </Link>
                        <Button style={{"position":"absolute","top":"87%","margin-left":"-20%"}} outline onClick={this.handleOnClickWatches} color="info">
                            {'Watches'}
                        </Button>{' '}
                    </div> */}
                </div>
            </div>
        );
    }

}

export default CategoryComponent; 
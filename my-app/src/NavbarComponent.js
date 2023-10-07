import React, { useState, Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { ButtonToggle ,CustomInput,Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Table, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import { ButtonDropdown } from 'reactstrap';
import QuickSearchComponent  from './QuickSearchComponent';

// function NavbarComponent(props) {
class NavbarComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
            cachingIcon: false
        }
    }

    componentDidMount(){

        setTimeout(() => {
            this.setState({

                cachingIcon: true
            })
        }, 2000);
    }

    
    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        })
    }

    onLogout(){

        localStorage.removeItem("token");
        window.location.reload();
    }

    
    render(){

    let onHiddenMode

    if(this.props.onHiddenMode){

        onHiddenMode = <button className="btn btn-outline-light" onClick={this.props.onHiddenApp.bind(this)}  ><i className="fa fa-eye" style={{'color':'#007bff','text-decoration':'none !important'}} aria-hidden="true"></i>&nbsp;&nbsp;Hidden Mode</button>
    }else{

        onHiddenMode = <button className="btn btn-outline-light" onClick={this.props.onHiddenApp.bind(this)}  ><i className="fa fa-eye-slash" style={{'color':'#007bff', 'text-decoration':'none !important'}} aria-hidden="true"></i>&nbsp;&nbsp;Hidden Mode</button>
    }

    let userIcon

    if(this.state.cachingIcon){
        
        userIcon =  <i className="fa fa-user" style={{'color':'#ffffff'}} aria-hidden="true"></i>
    }else{

        userIcon =  <i className="fa fa-user" style={{'color':'#aaafaf'}} aria-hidden="true"></i>
    }

    return(
        <div style={{'box-shadow': '0 0 10px #000','z-index':1}}>
            {/* <Navbar> */}
            {/* <Navbar style={{'background-color':'#0c343d','height':'150px','color':'#000000'}}> */}
            <Navbar style={{'height':'150px','color':'#000000'}}>
                <div className="col-md-3">
                    <div style={{'color':'#ffffff', 'font-size':'36px'}} href="/"> Amsel </div>
                    <div style={{'color':'#ef8d09', 'font-size':'16px'}} href="/"> eCatalog </div>
                </div>
                <div className="col-md-5">
                    {/* <Input type="text" onChange={props.search.bind(this)} placeholder="Seach" /> */}
                    <div className="row">
                        <h1>&nbsp;</h1>
                    </div>
                    <div className="row">
                        <Nav>
                            <NavItem>
                                <Link to={'/'} style={{ textDecoration: 'none' }}>                                
                                    <NavLink style={{'color':'#ef8d09','text-decoration':'none !important'}}>Browse</NavLink>
                                </Link>
                                {/* <NavLink style={{'color':'#ef8d09'}} href="/">Browse</NavLink> */}
                            </NavItem>
                            <NavItem>
                                {/* <Link to={'/'} > */}
                                    <NavLink style={{'color':'#ef8d09'}} >|</NavLink>
                                {/* </Link> */}
                            </NavItem>
                            <NavItem>
                                <Link to={'/product'} style={{ textDecoration: 'none' }} >
                                    <NavLink style={{'color':'#aaafaf'}} >Products</NavLink>
                                    {/* <NavLink style={{'color':'#aaafaf'}} href="/product/">Products</NavLink> */}
                                </Link>
                            </NavItem>
                            <NavItem>
                                <NavLink style={{'color':'#ef8d09'}} >|</NavLink>
                            </NavItem>
                            <NavItem>
                                <Link to={'/companies'} style={{ textDecoration: 'none' }}>
                                    {/* <NavLink style={{'color':'#aaafaf'}} href="/companies/">Companies</NavLink> */}
                                    <NavLink style={{'color':'#aaafaf'}}>Companies</NavLink>
                                </Link>
                            </NavItem>
                            <NavItem>
                                <NavLink style={{'color':'#ef8d09'}} >|</NavLink>
                            </NavItem>
                            <NavItem>
                                <Link to={'/styles'} style={{ textDecoration: 'none' }}>
                                    <NavLink style={{'color':'#aaafaf'}}>Styles</NavLink>
                                    {/* <NavLink style={{'color':'#aaafaf'}} href="/styles/">Styles</NavLink> */}
                                </Link>
                            </NavItem>
                        </Nav>
                    </div>
                </div>
                <br/>
                <div className="col-md-3">
                    <QuickSearchComponent
                        products={this.props.products}
                        URLExternal={this.props.URLExternal}
                        onChangeValue={this.props.onChangeValue.bind(this)}
                        dropdownOpenQS={this.props.dropdownOpenQS}
                        searchTextQS={this.props.searchTextQS}
                        closeDropdownQS={this.props.closeDropdownQS.bind(this)}
                                />
                </div>
                <div className="col-md-1">
                    <div className="row" >
                    <ButtonDropdown style={{'background-color':'#0c343d !important','width':'1%'}} isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle caret>
                        {userIcon}
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem header>
                            {onHiddenMode}
                        </DropdownItem>
                        <DropdownItem>
                            <Link className="btn btn-info" to={'/user'}><i className="fa fa-user-circle" style={{'color':'#ffffff'}} aria-hidden="true"></i> &nbsp;User Account</Link>
                        </DropdownItem>
                        <DropdownItem>
                            <Link className="btn btn-danger" to={'/category'}><i className="fa fa-list" style={{'color':'#ffffff'}} aria-hidden="true"></i> &nbsp;Category</Link>
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>
                            <button className="btn btn-primary" onClick={this.onLogout.bind(this)} ><i className="fa fa-sign-out" style={{'color':'#ffffff'}} aria-hidden="true"></i> &nbsp;Log out </button>
                            {/* <Link className="btn btn-primary" to={'/user'}><i className="fa fa-user-circle" style={{'color':'#ffffff'}} aria-hidden="true"></i> &nbsp;User Account</Link> */}
                        </DropdownItem>
                    </DropdownMenu>
                    </ButtonDropdown>
                    </div>


                    {/* <div className="row">
                        <CustomInput onChange={this.props.onHiddenApp.bind(this)} type="switch" id="exampleCustomSwitch" checked={this.props.onHiddenMode} name="customSwitch" label="Hidden Mode" />
                    </div>
                    <div className="row">
                        <Link to={'/user'}>User</Link>
                    </div> */}
                </div>
            </Navbar>
        </div>
    );
    }
}



export default NavbarComponent;
import React, { Component } from 'react';

import LeftMenu from './LeftMenu.react.js';
import Products from './Products.react';
import BucketInfo from './BucketInfo.react';

import { connect } from 'react-redux';
import * as bucketActions from '../../actions/bucketActions';
import * as attributesActions from '../../actions/attributesActions';
import * as productsActions from '../../actions/productsActions';
import { Navbar, Nav, NavItem, Col } from 'react-bootstrap';

class Shop extends Component {

    componentWillMount() {
        this.props.getBucketForVisitor(this.props.routeParams);
    }

    componentWillReceiveProps(nextProps) {
        if (Object.keys(nextProps.bucket).length !== 0) {
            this.props.getProducts();
            this.props.getAttributes();
        }
    }

    render() {
        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">BLOOMDO</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem eventKey={1} href="#">Kontakta oss</NavItem>
                        </Nav>
                        <Nav pullRight>
                            <NavItem eventKey={2} href="#">Nyheter</NavItem>
                            <NavItem eventKey={2} href="#">Vanliga frågor</NavItem>
                            <NavItem eventKey={1} href="#">Logga in (Florister)</NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Col xs={12} md={2}>
                    <LeftMenu />
                </Col>
                <Col xs={12} md={10}>
                    <Col xs={12} md={12}>
                        <BucketInfo location={this.props.routeParams.label}/>
                    </Col>
                    <Col xs={12} md={12}>
                        <Products />
                    </Col>
                </Col>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        bucket: state.bucket
    };
}
function mapDispatchToProps(dispatch) {
    return {
        getBucketForVisitor: (lat, long) => dispatch(bucketActions.getBucketForVisitor(lat, long)),
        getProducts: () => dispatch(productsActions.getProducts()),
        getAttributes: () => dispatch(attributesActions.getAttributes())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Shop);
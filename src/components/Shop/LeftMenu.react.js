import React, { Component } from 'react';
import { } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as filterActions from '../../actions/filterActions';
import Checkbox from 'material-ui/Checkbox';
import CircularProgress from 'material-ui/CircularProgress';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';


class LeftMenu extends Component {

    render() {

        let mappedPriceMenu, mappedColorMenu, mappedTypeMenu, mappedEventMenu;

        if (this.props.attributes.colours) {
            mappedPriceMenu = (
                <div style={{width: '150px'}}>
                    <Slider range defaultValue={[0, 2000]} min={0} max={2000} step={10} onAfterChange={(value) => this.props.updateFilterPriceRange(value)} />
                </div>
            );
            mappedColorMenu = Object.keys(this.props.attributes.colours).map( (colour, index) => {
                return ( <Checkbox key={index} label={colour} onCheck={(e, checked)=>this.props.updateFilterColours(colour, checked)}/> )
            });
            mappedTypeMenu = Object.keys(this.props.attributes.types).map( (type, index) => {
                return ( <Checkbox key={index} label={type} onCheck={(e, checked)=>this.props.updateFilterTypes(type, checked)}/> )
            });
            mappedEventMenu = Object.keys(this.props.attributes.events).map( (event, index) => {
                return ( <Checkbox key={index} label={event} onCheck={(e, checked)=>this.props.updateFilterEvents(event, checked)}/> )
            });
        } else {
            mappedPriceMenu = (
                <CircularProgress style={{marginTop:'10px'}}/>
            );
            mappedColorMenu = (
                <CircularProgress style={{marginTop:'10px'}}/>
            );
            mappedTypeMenu = (
                <CircularProgress style={{marginTop:'10px'}}/>
            );
            mappedEventMenu = (
                <CircularProgress style={{marginTop:'10px'}}/>
            );
        }

        return (
            <div style={{fontSize:'11px'}}>
                <h5 style={{fontSize:'11px', marginLeft:'3px', fontWeight:'bold'}}>Pris</h5>
                {mappedPriceMenu}
                <h5 style={{fontSize:'11px', marginLeft:'3px', fontWeight:'bold'}}>Typ</h5>
                {mappedTypeMenu}
                <h5 style={{fontSize:'11px', marginLeft:'3px', fontWeight:'bold'}}>Event</h5>
                {mappedEventMenu}
                <h5 style={{fontSize:'11px', marginLeft:'3px', fontWeight:'bold'}}>Färg</h5>
                {mappedColorMenu}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        attributes: state.attributes,
        filter: state.filter
    };
}
function mapDispatchToProps(dispatch) {
    return {
        updateFilterColours: (value, checked) => dispatch(filterActions.updateFilterColours(value, checked)),
        updateFilterTypes: (value, checked) => dispatch(filterActions.updateFilterTypes(value, checked)),
        updateFilterEvents: (value, checked) => dispatch(filterActions.updateFilterEvents(value, checked)),
        updateFilterPriceRange: (value) => dispatch(filterActions.updateFilterPriceRange(value))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu);
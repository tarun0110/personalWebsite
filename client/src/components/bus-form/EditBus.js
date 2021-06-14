import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editBus } from '../../actions/searchBus';
import { getBus } from '../../actions/searchBus';

const EditBus = ({ editBus, getBus,match,bus:{bus, loading} }) => {
    
    const [formData, setFormData] = useState({
        company: '',
        location_from: '',
        location_to: '',
        date: '',
        departure: '',
        journeyTime: 0,
        fare: 0,
        seats: 0,
        booked: [],
    });
    useEffect(() => {
        getBus(match.params.id);
        setFormData({
            company: loading || !bus.company ? '': bus.company,
            location_from: loading || !bus.location_from ? '': bus.location_from,
            location_to: loading ||!bus.location_to ? '': bus.location_to,
            date: loading ||!bus.date ? '': bus.date,
            departure: loading ||!bus.departure ? '': bus.departure,
            journeyTime: loading ||!bus.journeyTime ? '': bus.journeyTime,
            fare: loading ||!bus.fare ? '': bus.fare,
            seats: loading ||!bus.seats ? '': bus.seats,
            // booked: !bus.date ? '': bus.date,
        })
    },[loading, getBus, match.params.id])

    const {
        company,
        location_from,
        location_to,
        date,
        departure,
        journeyTime,
        fare,
        seats,
        booked,
    } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        editBus(localStorage.busId, formData);
    };

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;

    return (
        <Fragment>
            <h1 class='large text-primary'>Edit bus details...</h1>
            <form className='form' onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Company'
                        name='company'
                        value={company}
                        onChange={e => onChange(e)}
                        
                    />
                    <small className='form-text'>
                        Bus manufacturing company name
                    </small>
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='STARTING POINT'
                        name='location_from'
                        value={location_from}
                        onChange={e => onChange(e)}
                    />
                    <small className='form-text'>
                        Please use lower case letters only
                    </small>
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='DESTINATION'
                        name='location_to'
                        value={location_to}
                        onChange={e => onChange(e)}
                    />
                    <small className='form-text'>
                        Please use lower case letters only
                    </small>
                </div>
                <div className='form-group'>
                    <input
                        type='date'
                        placeholder='DATE'
                        name='date'
                        value={date}
                        min={today}
                        onChange={e => onChange(e)}
                        
                    />
                </div>
                <div className='form-group'>
                    <label>Departure time</label>
                    <input
                        type='time'
                        placeholder='DEPARTURE TIME'
                        name='departure'
                        value={departure}
                        onChange={e => onChange(e)}
                        
                    />
                </div>
                <div className='form-group'>
                    <label>Expected journey time :</label>
                    <input
                        type='number'
                        placeholder='journey time'
                        name='journeyTime'
                        value={journeyTime}
                        onChange={e => onChange(e)}
                        
                    />
                    <small>in hrs</small>
                </div>
                <div className='form-group'>
                    <label> Fair </label>

                    <input
                        type='number'
                        placeholder='FARE'
                        name='fare'
                        value={fare}
                        onChange={e => onChange(e)}
                        
                    />
                </div>
                <div className='form-group'>
                    <label>
                        {' '}
                        Seats Available <br></br>{' '}
                    </label>
                    <input
                        type='number'
                        placeholder='Available seats'
                        name='seats'
                        value={seats}
                        onChange={e => onChange(e)}
                        
                    />
                </div>
                <input type='submit' className='btn btn-primary my-1' />
                <Link className='btn btn-light my-1' to='/allBuses'>
                    Go Back
                </Link>
            </form>
        </Fragment>
    );
};

EditBus.propTypes = {
    editBus: PropTypes.func.isRequired,
    getBus: PropTypes.func.isRequired,
    bus: PropTypes.object.isRequired,
};

const mapStateToProps = state =>({
    bus: state.searchBus
});

export default connect(mapStateToProps, { editBus, getBus })(EditBus);

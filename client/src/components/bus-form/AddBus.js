import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addBus } from '../../actions/searchBus';

const AddBus = ({ addBus }) => {
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
        addBus(formData);
    };

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;

    return (
        <Fragment>
            <h1 class='large text-primary'>Add a new bus...</h1>
            <form className='form' onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Company'
                        name='company'
                        value={company}
                        onChange={e => onChange(e)}
                        required
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
                        required
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
                        required
                    />
                    <small className='form-text'>
                        Please use lower case letters only
                    </small>
                </div>
                <div className='form-group'>
                    <label>Date of departure </label>
                    <input
                        type='date'
                        placeholder='DATE'
                        name='date'
                        value={date}
                        min={today}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Departure time </label>
                    <input
                        type='time'
                        placeholder='DEPARTURE TIME'
                        name='departure'
                        value={departure}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Expected Journey Time : </label>
                    <br></br>
                    <input
                        type='number'
                        placeholder='hours'
                        name='journeyTime'
                        value={journeyTime}
                        onChange={e => onChange(e)}
                        required
                    />
                    <small>in hours</small>
                </div>
                <div className='form-group'>
                    <label>Fare </label>

                    <input
                        type='number'
                        placeholder='FARE'
                        name='fare'
                        value={fare}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Seats Available </label>

                    <input
                        type='number'
                        placeholder='Available seats'
                        name='seats'
                        value={seats}
                        onChange={e => onChange(e)}
                        required
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

AddBus.propTypes = {
    addBus: PropTypes.func.isRequired,
};

export default connect(null, { addBus })(AddBus);

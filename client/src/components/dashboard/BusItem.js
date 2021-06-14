import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addBooking } from '../../actions/auth';
import Spinner from '../layout/Spinner';
import { withRouter } from 'react-router-dom';

const BusItem = ({
    bus: {
        _id,
        company,
        location_from,
        location_to,
        date,
        departure,
        journeyTime,
        fare,
        seats,
        booked,
    },
    addBooking,
    auth: { loading },
    history,
}) => {
    const [s, setSeatCount] = useState(seats - booked.length);

    const [formData, setFormData] = useState({
        seatsBooked: 0,
    });

    const { seatsBooked } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        if (seatsBooked <= 0) {
            alert('Please enter valid number of seats');
        } else {
            if (seatsBooked <= s) setSeatCount(s - seatsBooked);
            addBooking(_id, formData, history);
            // <Redirect to='/ticket' />;
        }
    };

    var newDate = '';
    var tmp = date.split('-');
    newDate = tmp[2] + '/' + tmp[1] + '/' + tmp[0];

    return (
        <Fragment>
            <div className='container'>
                <div class='table-responsive'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Company</th>
                                <th>Departure Place</th>
                                <th>
                                    Departure Date
                                    <br />
                                    <small>dd/mm/yyyy</small>
                                </th>
                                <th>Departure Time</th>
                                <th>Arrival Place</th>
                                <th>Journey Time</th>

                                <th>
                                    Fare {'('}INR{')'}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{company}</td>
                                <td>{location_from}</td>
                                <td>{newDate}</td>
                                <td>{departure}</td>
                                <td>{location_to}</td>
                                <td>
                                    {journeyTime}
                                    {' hours'}
                                </td>

                                <td>{fare}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <span>Seats available : {s > 0 ? s : 0} </span>
                <br></br>
                {!loading ? (
                    <Fragment>
                        <form className='form' onSubmit={e => onSubmit(e)}>
                            <div className='form-group'>
                                <input
                                    type='number'
                                    name='seatsBooked'
                                    value={seatsBooked}
                                    onChange={e => onChange(e)}
                                />
                                <small className='form-text'>
                                    Enter the number of seats you want to book.
                                </small>
                            </div>
                            <div className='form-group'>
                                <input
                                    className='btn btn-danger'
                                    type='submit'
                                    placeholder='BOOK NOW'
                                    name='book'
                                    value='BOOK NOW'
                                />
                            </div>
                        </form>
                    </Fragment>
                ) : (
                    <Spinner />
                )}
            </div>
        </Fragment>
    );
};

BusItem.propTypes = {
    addBooking: PropTypes.func.isRequired,
    bus: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { addBooking })(withRouter(BusItem));

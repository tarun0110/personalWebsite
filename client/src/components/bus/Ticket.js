import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import ReactTOPdf from 'react-to-pdf';

const ref = React.createRef();

const Ticket = ({
    auth: {
        user: { name, bookings },
    },
}) => {
    const {
        bus,
        busCompany,
        seats,
        from,
        to,
        dateOfDeparture,
        timeOfDeparture,
        journeyTime,
        firstSeat,
        dateOfBooking,
    } = bookings[0];

    const lastSeat = firstSeat + seats - 1;

    return (
        <Fragment>
            <h1>Hello {name}, Your booking has been successfully done!</h1>
            <br></br>
            <h2 className='m-2 p-3'>YOUR TICKET DETAILS</h2>
            <div className='ticket_details m-2 div-border p-3' ref={ref}>
                <p className='lead'>
                    BUS ID: <b>{bus}</b>
                </p>
                <p className='lead'>
                    PASSENGAR NAME: <b>{name}</b>
                </p>
                <p className='lead'>
                    BUS COMPANY: <b>{busCompany}</b>
                </p>
                <p className='lead'>
                    JOURNEY FROM: <b>{from}</b>
                </p>
                <p className='lead'>
                    JOURNEY TO: <b>{to}</b>
                </p>
                <p className='lead'>
                    EXPECTED DURATION:{' '}
                    <b>
                        {journeyTime}
                        {' hours'}
                    </b>
                </p>
                <p className='lead'>
                    DATE OF DEPARTURE:{' '}
                    <b>
                        <Moment format='DD/MM/YYYY'>{dateOfDeparture}</Moment>
                    </b>
                </p>
                <p className='lead'>
                    TIME OF DEPARTURE:{' '}
                    <b>
                        {timeOfDeparture}
                        {' HRS'}
                    </b>
                </p>
                <p className='lead'>
                    SEATS BOOKED: <b>{seats}</b>
                </p>
                <p className='lead'>
                    SEATS ASSIGNED :{' '}
                    <b>
                        {firstSeat} - {lastSeat}
                    </b>
                </p>

                <p>
                    Date of booking:
                    <Moment format='DD/MM/YYYY'>{dateOfBooking}</Moment>
                </p>
            </div>
            <h3>
                Thank you for using BusBuzz. Please be on time for boarding.
                Wish you a happy journey!
            </h3>
            <ReactTOPdf targetRef={ref}>
                {({ toPdf }) => (
                    <button onClick={toPdf} className='btn btn-primary'>
                        Download Ticket
                    </button>
                )}
            </ReactTOPdf>
            <Link to='/dashboard' className='btn btn-dark'>
                Go back
            </Link>
        </Fragment>
    );
};

Ticket.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {})(Ticket);

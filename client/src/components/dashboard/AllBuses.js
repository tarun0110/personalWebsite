import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getBuses, editBus } from '../../actions/searchBus';
import { Link } from 'react-router-dom';

const AllBuses = ({
    getBuses,
    editBus,
    bus: { buses },
    auth: { user, loading },
}) => {
    useEffect(() => {
        getBuses();
    }, [getBuses]);

    return (
        <Fragment>
            {loading ? (
                <Spinner />
            ) : (
                <Fragment>
                    <h1 className='large text-primary'>All Busses</h1>
                    <p className='lead'>
                        <i className='fab fa-connectdevelop'></i> Edit
                    </p>

                    <div className='posts'>
                        <div class='container '>
                            <p className='lead d-flex justify-content-center'>
                                <h2>Available Buses</h2>
                            </p>
                            <div className='table-responsive'>
                                <div
                                    class='removetable table table-striped'
                                    id='hey'
                                >
                                    <thead>
                                        <tr>
                                            <th>Company</th>
                                            <th>Departure Place</th>
                                            <th>Departure Date</th>
                                            <th>Departure Time</th>
                                            <th>Arrival Place</th>
                                            <th>
                                                Journey Time{'( in hours )'}
                                            </th>
                                            <th>Fare</th>
                                            <th>Seats</th>
                                            <th>Edit</th>
                                        </tr>
                                    </thead>
                                    {buses.map(bus => (
                                        <Fragment>
                                            <tbody>
                                                <tr>
                                                    <td>{bus.company}</td>
                                                    <td>{bus.location_from}</td>
                                                    <td>{bus.date}</td>
                                                    <td>{bus.departure}</td>
                                                    <td>{bus.location_to}</td>
                                                    <td>{bus.journeyTime} Hours</td>
                                                    <td>{bus.fare}</td>
                                                    <td>{bus.seats}</td>
                                                    <td>
                                                        <Link
                                                            to={`/edit/${bus._id}`}
                                                            onClick={e =>
                                                                localStorage.setItem(
                                                                    'busId',
                                                                    bus._id
                                                                )
                                                            }
                                                            class='btn btn-primary'
                                                        >
                                                            Edit{' '}
                                                        </Link>
                                                    </td>
                                                </tr>
                                            </tbody>
                                            {/* <BusItem key={bus._id} bus={bus} /> */}
                                            {/* <input className="btn btn-danger my-1" value='Book Now' type= 'submit'style={{color: 'white'}}/>  */}
                                        </Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

AllBuses.propTypes = {
    auth: PropTypes.object.isRequired,
    getBuses: PropTypes.func.isRequired,
    bus: PropTypes.object.isRequired,
    editBus: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    // profile: state.profile,
    bus: state.searchBus,
});

export default connect(mapStateToProps, { getBuses })(AllBuses);

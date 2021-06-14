import React, { Fragment, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getBuses } from '../../actions/searchBus';
import BusItem from './BusItem';
const Dashboard = ({
    getBuses,
    bus: { buses },
    filterBuses,
    deleteAccount,
    auth: { user, loading },
}) => {
    useEffect(() => {
        getBuses();
    }, [getBuses]);

    const [formData, setFormData] = useState({
        inp_from: '',
        inp_to: '',
        inp_date: '',
    });
    const { inp_from, inp_to, inp_date } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    // let places =[];
    let places = new Set();
    for (let i = 0; i < buses.length; i++) {
        places.add(buses[i].location_from);
        places.add(buses[i].location_to);
    }
    const onSubmit = e => {
        e.preventDefault();
        // const g = document.querySelector('.removetable');
        // g.innerHTML = '';
        while (filterBuses.length > 0) filterBuses.pop();
        for (let i = 0; i < buses.length; i++) {
            if (
                buses[i].location_from === formData.inp_from &&
                buses[i].location_to === formData.inp_to &&
                buses[i].date === formData.inp_date
            ) {
                filterBuses.push(buses[i]);
            }
        }
        if (filterBuses.length === 0) {
            alert('No buses available');
        }
        // createProfile(formData, history)
    };

    // const listOfPlaces = ['delhi', 'mumbai', 'chandigarh','patna', 'agra', 'kanpur'];
    console.log(places);
    const listOfPlaces = Array.from(places);

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;

    return loading ? (
        <Spinner />
    ) : (
        <Fragment>
            <p className='lead d-flex justify-content-center'>
                <i className='fas fa-user '></i>
                Welcome {user && user.name}
            </p>
            <h3 className='text-primary d-flex justify-content-center'>
                Book a bus
            </h3>
            {
                <div>
                    <div className=''>
                        <form
                            className='d-flex justify-content-center'
                            onSubmit={e => onSubmit(e)}
                        >
                            <div className=''>
                                <select
                                    id='input-label-from'
                                    className='inputForm'
                                    type='text'
                                    list='input-from-list'
                                    placeholder='From'
                                    name='inp_from'
                                    value={inp_from}
                                    onChange={e => onChange(e)}
                                    required
                                >
                                    <option value='0'>From</option>
                                    {listOfPlaces.map(fbb => (
                                        <option value={fbb}>
                                            {fbb.charAt(0).toUpperCase() +
                                                fbb.slice(1)}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    id='input-label-from'
                                    className='inputForm'
                                    type='text'
                                    list='input-to-list'
                                    placeholder='To'
                                    name='inp_to'
                                    value={inp_to}
                                    onChange={e => onChange(e)}
                                    required
                                >
                                    <option value='0'>To</option>
                                    {listOfPlaces.map(fbb => (
                                        <option value={fbb}>
                                            {fbb.charAt(0).toUpperCase() +
                                                fbb.slice(1)}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    id='input-label-onward-date'
                                    className='inputForm'
                                    type='date'
                                    placeholder='Date'
                                    min={today}
                                    name='inp_date'
                                    value={inp_date}
                                    onChange={e => onChange(e)}
                                    required
                                />
                                <input
                                    className='btn btn-danger my-1'
                                    type='submit'
                                    style={{ padding: '10px' }}
                                    onClick={e => getBuses()}
                                />
                            </div>
                        </form>
                        <div className='posts'>
                            <div className='container d-flex justify-content-center'>
                                <div className='table-responsive'>
                                    <div
                                        className='removetable table table-striped'
                                        id='hey'
                                    >
                                        {filterBuses.map(bus => (
                                            <BusItem key={bus._id} bus={bus} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </Fragment>
    );
};

Dashboard.defaultProps = {
    filterBuses: [],
};

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    getBuses: PropTypes.func.isRequired,
    bus: PropTypes.object.isRequired,
    filterBuses: PropTypes.object,
};

const mapStateToProps = state => ({
    auth: state.auth,
    bus: state.searchBus,
});

export default connect(mapStateToProps, { getBuses })(Dashboard);

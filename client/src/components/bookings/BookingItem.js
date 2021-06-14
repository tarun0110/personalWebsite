import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const BookingItem = ({bus, auth:{user}}) => {
    // useEffect(() => {
    //     getBus(bus_id);
    // }, [getBus, bus_id]);
    let s;
    // console.log(user)
    for(let i = 0; i< user.bookings.length;i++)
        if(user.bookings[i].bus===bus._id) s= user.bookings[i].seats
    return (
        <Fragment>
            <div className = "container">
            <div className='table-responsive'>
                    <table className='table'  style={{'borderBlockColor': 'green'}}>
                        <thead>
                            <tr>
                                <th>Company</th>
                                <th>Departure Place</th>
                                <th>Departure Time</th>
                                <th>Arrival Place</th>
                                <th>Journey Time</th>
                                <th>
                                    Date
                                    <br />
                                    <small>dd/mm/yyyy</small>
                                </th>
                                <th>
                                    Fare {'('}INR{')'}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{bus.company}</td>
                                <td>{bus.location_from.charAt(0).toUpperCase()+bus.location_from.slice(1)}</td>
                                <td>{bus.departure}</td>
                                <td>{bus.location_to.charAt(0).toUpperCase()+bus.location_to.slice(1)}</td>
                                <td>{bus.journeyTime} Hours</td>
                                {/* <td>{arrival}</td> */}
                                <td>{bus.date}</td>
                                <td>{bus.fare}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className = "d-flex justify-content-center">
                        Number of seats booked - {s}
                </div>
            </div>
               
        </Fragment>
    )
}

BookingItem.propTypes = {
    // getBus: PropTypes.func.isRequired,
    bus: PropTypes.object.isRequired,
    // bus_id: PropTypes.string,

}

const mapStateToProps = state => ({
    auth: state.auth
})

// export default BookingItem;

export default connect(mapStateToProps)( BookingItem);

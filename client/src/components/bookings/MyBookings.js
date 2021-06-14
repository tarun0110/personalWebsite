import React, {Fragment,useEffect}from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { myBookings } from '../../actions/auth';
import BookingItem from './BookingItem';

const GetBookings = ({myBookings, auth:{buses, loading}, filterBuses, bus}) => {
    useEffect(() => {
        myBookings();
    }, [myBookings]);
    while(filterBuses.length > 0)filterBuses.pop();
    for(let i=0;i<buses.length;i++){
        for(let j=0;j<bus.buses.length;j++){
            if(buses[i]===bus.buses[j]._id){
                // console.log(bus.buses[j].location_from);
                filterBuses.push(bus.buses[j]);
                break;
            }
        }
    }
    let flag=1;
    if(filterBuses.length===0) flag=0;
    // console.log(filterBuses);

    return (
        <Fragment>
             <div className='posts '>
             <h1 className='large text-primary d-flex justify-content-center'>My Bookings</h1>
                <div className='container d-flex justify-content-center'>
                    <div className='table-responsive'>
                        <div className='removetable table table-striped' id='hey'>
                            
                            {filterBuses.map( bus => 
                                <BookingItem key={bus._id} bus={bus}/>
                            )}
                        </div>
                    </div>
                    {!flag && <Fragment> No Bookings Yet </Fragment>}
                </div>
            </div>
        </Fragment>
    )
}

GetBookings.defaultProps = {
    filterBuses: [],
};

GetBookings.propTypes = {
    auth: PropTypes.object.isRequired,
    bus: PropTypes.object.isRequired,
    myBookings: PropTypes.func.isRequired,
    filterBuses: PropTypes.object,

}

const mapStateToProps = state => ({
    auth: state.auth,
    bus: state.searchBus
})

// export default GetBookings;

export default connect(mapStateToProps,{myBookings})(GetBookings);

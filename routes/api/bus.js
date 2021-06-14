const express = require('express');
const router = express.Router();
const Bus = require('../../models/Bus');
const auth = require('../../middleware/auth');

// to add a new bus
router.post('/', auth, async (req, res) => {
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
    } = req.body;
    const busFields = {};
    if (company) busFields.company = company;
    if (location_from) busFields.location_from = location_from;
    if (location_to) busFields.location_to = location_to;
    if (date) busFields.date = date;
    if (departure) busFields.departure = departure;
    if (journeyTime) busFields.journeyTime = journeyTime;
    if (fare) busFields.fare = fare;
    if (seats) busFields.seats = seats;
    if (booked) busFields.booked = booked;

    try {
        const bus = new Bus(busFields);
        await bus.save();
        //console.log(bus);
        res.json(bus);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('server error');
    }
});

// to edit a bus
router.post('/edit/:id', auth, async (req, res) => {
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
    } = req.body;
    const busFields = {};
    if (company) busFields.company = company;
    if (location_from) busFields.location_from = location_from;
    if (location_to) busFields.location_to = location_to;
    if (date) busFields.date = date;
    if (departure) busFields.departure = departure;
    if (journeyTime) busFields.journeyTime = journeyTime;
    if (fare) busFields.fare = fare;
    if (seats) busFields.seats = seats;
    if (booked) busFields.booked = booked;

    try {
        let bus = await Bus.findOne({ _id: req.params.id });
        if (bus) {
            bus = await Bus.findOneAndUpdate(
                { _id: req.params.id },
                { $set: busFields },
                { new: true }
            );
            return res.json(bus);
        } else {
            return res.status(404).json({ msg: 'Bus not found' });
        }
        // let bus = new Bus(busFields);
        // await bus.save();
        // console.log(bus);
        // res.json(bus);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('server error');
    }
});

//delete post by id
router.delete('/:id', auth, async (req, res) => {
    try {
        const bus = await Bus.findById(req.params.id);
        if (!bus) {
            return res.status(404).json({ msg: 'Bus not found' });
        } else {
            // console.log(req);
            // if(req.user.email!=="admin@gmail.com"){
            //     return res.status(401).send('Not authorized');
            // }

            await bus.remove();
            return res.json({ msg: 'Bus Removed' });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send('server error');
    }
});

//get all buses
router.get('/', async (req, res) => {
    try {
        const buses = await Bus.find();
        res.json(buses);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('server error');
    }
});

//get bus by bus id
router.get('/:id', async (req, res) => {
    try {
        const bus = await Bus.findById(req.params.id);
        if (!bus) {
            return res.status(404).json({ msg: 'Bus not found' });
        }
        res.json(bus);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('server error');
    }
});

// book a seat in a bus for a user
// /book/bus_id
router.post('/book/:id', auth, async (req, res) => {
    try {
        const { seatsBooked } = req.body;
        const user = await User.findOne({ _id: req.user.id });
        const bus = await Bus.findById(req.params.id);
        const noOfSeatsBooked = bus.booked.length;
        const availableSeats = bus.seats - noOfSeatsBooked;

        // check if number of seats available in the bus > 0
        // a bus can not have negative seats (validate this at the time when the admin enters a
        // negative or zero value for seats)
        if (seatsBooked > availableSeats) {
            return res.status(400).json({ msg: 'Not enough seats available' });
        }

        const busCompany = bus.company;
        const from = bus.location_from;
        const to = bus.location_to;
        const dateOfDeparture = bus.date;
        const timeOfDeparture = bus.departure;
        const journeyTime = bus.journeyTime;
        const firstSeat = noOfSeatsBooked + 1;

        user.bookings.unshift({
            bus: req.params.id,
            busCompany: busCompany,
            seats: seatsBooked,
            from: from,
            to: to,
            dateOfDeparture: dateOfDeparture,
            timeOfDeparture: timeOfDeparture,
            journeyTime: journeyTime,
            firstSeat: firstSeat,
        });

        for (let i = 1; i <= seatsBooked; i++) {
            bus.booked.unshift({ user: req.user.id });
        }

        await bus.save();
        await user.save();

        res.json(user.bookings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

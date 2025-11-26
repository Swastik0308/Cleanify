import Booking from "../models/bookingModel.js";

// Create Booking
export const createBooking = async (req, res) => {
  const { vendor, serviceType, scheduledAt } = req.body;

  try {
    const booking = await Booking.create({
      customer: req.user._id,
      vendor,
      serviceType,
      scheduledAt,
    });
    res.status(201).json({ booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all bookings for the logged-in user
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ customer: req.user._id }).populate(
      "vendor",
      "name email"
    );
    res.json({ bookings });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

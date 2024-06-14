// controllers/bookingController.js
import Booking from "../models/bookingModel.js";
import Property from "../models/propertyModel.js";
import createNotificationForUpdates from "../service/createNotification.js";
import sendEmails from "../service/sendEmails.js";
import catchAsync from "../utils/catchAsync.js";
import CustomError from "../utils/customError.js";

// Create a new booking
const createBooking = catchAsync(async (req, res, next) => {
  const property = await Property.findById(req.params.propertyId).populate(
    "listingDetails.listedBy"
  );
  if (!property) {
    return next(new CustomError("No property found with that ID", 404));
  }

  const booking = await Booking.create({
    property: req.params.propertyId,
    user: req.user._id,
    status: "pending",
  });

  property.status = "Pending";
  if (property.bookings.length > 1)
    return next(
      new CustomError(
        "The Property is already booked! Try booking another one.",
        400
      )
    );
  property.bookings.push(booking);
  await property.save();

  if (req.user.bookings.length > 1)
    return next(
      new CustomError(
        "You have already booked a property! Cancel it fist before booking another.",
        400
      )
    );
  req.user.bookings.push(booking);
  await req.user.save();

  const message = "Someone has booked your property. Check him out!";
  const type = "property_booked";
  await createNotificationForUpdates(
    property.listingDetails.listedBy,
    type,
    message
  );

  sendEmails(
    property.listingDetails.listedBy.email,
    "Property Booked",
    message
  );

  res.status(201).json({
    status: "success",
    data: {
      booking,
    },
  });
});

// Get a single booking
const getBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id).populate(
    "property user"
  );
  if (!booking) {
    return next(new CustomError("No booking found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      booking,
    },
  });
});

// Get all bookings (admin only)
const getAllBookings = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find().populate("property user");

  res.status(200).json({
    status: "success",
    data: {
      bookings,
    },
  });
});

// Update a booking
const updateBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!booking) {
    return next(new CustomError("No booking found with that ID", 404));
  }

  if (booking.status === "canceled") {
    await Property.findByIdAndUpdate(
      booking.property,
      { status: "Available" },
      { runValidators: true, new: true }
    );

    await booking.deleteOne();
    req.user.bookings.pull(booking._id);
    await req.user.save();

    const property = await Property.findById(booking.property);
    property.bookings.pull(booking._id);
    await property.save();
  }

  res.status(200).json({
    status: "success",
    data: {
      booking,
    },
  });
});

// Delete a booking
const deleteBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findByIdAndDelete(req.params.id);
  if (!booking) {
    return next(new CustomError("No booking found with that ID", 404));
  }

  req.user.bookings.pull(booking._id);
  await req.user.save();

  const property = await Property.findById(booking.property);
  property.bookings.pull(booking._id);
  property.status = "Available";
  await property.save();

  res.status(204).json({
    status: "success",
    data: null,
  });
});

export {
  createBooking,
  getAllBookings,
  getBooking,
  updateBooking,
  deleteBooking,
};

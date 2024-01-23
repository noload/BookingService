const { Booking } = require("../models/index");
const { ValidationError, AppError } = require("../utils/errors/index");

const { StatusCodes } = require("http-status-codes");
class BookingRepository {
  async create(data) {
    try {
      const booking = await Booking.create(data);
      return booking;
    } catch (error) {
      if (error.name == "SequelizeValidationError") {
        throw new ValidationError(error);
      }
      throw new AppError(
        "Reppository Error",
        "Cannot create booking",
        "There was some issue while created booking please try again ",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async update(bookingId, data) {
    try {
      const booking = await Booking.findByPk(bookingId);
      if (data.status) {
        booking.status = data.status;
      }
      await booking.save();
      return booking;
    } catch (error) {
      throw new AppError(
        "Reppository Error",
        "Cannot Update booking",
        "There was some issue while updating booking please try again ",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async updateBooking(bookingId, data) {
    try {
      const booking = await Booking.update(data, {
        where: {
          id: bookingId,
        },
      });
      return booking;
    } catch (error) {
      throw new AppError(
        "Reppository Error",
        "Cannot Update booking",
        "There was some issue while updating booking please try again ",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getAllBookings() {
    try {
      const bookings = await Booking.findAll();
      return bookings;
    } catch (error) {
      throw new AppError(
        "Reppository Error",
        "Cannot Get all bookings",
        "There was some issue while getting booking details please try again ",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getBooking(bookingId) {
    try {
      const bookings = await Booking.findOne({
        where: {
          id: bookingId,
        },
      });
      return bookings;
    } catch (error) {
      throw new AppError(
        "Reppository Error",
        "Cannot Get booking details",
        "There was some issue while getting booking detail please try again ",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = BookingRepository;

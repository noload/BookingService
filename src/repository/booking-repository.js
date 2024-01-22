const { Booking } = require("../models/booking");
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


  async update(data){}

}

module.exports = BookingRepository;

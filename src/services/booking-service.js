const { BookingRepository } = require("../repository/index");

const axios = require("axios");
const { flight_service_path } = require("../config/serverConfig");
const { ServiceError } = require("../utils/errors");

class BookingService {
  constructor() {
    this.bookingRepository = new BookingRepository();
  }

  async createBooking(data) {
    try {
      const flightId = data.flightId;
      const getFlightRequestURL = `${flight_service_path}/api/v1/flights/${flightId}`;

      const response = await axios.get(getFlightRequestURL);
      const flightData = response.data.data;
      let priceOftheFlight = flightData.price;
      if (data.noOfSeats > flightData.totalSeats) {
        throw new ServiceError(
          "Something went wrong in booking process",
          "Insufficient Seats in the flights"
        );
      }
      const totalCost = priceOftheFlight * data.noOfSeats;
      const bookingPayload = { ...data, totalCost };
      const booking = await this.bookingRepository.create(bookingPayload);
      const updateFlightRequestURL = `${flight_service_path}/api/v1/flights/${booking.flightId}`;

      await axios.patch(updateFlightRequestURL, {
        totalSeats: flightData.totalSeats - booking.noOfSeats,
      });
      const finalBooking = await this.bookingRepository.update(booking.id, {
        status: "Booked",
      });
      return finalBooking;
    } catch (error) {
      if (error.name == "RepositoryError" || error.name == "ValidationError") {
        throw error;
      }
      throw new ServiceError();
    }
  }

  async updateBooking(flightId, data) {
    try {
      const booking = await this.bookingRepository.updateBooking(
        flightId,
        data
      );
      return booking;
    } catch (error) {
      if (error.name == "RepositoryError" || error.name == "ValidationError") {
        throw error;
      }
      throw new ServiceError();
    }
  }

  async getAll() {
    try {
      const resp = this.bookingRepository.getAllBookings();
      return resp;
    } catch (error) {
      if (error.name == "RepositoryError" || error.name == "ValidationError") {
        throw error;
      }
      throw new ServiceError();
    }
  }

  async get(bookingId) {
    try {
      const resp = this.bookingRepository.getBooking(bookingId);
      return resp;
    } catch (error) {
      if (error.name == "RepositoryError" || error.name == "ValidationError") {
        throw error;
      }
      throw new ServiceError();
    }
  }
}

module.exports = BookingService;

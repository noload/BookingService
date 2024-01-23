const { BookingService } = require("../services/index");

const { StatusCodes } = require("http-status-codes");
const bookingService = new BookingService();

const create = async (req, res) => {
  try {
    const resp = await bookingService.createBooking(req.body);
    console.log("From controller" + resp);
    return res.status(StatusCodes.OK).json({
      message: "Successfully created  booking",
      success: true,
      err: {},
      data: resp,
    });
  } catch (error) {
    console.log("from booking controller", error);
    return res.status(error.statusCode).json({
      message: error.message,
      success: false,
      err: error.explanation,
      data: {},
    });
  }
};

const update = async (req, res) => {
  try {
    const resp = await bookingService.updateBooking(req.params.id, req.body);

    return res.status(StatusCodes.OK).json({
      message: "Successfully updated  booking",
      success: true,
      err: {},
      data: resp,
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      message: error.message,
      success: false,
      err: error.explanation,
      data: {},
    });
  }
};

const getAll = async (req, res) => {
  try {
    const resp = await bookingService.getAll();

    return res.status(StatusCodes.OK).json({
      message: "Successfully fetched  booking",
      success: true,
      err: {},
      data: resp,
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      message: error.message,
      success: false,
      err: error.explanation,
      data: {},
    });
  }
};

const get = async (req, res) => {
  try {
    const resp = await bookingService.get(req.params.id);

    return res.status(StatusCodes.OK).json({
      message: "Successfully fetched  booking  detail",
      success: true,
      err: {},
      data: resp,
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      message: error.message,
      success: false,
      err: error.explanation,
      data: {},
    });
  }
};

module.exports = {
  create,
  update,
  getAll,
  get,
};

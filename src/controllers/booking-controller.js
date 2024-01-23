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

module.exports = {
  create,
};

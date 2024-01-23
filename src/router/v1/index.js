const exress = require("express");
const router = exress.Router();

const { BookingController } = require("../../controllers/index");

router.post("/bookings", BookingController.create);

module.exports = router;

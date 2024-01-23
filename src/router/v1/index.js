const exress = require("express");
const router = exress.Router();

const { BookingController } = require("../../controllers/index");

router.post("/bookings", BookingController.create);

router.post("/bookings/:id", BookingController.update);

router.get("/bookings", BookingController.getAll);

router.get("/booking/:id", BookingController.get);

module.exports = router;

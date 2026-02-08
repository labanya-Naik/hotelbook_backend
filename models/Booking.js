const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  hotelName: { type: String, required: true },
  roomType: { type: String, required: true },
  checkin: { type: String, required: true },
  checkout: { type: String, required: true },
  adults: { type: Number, required: true },
  children: { type: Number, default: 0 },
  requests: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
});

module.exports = mongoose.model("Booking", bookingSchema);

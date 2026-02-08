const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Booking = require("./models/Booking");

const app = express();
app.use(cors(
  {
    origin: "*",
    methods: ["GET", "POST", "DELETE"],
  }
));
app.use(express.json());

// ✅ MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/hotelDB") // change if using Atlas
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

/* ✅ API: Save Booking Data */
app.post("/book", async (req, res) => {
  try {
    const bookingData = req.body;

    const newBooking = new Booking(bookingData);
    await newBooking.save();

    res.status(201).json({
      message: "✅ Booking Saved Successfully!",
      booking: newBooking,
    });
  } catch (error) {
    console.log("❌ Booking Save Error:", error);
    res.status(500).json({ message: "❌ Booking Failed!" });
  }
});

/* ✅ API: Get All Bookings */
app.get("/bookings", async (req, res) => {
  try {
    const allBookings = await Booking.find().sort({ createdAt: -1 });
    res.json(allBookings);
  } catch (error) {
    console.log("❌ Fetch Bookings Error:", error);
    res.status(500).json({ message: "❌ Error fetching bookings" });
  }
});

/* ✅ API: Delete Booking by ID */
app.delete("/bookings/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Booking.findByIdAndDelete(id);
    res.json({ message: "✅ Booking Deleted Successfully!" });
  } catch (error) {
    console.log("❌ Delete Booking Error:", error);
    res.status(500).json({ message: "❌ Delete Failed!" });
  }
});

app.listen(5000, () => {
  console.log("✅ Server running at http://localhost:5000");
});

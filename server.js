const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Booking = require("./models/Booking");

const app = express();

/* =========================
   ✅ CORS (Frontend Access)
========================= */
app.use(
  cors({
    origin: "*", // safe for college project
    methods: ["GET", "POST", "DELETE"],
  })
);

app.use(express.json());

/* =========================
   ✅ MongoDB Connection
   (Use MongoDB Atlas on Render)
========================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err.message));

/* =========================
   ✅ Health Check (IMPORTANT)
========================= */
app.get("/", (req, res) => {
  res.send("🚀 Hotel Booking Backend is running");
});

/* =========================
   ✅ Save Booking
========================= */
app.post("/book", async (req, res) => {
  try {
    const bookingData = {
      hotelName: req.body.hotelName,
      roomType: req.body.roomType,
      checkin: req.body.checkin,
      checkout: req.body.checkout,
      adults: Number(req.body.adults),
      children: Number(req.body.children || 0),
      email: req.body.email,
      mobile: req.body.mobile,
      requests: req.body.requests || "",
    };

    const newBooking = new Booking(bookingData);
    await newBooking.save();

    res.status(201).json({
      message: "✅ Booking Saved Successfully!",
      booking: newBooking,
    });
  } catch (error) {
    console.error("❌ Booking Save Error:", error.message);
    res.status(500).json({
      message: "❌ Server error while saving booking",
    });
  }
});

/* =========================
   ✅ Get All Bookings
========================= */
app.get("/bookings", async (req, res) => {
  try {
    const allBookings = await Booking.find().sort({ createdAt: -1 });
    res.json(allBookings);
  } catch (error) {
    console.error("❌ Fetch Bookings Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
});

/* =========================
   ✅ Delete Booking
========================= */
app.delete("/bookings/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "✅ Booking Deleted Successfully!" });
  } catch (error) {
    console.error("❌ Delete Error:", error.message);
    res.status(500).json({ message: "❌ Delete Failed!" });
  }
});

/* =========================
   ✅ Start Server (Render)
========================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

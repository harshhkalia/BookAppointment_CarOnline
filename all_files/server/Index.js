import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Upload from "./configs/UserPFPConfig.js";
import {
  changeUserDetails,
  completeOwnerDetails,
  createUser,
  loginUser,
} from "./controllers/User.js";
import cors from "cors";
import uploadShowroomPFP from "./configs/ShowRoomPFPs.js";
import path from "path";
import { fileURLToPath } from "url";
import uploadCarImages from "./configs/CarImages.js";
import {
  createCar,
  deleteCar,
  fetchPendingBookingUserData,
  getAllShowrooms,
  getMyCars,
  searchCarData,
  searchForShowrooms,
  updateCar,
} from "./controllers/Car.js";
import {
  deleteMyOneVisit,
  getMyAllVisits,
  newVisit,
} from "./controllers/RecentlyVisitedShowroom.js";
import {
  changeBookingStatusToComplete,
  fetchAcceptedBookingsForCustomer,
  fetchAllPendingBookingsForOwner,
  fetchCompletedBookingsForOwner,
  fetchPendingBookingsForCustomer,
  fetchPendingBookingsForOtherCars,
  fetchRejectedBookingsForCustomer,
  fetchSpecificCarPendingDetails,
  rejectPendingBooking,
  SaveCarBooking,
} from "./controllers/CarBooking.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/UserPFPs", express.static(path.join(__dirname, "UserPFPs")));
app.use("/ShowroomPFPs", express.static(path.join(__dirname, "ShowroomPFPs")));
app.use("/CarImages", express.static(path.join(__dirname, "CarImages")));

const PORT = process.env.PORT;
const mongo_url = process.env.DB_URL;

if (!mongo_url) {
  console.error(
    "The database is not connected successfully, please recheck the url in env file and try again!!"
  );
  process.exit(1);
}

mongoose
  .connect(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("The database has been connected successfully!!");
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Something went wrong while connecting to database", error);
  });

// create account by signing up
app.post("/createAccount", Upload.single("profilePic"), createUser);

// check user details and login user
app.post("/loginUser", loginUser);

// complete owner details
app.put(
  "/completeOwnerDetails",
  uploadShowroomPFP.single("showRoomPFP"),
  completeOwnerDetails
);

// add car into your showroom
app.post("/addNewCar", uploadCarImages.array("carImages"), createCar);

// get all cars related to my showroom
app.get("/getMineCars/:id", getMyCars);

// change details of user profile
app.put(
  "/changeUserProfileDetails",
  (req, res, next) => {
    const upload = Upload.fields([
      { name: "newProfilePic", maxCount: 1 },
      { name: "newShowroomCover", maxCount: 1 },
    ]);

    upload(req, res, (err) => {
      if (err) return next(err);
      next();
    });
  },
  changeUserDetails
);

// change details of car
app.put("/changeCarDetails", uploadCarImages.array("carImages"), updateCar);

// delete car from your showroom
app.delete("/deleteCar/:id", deleteCar);

// get all owners for customer functionality
app.get("/getAllShowrooms", getAllShowrooms);

// search for showroom using location
app.get("/search/showrooms/:searchTerm", searchForShowrooms);

// save history of visited showrooms
app.post("/customers/recentlyVisitedShowrooms", newVisit);

// get history of all visited showrooms
app.get("/customers/allVisitedShowrooms/", getMyAllVisits);

// remove my visit from history
app.delete("/customers/removeVisitedShowroom", deleteMyOneVisit);

// save a car booking
app.post("/customers/saveCarBooking", SaveCarBooking);

// fetch all pending appointment for owner
app.get(
  "/owner/fetchAllPendingAppointmentsForOwner",
  fetchAllPendingBookingsForOwner
);

// fetch data of car for owner functioning API
app.get("/owner/fetchPBcardetails", searchCarData);

// fetch data of user for pending booking API
app.get("/owner/fetchPBuserdetails", fetchPendingBookingUserData);

// accept a pending booking from customer
app.put("/owner/acceptCustomerPB", changeBookingStatusToComplete);

// reject a booking of customer
app.put("/owner/rejectCustomerPB", rejectPendingBooking);

// get all bookings for owner that are completed
app.get(
  "/owner/fetchCompletedBookingsForOwner",
  fetchCompletedBookingsForOwner
);

// fetch pending bookings for a specific car
app.get("/owner/fetchPendingcarBookings", fetchSpecificCarPendingDetails);

// fetch pending bookings for other cars
app.get(
  "/owner/fetchPendingBookingsForOtherCars",
  fetchPendingBookingsForOtherCars
);

// fetch pending bookings for customer
app.get(
  "/customer/fetchPendingBookingsForCustomer",
  fetchPendingBookingsForCustomer
);

// fetch accepted bookings for customer
app.get(
  "/customer/fetchAcceptedBookingsForCustomer",
  fetchAcceptedBookingsForCustomer
);

// fetch Rejected bookings for customer
app.get(
  "/customer/fetchRejectedBookingsForCustomer",
  fetchRejectedBookingsForCustomer
);

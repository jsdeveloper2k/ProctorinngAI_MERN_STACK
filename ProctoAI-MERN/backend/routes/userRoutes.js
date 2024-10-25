// import express from "express";
// import {
//   authUser,
//   getUserProfile,
//   logoutUser,
//   registerUser,
//   updateUserProfile,
// } from "../controllers/userController.js";
// import { protect } from "../middleware/authMiddleware.js";
// import { createExam, getExams } from "../controllers/examController.js";
// const userRoutes = express.Router();
// userRoutes.post("/", registerUser);
// userRoutes.post("/auth", authUser);
// userRoutes.post("/logout", logoutUser);
// userRoutes.post("/register", registerUser);
// // protecting profile route using auth middleware protect
// userRoutes
//   .route("/profile")
//   .get(protect, getUserProfile)
//   .put(protect, updateUserProfile);

// export default userRoutes;

import express from "express";
import {
  authUser,
  getUserProfile,
  logoutUser,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// User registration
router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);

// Protecting the profile route with the 'protect' middleware
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;

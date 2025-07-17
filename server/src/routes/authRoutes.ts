import express from "express";
import { login, signup } from "../controllers/authController";
import { body } from "express-validator";

//google
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/login",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  login
);

router.post(
  "/signup",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  signup
);

//google
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    const user = req.user as any;
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );
    res.redirect(
      `${(process.env.CLIENT_URL || "").replace(
        /\/$/,
        ""
      )}/google-auth?token=${token}`
    );
  }
);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

//In case i need for logout with google. The other logout(email) is in frontend
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send("Logout failed");
    }
    res.redirect(process.env.CLIENT_URL || "/");
  });
});
export default router;

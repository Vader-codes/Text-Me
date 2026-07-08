import express from "express";

const router = express.Router();

router.get("/signup", (req, res) => {
  res.send("signup Endpoint");
});

router.get("/logout", (req, res) => {
  res.send("logout Endpoint");
});

router.get("/login", (req, res) => {
  res.send("login Endpoint");
});

export default router;

import express from "express";
import { getAllContacts } from "../controllers/messsage.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getChatPartners } from "../controllers/messsage.controller.js";
import { getMessagesByUserId } from "../controllers/messsage.controller.js";
import { sendMessage } from "../controllers/messsage.controller.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

const router = express.Router();

// the middleware execute in order -so requests get rate-limited first, then authenticated.
router.use(arcjetProtection, protectRoute);

router.get("/contacts", getAllContacts);
router.get("/chats", getChatPartners);
router.get("/:id", getMessagesByUserId);
router.post("/send/:id", sendMessage);

export default router;

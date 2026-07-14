import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtection = async (req, res, next) => {
  try {
    const decision = await aj.protect(req);

    if (decision.isDenied()) {
      // what was the reason for deny?? send appropriate response!

      if (decision.reason.isRateLimit()) {
        return res
          .status(429)
          .json({ message: "Rate limit exceeded. Try again Later!" });
      } else if (decision.reason.isBot()) {
        return res
          .status(403)
          .json({ message: " Bot Detected ! premission denied" });
      } else {
        return res
          .status(403)
          .json({ message: " Access denied by security policy" });
      }
    }
    // check for spooofed bots
    if (decision.results.some(isSpoofedBot)) {
      return res.status(403).json({
        error: "Spoofed bot detected",
        message: "Malicious bot activity detected",
      });
    }
  } catch (error) {
    console.log("Arcjet Protection Error:", error);
    next();
  }
};

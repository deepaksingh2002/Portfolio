import { Router } from "express"
import rateLimit from "express-rate-limit"
import { sendMessage, getMessages, markRead, deleteMessage } from "../controllers/messageController.js"
import { verifyToken }  from "../middleware/auth.js"
import { validateContact } from "../middleware/validate.js"

const router = Router()

const contactLimit = rateLimit({
    windowMs: 60 * 60 * 1000,   // 1 hour
    max: 5,
    message: {
        success: false,
        message: "Too many messages. Please wait an hour."
    },
})

router.post("/", contactLimit, validateContact, sendMessage)
router.get("/", verifyToken, getMessages)
router.put("/:id/read", verifyToken, markRead)
router.delete("/:id", verifyToken, deleteMessage)

export default router

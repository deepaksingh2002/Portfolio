import nodemailer       from "nodemailer"
import { Message }      from "../models/Message.js"
import { ApiError }     from "../utils/ApiError.js"
import { ApiResponse }  from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"


// Helper function to send email notification to admin when a new message is received
const sendEmail = async (msg) => {
    if (!process.env.EMAIL_USER || process.env.EMAIL_USER === "your@gmail.com") return
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
        })
        await transporter.sendMail({
            from:    process.env.EMAIL_USER,
            to:      process.env.ADMIN_EMAIL,
            subject: `Portfolio contact: ${msg.subject}`,
            html:    `<h3>New message from ${msg.name} (${msg.email})</h3>
                      <p><strong>Subject:</strong> ${msg.subject}</p>
                      <p>${msg.message}</p>`,
        })
    } catch (err) {
        console.log("Email notification skipped:", err.message)
    }
}


// Send a new message  
export const sendMessage = asyncHandler(async (req, res) => {
    const { name, email, subject, message } = req.body
    const msg = await Message.create({ name, email, subject, message, ip: req.ip })
    await sendEmail(msg)
    return res.status(201).json(
        new ApiResponse(201, {}, "Message sent! I'll get back to you soon.")
    )
})


// Get all messages (admin only)
export const getMessages = asyncHandler(async (req, res) => {
    const { read } = req.query
    const filter   = read !== undefined ? { read: read === "true" } : {}
    const messages = await Message.find(filter).sort({ createdAt: -1 })
    const unread   = await Message.countDocuments({ read: false })
    return res.status(200).json(
        new ApiResponse(200, { messages, count: messages.length, unread }, "Messages fetched")
    )
})


// Mark a message as read (admin only)
export const markRead = asyncHandler(async (req, res) => {
    const msg = await Message.findByIdAndUpdate(req.params.id, { read: true }, { new: true })
    if (!msg) throw new ApiError(404, "Message not found")
    return res.status(200).json(new ApiResponse(200, { message: msg }, "Message marked as read"))
})


// Delete a message (admin only)
export const deleteMessage = asyncHandler(async (req, res) => {
    const msg = await Message.findByIdAndDelete(req.params.id)
    if (!msg) throw new ApiError(404, "Message not found")
    return res.status(200).json(new ApiResponse(200, {}, "Message deleted"))
})

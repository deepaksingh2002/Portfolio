import { body, validationResult } from "express-validator"
import { ApiError }               from "../utils/ApiError.js"

const handleValidation = (req, _res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        throw new ApiError(400, errors.array()[0].msg, errors.array())
    }
    next()
}

export const validateProject = [
    body("title")
        .notEmpty().withMessage("Title is required")
        .isLength({ max: 100 }).withMessage("Title max 100 chars"),
    body("description")
        .notEmpty().withMessage("Description is required")
        .isLength({ max: 500 }).withMessage("Description max 500 chars"),
    body("category")
        .optional()
        .isIn(["Full-Stack", "Frontend", "Backend", "Mobile", "AI/ML", "Open Source", "Other"]),
    handleValidation,
]

export const validateContact = [
    body("name")
        .notEmpty().withMessage("Name is required")
        .isLength({ max: 100 }).withMessage("Name max 100 chars"),
    body("email")
        .isEmail().withMessage("Valid email is required")
        .normalizeEmail(),
    body("subject")
        .notEmpty().withMessage("Subject is required")
        .isLength({ min: 3, max: 200 }).withMessage("Subject must be 3–200 chars"),
    body("message")
        .notEmpty().withMessage("Message is required")
        .isLength({ min: 10, max: 2000 }).withMessage("Message must be 10–2000 chars"),
    handleValidation,
]

export const validateLogin = [
    body("email").isEmail().withMessage("Valid email required"),
    body("password").notEmpty().withMessage("Password required").isLength({ min: 6 }),
    handleValidation,
]

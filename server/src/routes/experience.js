import { Router }      from "express"
import { getExperience, createExperience, updateExperience, deleteExperience } from "../controllers/experienceController.js"
import { verifyToken } from "../middleware/auth.js"

const router = Router()

router.get("/",       getExperience)
router.post("/",      verifyToken, createExperience)
router.put("/:id",    verifyToken, updateExperience)
router.delete("/:id", verifyToken, deleteExperience)

export default router

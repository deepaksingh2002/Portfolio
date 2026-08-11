import { Router }     from "express"
import multer         from "multer"
import { getProjects, getProject, createProject, updateProject, deleteProject } from "../controllers/projectController.js"
import { verifyToken }    from "../middleware/auth.js"
import { validateProject } from "../middleware/validate.js"

const router  = Router()
const upload  = multer({ dest: "public/temp/" })

router.get("/",    getProjects)
router.get("/:id", getProject)

router.post("/",   verifyToken, upload.single("image"), validateProject, createProject)
router.put("/:id", verifyToken, upload.single("image"), updateProject)
router.delete("/:id", verifyToken, deleteProject)

export default router

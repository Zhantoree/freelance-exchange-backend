import {Router} from 'express'
import UserController from "../controllers/user-controller.js";
import roleMiddleware from "../middleware/role-middleware.js";

const router = new Router()

router.get('/users', roleMiddleware(["ADMIN"]), UserController.getUsers)
router.post('/delete/:id', roleMiddleware(["ADMIN"]), UserController.deleteUser)
router.post('/promote/:id', roleMiddleware(["ADMIN"]), UserController.promoteUser)

export default router
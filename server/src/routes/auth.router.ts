import { Router } from "express";
import {
	authCheck,
	authLogin,
	authRegister,
} from "../handlers/auth.handlers";
import { authenticateToken } from "../middleware/jwt";

const router = Router();

router.post("/login", authLogin);
router.post("/register", authRegister);
router.get("/check", authenticateToken, authCheck);

export default router;

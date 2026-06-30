import { Router } from "express";
import { recommend, metadata } from "../controllers/recommendations.controller";

const router = Router();

router.get("/metadata", metadata);
router.post("/", recommend);

export default router;



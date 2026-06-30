import { Router } from "express";
import {
    recommend,
    metadata,
    recommendByPreferences,
} from "../controllers/recommendations.controller";

const router = Router();

router.get("/metadata", metadata);
router.post("/preferences", recommendByPreferences);
router.post("/", recommend);

export default router;



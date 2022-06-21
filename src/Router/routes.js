import { Router } from "express";

const router = Router();

router.post("/cakes");
router.post("/clients");
router.post("/order");
router.get("/orders");
router.get("/orders/:id");
router.get("/clients/:id/orders");

export default router;
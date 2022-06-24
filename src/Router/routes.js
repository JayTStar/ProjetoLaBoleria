import { Router } from "express";

const router = Router();

import validateSchema from "../Middleware/joiValidation.js";
import schemas from "../Schemas/schemas.js";
import middlewares from "../Middleware/middlewares.js"
import controllers from "../Controller/controllers.js";

router.post("/cakes", (req,res,next) => {validateSchema(req,res,next,schemas.cakeSchema)}, middlewares.findCake, controllers.postCake);
router.post("/clients", (req,res,next) => {validateSchema(req,res,next,schemas.clientSchema)}, middlewares.findClientName, controllers.postClient);
router.post("/order", (req,res,next) => {validateSchema(req,res,next,schemas.orderSchema)}, middlewares.findClientId, middlewares.findCakeId , controllers.postOrder );
router.get("/orders", controllers.getOrders);
router.get("/orders/:id", controllers.getOrder);
router.get("/clients/:id/orders", middlewares.findClientId, controllers.getClientOrders);

export default router;
import { Router } from "express";

const router = Router();

import validateSchema from "../Middleware/joiValidation.js";
import schemas from "../Schemas/schemas.js";
import clientMiddlewares from "../Middleware/clientMiddleware.js";
import cakeMiddlewares from "../Middleware/cakeMiddleware.js";
import controllers from "../Controller/controllers.js";

router.post("/cakes", (req,res,next) => {validateSchema(req,res,next,schemas.cakeSchema)}, cakeMiddlewares.findCake, controllers.postCake);
router.post("/clients", (req,res,next) => {validateSchema(req,res,next,schemas.clientSchema)}, clientMiddlewares.findClientName, controllers.postClient);
router.post("/order", (req,res,next) => {validateSchema(req,res,next,schemas.orderSchema)}, clientMiddlewares.findClientId, cakeMiddlewares.findCakeId , controllers.postOrder );
router.get("/orders", controllers.getOrders);
router.get("/orders/:id", controllers.getOrder);
router.get("/clients/:id/orders", clientMiddlewares.findClientId, controllers.getClientOrders);

export default router;
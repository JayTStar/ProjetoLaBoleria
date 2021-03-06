import { Router } from "express";

const router = Router();

import validateSchema from "../Middleware/joiValidation.js";
import schemas from "../Schemas/schemas.js";
import clientMiddlewares from "../Middleware/clientMiddleware.js";
import cakeMiddlewares from "../Middleware/cakeMiddleware.js";
import cakeControllers from "../Controller/cakeController.js";
import clientControllers from "../Controller/clientController.js";
import orderControllers from "../Controller/orderController.js";


router.post("/cakes", (req,res,next) => {validateSchema(req,res,next,schemas.cakeSchema)}, cakeMiddlewares.findCake, cakeControllers.postCake);
router.post("/clients", (req,res,next) => {validateSchema(req,res,next,schemas.clientSchema)}, clientMiddlewares.findClientName, clientControllers.postClient);
router.post("/order", (req,res,next) => {validateSchema(req,res,next,schemas.orderSchema)}, clientMiddlewares.findClientId, cakeMiddlewares.findCakeId , orderControllers.postOrder );
router.get("/orders", orderControllers.getOrders);
router.get("/orders/:id", orderControllers.getOrder);
router.get("/clients/:id/orders", clientMiddlewares.findClientId, clientControllers.getClientOrders);

export default router;
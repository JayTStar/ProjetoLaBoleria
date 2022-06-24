import joi from "joi";

const cakeSchema = joi.object({
    name: joi.string().required().min(2),
    price: joi.number().required().min(0.01),
    description: joi.string().required(),
    image: joi.string().required().uri()
});

const clientSchema = joi.object({
    name: joi.string().required(),
    address: joi.string().required(),
    phone: joi.string().required().min(10).max(11)
});

const orderSchema = joi.object({
    clientId: joi.number().required(),
    cakeId: joi.number().required(),
    quantity: joi.number().required().min(1).max(5),
    totalPrice: joi.number().required()
})

const schemas = {
    cakeSchema,
    clientSchema,
    orderSchema
}

export default schemas
import connection from "../DataBase/db.js";

async function postOrder(req,res){
    const order = req.body;

    try{
        await connection.query(
            `
            INSERT INTO orders ("clientId", "cakeId", quantity, "totalPrice")

            VALUES ($1,$2,$3,$4)
            `,
            [order.clientId, order.cakeId, order.quantity, order.totalPrice]
        );

        res.status(201).send("Pedido cadastrado");
    }
    catch(err){
        console.log("Erro ao cadastrar Pedido");
        console.log(err);
        res.status(500).send("Erro no servidor");
    }
}

async function getOrders(req,res){
    try{
        const request = await connection.query(
            `
            SELECT * FROM orders
            `
        )

        res.status(200).send(request.rows)
    }
    catch(err){
        console.log("Erro ao buscar pedidos");
        console.log(err);
        res.status(500).send("Erro no servidor");
    }
}

async function getOrder(req,res){
    const {id} = req.params
    try{
        const request = await connection.query(
            `
            SELECT * , clients.name AS "clientName", cakes.name AS "cakeName"
            FROM orders
            JOIN clients
            ON clients.id = orders."clientId"
            JOIN cakes
            ON cakes.id = orders."cakeId"
            WHERE orders.id = $1
            `,
            [id]
        );

        const response = {
            client: {
                id: request.rows[0].clientId,
                name: request.rows[0].clientName,
                address: request.rows[0].address,
                phone: request.rows[0].phone
            },

            cake: {
				id: request.rows[0].cakeId,
                name: request.rows[0].cakeName,
                price: request.rows[0].price,
				description: request.rows[0].description,
				image: request.rows[0].image
            },

            createdAt: request.rows[0].createdAt,
            quantity: request.rows[0].quantity,
            totalPrice: request.rows[0].totalPrice
        }

        res.status(200).send(response)
    }
    catch(err){
        console.log("Erro ao buscar pedido");
        console.log(err);
        res.status(500).send("Erro no servidor");
    }
}

const orderControllers = {
    postOrder,
    getOrders,
    getOrder
};

export default orderControllers;
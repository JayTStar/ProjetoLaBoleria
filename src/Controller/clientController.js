import connection from "../DataBase/db.js";

async function postClient(req,res){
    const client = req.body;

    try{
        await connection.query(
            `
            INSERT INTO clients (name, address, phone)

            VALUES ($1,$2,$3)
            `,
            [client.name, client.address, client.phone]
        );

        res.status(201).send("Cliente cadastrado");
    }
    catch(err){
        console.log("Erro ao cadastrar cliente");
        console.log(err);
        res.status(500).send("Erro no servidor");
    }
};

async function getClientOrders(req,res){

    const {id} = req.params
    try{
        const request = await connection.query(
            `
            SELECT orders.id as "orderId", orders.quantity as quantity, orders."createdAt" as "createdAt", orders."totalPrice" as "totalPrice", cakes.name as "cakeName"
            FROM orders
            JOIN cakes
            ON cakes.id = orders."cakeId"
            JOIN clients
            ON clients.id = orders."clientId"
            WHERE clients.id = $1
            `,
            [id]
        );

        res.status(200).send(request.rows);
    }
    catch(err){
        console.log("Erro ao buscar Clientes");
        console.log(err);
        res.status(500).send("Erro no servidor");
    }
};

const clientControllers = {
    postClient,
    getClientOrders
}

export default clientControllers
import connection from "../DataBase/db.js"

async function findCake(req,res, next){

    const {name} = req.body

    try{
        const request = await connection.query(
            `
            SELECT * FROM cakes
            WHERE cakes.name = $1
            `,
            [`${name}`]

        );

        if (request.rowCount > 0) {
            res.status(409).send("Bolo já cadastrado");
            return
        }

        next();
    }
    catch(err){
        console.log("Erro ao buscar bolo");
        console.log(err);
        res.status(500).send("Erro no servidor");
    }
}

async function findClientName(req, res, next){
    const {name} = req.body

    try{
        const request = await connection.query(
            `
            SELECT * FROM clients
            WHERE clients.name = $1
            `,
            [`${name}`]

        );

        if (request.rowCount > 0) {
            res.status(409).send("Cliente já cadastrado");
            return
        }

        next();
    }
    catch(err){
        console.log("Erro ao buscar cliente");
        console.log(err);
        res.status(500).send("Erro no servidor");
    }
}

async function findClientId(req,res,next){
    const {clientId} = req.body;
    const {id} = req.params;

    let search;

    (id) ? search = id : search = clientId; 

    try{
        const request = await connection.query(
            `
            SELECT * FROM clients
            WHERE clients.id = $1
            `,
            [`${search}`]

        );

        if (request.rowCount === 0) {
            res.status(404).send("Cliente não cadastrado");
            return
        }

        next();
    }
    catch(err){
        console.log("Erro ao buscar cliente");
        console.log(err);
        res.status(500).send("Erro no servidor");
    }
}

async function findCakeId(req,res,next){
    const {cakeId} = req.body

    try{
        const request = await connection.query(
            `
            SELECT * FROM cakes
            WHERE cakes.id = $1
            `,
            [`${cakeId}`]

        );

        if (request.rowCount === 0) {
            res.status(404).send("Bolo não cadastrado");
            return
        }

        next();
    }
    catch(err){
        console.log("Erro ao buscar Bolo");
        console.log(err);
        res.status(500).send("Erro no servidor");
    }
}

const middlewares = {
    findCake,
    findClientName,
    findClientId,
    findCakeId
}

export default middlewares
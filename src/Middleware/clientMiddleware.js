import connection from "../DataBase/db.js"

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



const clientMiddlewares = {
    findClientName,
    findClientId
}

export default clientMiddlewares
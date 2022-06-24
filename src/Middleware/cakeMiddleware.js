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

const cakeMiddlewares = {
    findCake,
    findCakeId
}

export default cakeMiddlewares
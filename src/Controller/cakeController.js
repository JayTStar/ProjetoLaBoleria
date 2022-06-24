import connection from "../DataBase/db.js";

async function postCake(req,res){
    const cake = req.body;

    try{
        await connection.query(
            `
            INSERT INTO cakes (name, price, description, image)

            VALUES ($1,$2,$3,$4)
            `,
            [cake.name, cake.price, cake.description, cake.image]
        );

        res.status(201).send("Bolo cadastrado");
    }
    catch(err){
        console.log("Erro ao cadastrar bolo");
        console.log(err);
        res.status(500).send("Erro no servidor");
    }
};

const cakeControllers = {
    postCake
};

export default cakeControllers;
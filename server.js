const express = require("express");
const cors = require("cors");

const { MercadoPagoConfig, Preference } = require("mercadopago");

const app = express();

app.use(cors());
app.use(express.json());

const client = new MercadoPagoConfig({
    accessToken: "APP_USR-6607379424235077-052514-a3f7b28d1f7e7af7aa9ee1609b90045a-3244405000"
});

app.post("/criar-preferencia", async (req, res) => {

    try {

        const preference = new Preference(client);

        const response = await preference.create({

            body: {

                items: req.body.itens.map(item => ({

                    title: item.nome,

                    quantity: 1,

                    currency_id: "BRL",

                    unit_price: Number(item.valor)

                })),

                back_urls: {

    success: "https://comercioteste.netlify.app/sucesso.html",

    failure: "https://comercioteste.netlify.app/erro.html",

    pending: "https://comercioteste.netlify.app/pendente.html"

},

        auto_return: "approved",


            }

        });

        res.json({
            init_point: response.init_point
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            erro: "Erro ao criar preferência"
        });

    }

});

app.listen(3000, () => {

    console.log("Servidor rodando na porta 3000");

});
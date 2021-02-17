"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const plaid_1 = __importDefault(require("plaid"));
const app = express_1.default();
const port = process.env.PORT || 5000;
const clientID = process.env.CLIENT_ID || "";
const secret = process.env.SECRET || "";
app.listen(port, () => console.log(`Listening on port ${port}`));
const plaidClient = new plaid_1.default.Client({
    clientID,
    secret,
    env: plaid_1.default.environments.sandbox,
    options: { version: "2019-05-29" },
});
app.get("/getToken", (req, res) => {
    const id = req.query.id;
    const email = req.query.email;
    plaidClient
        .createLinkToken({
        client_name: "week",
        language: "en",
        country_codes: ["US"],
        user: {
            client_user_id: id,
            email_address: {
                value: email,
            },
        },
        products: ["auth", "transactions"],
    })
        .then((r) => {
        console.log(r);
        const link_token = r.link_token;
        res.json({ link_token });
    })
        .catch((e) => {
        console.log(e);
        res.json(e);
    });
});
//# sourceMappingURL=server.js.map
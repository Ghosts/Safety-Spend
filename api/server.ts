import express from "express";
import plaid from "plaid";

const app = express();
const port = process.env.PORT || 5000;
const clientID = process.env.CLIENT_ID || "";
const secret = process.env.SECRET || "";

app.listen(port, () => console.log(`Listening on port ${port}`));

const plaidClient = new plaid.Client({
  clientID,
  secret,
  env: plaid.environments.sandbox,
  options: { version: "2019-05-29" },
});

app.get("/getToken", (req, res) => {
  const id = req.query.id as string;
  const email = req.query.email as string;
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

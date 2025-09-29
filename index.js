import express from "express";
import "dotenv/config";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.get("/secret", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res
      .status(401)
      .set("WWW-Authenticate", 'Basic realm="Accès restreint"')
      .send("Authentification requise.");
    return;
  }

  const [username, password] = Buffer.from(authHeader.split(" ")[1], "base64")
    .toString()
    .split(":");

  if (
    username === process.env.APP_USERNAME &&
    password === process.env.APP_PASSWORD
  ) {
    res.send(process.env.APP_SECRET_MESSAGE);
  } else {
    res.status(401).send("Identifiants incorrects.");
  }
});

app.listen(port, () => {
  console.log(`Serveur démarré et à l'écoute sur http://localhost:${port}`);
});

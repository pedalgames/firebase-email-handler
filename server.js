const express = require("express");
const path = require("path");
const { handleEmailVerification } = require("./services/emailVerification");
const {
  handlePasswordUpdation,
  handlePasswordPage,
} = require("./services/resetPassword");
const { handleRecoverEmail } = require("./services/emailRecovery");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "index.html"));
});

app.get("/__/auth/action", (req, res) => {
  const { mode } = req.query;

  switch (mode) {
    case "verifyEmail":
      handleEmailVerification(req, res);
      break;
    case "resetPassword":
      handlePasswordPage(req, res);
      break;
    case "recoverEmail":
      handleRecoverEmail(req, res);
      break;
    default:
      res.status(400).send("Invalid mode specified");
  }
});

app.post("/__/auth/action", (req, res) => {
  const { mode } = req.body;

  switch (mode) {
    case "resetPassword":
      handlePasswordUpdation(req, res);
      break;
    default:
      res.status(400).send("Invalid mode specified");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

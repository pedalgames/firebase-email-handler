const { initializeApp } = require("firebase/app");
const {
  getAuth,
  checkActionCode,
  applyActionCode,
  sendPasswordResetEmail,
} = require("firebase/auth");
const fs = require("fs");
const path = require("path");

module.exports.handleRecoverEmail = async (req, res) => {
  const { oobCode, apiKey } = req.query;

  if (!oobCode) {
    return res.status(400).send("Invalid request: Missing oobCode");
  }

  if (!apiKey) {
    return res.status(400).send("Invalid request: Firebase api key is missing");
  }

  try {
    const config = {
      apiKey: apiKey,
    };
    const firebaseApp = initializeApp(config);
    const auth = getAuth(firebaseApp);

    const info = await checkActionCode(auth, oobCode);
    const restoredEmail = info.data.email;

    await applyActionCode(auth, oobCode);
    await sendPasswordResetEmail(auth, restoredEmail);

    const htmlTemplate = fs.readFileSync(path.join(__dirname, "../pages/emailRecovery.html"), "utf8");

    const responseHtml = htmlTemplate.replace("{{email}}", restoredEmail);

    res.send(responseHtml);
  } catch (error) {
    console.error("Error processing email verification", error);
    res.status(400).send("Error processing request");
  }
};

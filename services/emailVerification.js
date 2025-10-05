const { initializeApp } = require("firebase/app");
const { getAuth, applyActionCode } = require("firebase/auth");
const path = require('path');
const fs = require('fs');

module.exports.handleEmailVerification = async (req, res) => {
  const { mode, oobCode, apiKey, continueUrl } = req.query;

  if (!oobCode) {
    return res.status(400).send("Invalid request: Missing oobCode");
  }

  if (!apiKey) {
    return res.status(400).send("Invalid request: Firebase API key is missing");
  }

  try {
    const config = {
      apiKey: apiKey,
    };
    const firebaseApp = initializeApp(config, apiKey); // Use apiKey as app name to avoid conflicting configurations for the [DEFAULT] app
    const auth = getAuth(firebaseApp);

    await applyActionCode(auth, oobCode);

    const emailVerificationHtml = fs.readFileSync(path.join(__dirname, '..', 'pages', 'emailVerification.html'), 'utf-8');

    const updatedHtml = emailVerificationHtml.replace("{{continueUrl}}", continueUrl);

    res.send(updatedHtml);
  } catch (error) {
    console.error("Error processing email verification", error);
    res.status(400).send("Error processing request");
  }
};

const { getAuth, verifyPasswordResetCode, confirmPasswordReset } = require("firebase/auth");
const { initializeApp } = require("firebase/app");
const fs = require("fs");
const path = require("path");

const loadHTMLTemplate = (templateName, placeholders) => {
  let html = fs.readFileSync(path.join(__dirname, "../pages", templateName), "utf-8");
  for (let key in placeholders) {
    const regex = new RegExp(`{{${key}}}`, "g");
    html = html.replace(regex, placeholders[key]);
  }
  return html;
};

module.exports.handlePasswordPage = async (req, res) => {
  const { mode, oobCode, apiKey, continueUrl } = req.query;

  const html = loadHTMLTemplate("resetPassword.html", {
    mode,
    oobCode,
    apiKey,
    continueUrl,
  });
  res.send(html);
};

module.exports.handlePasswordUpdation = async (req, res) => {
  const { oobCode, apiKey, newPassword, continueUrl } = req.body;

  if (!oobCode || !apiKey || !newPassword) {
    const html = loadHTMLTemplate("errorPage.html", {
      message: "Invalid request: Missing required fields",
    });
    return res.status(400).send(html);
  }

  try {
    const config = { apiKey };
    const firebaseApp = initializeApp(config);
    const auth = getAuth(firebaseApp);

    await verifyPasswordResetCode(auth, oobCode);

    await confirmPasswordReset(auth, oobCode, newPassword);

    const html = loadHTMLTemplate("passwordResetSuccess.html", { continueUrl });
    res.send(html);
  } catch (error) {
    console.error("Error processing password reset", error);

    let errorMessage = "Error processing request";
    if (error.code === "auth/expired-action-code") {
      errorMessage = "The password reset link has expired. Please request a new one.";
    } else if (error.code === "auth/invalid-action-code") {
      errorMessage = "The password reset link is invalid.";
    }

    const html = loadHTMLTemplate("errorPage.html", { message: errorMessage });
    res.send(html);
  }
};

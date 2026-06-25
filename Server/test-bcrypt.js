const bcrypt = require("bcrypt");

async function Bcrypt() {
  try {
    const hash = await bcrypt.hash("hello123", 12);
    console.log("Hashed password:", hash);
    const isMatch = await bcrypt.compare("hello123", hash);
    console.log("Password matches:", isMatch);

    const isWrong = await bcrypt.compare("wrongpassword", hash);
    console.log("Wrong password matches:", isWrong);
  } catch {
    console.log("Caught Error");
  }
}

Bcrypt();


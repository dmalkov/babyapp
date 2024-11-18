const fs = require("fs");
const path = require("path");

exports.handler = async function(event, context) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  // Parse the incoming data
  const data = JSON.parse(event.body);
  const { firstName, familyName } = data;

  // Define the file path for saving names
  const filePath = path.join(__dirname, `names.json`);

  // Load the existing data if the file exists
  let existingData = { Malkov: [], Shamath: [] };
  if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath, "utf8");
    existingData = JSON.parse(fileData);
  }

  // Append the new name to the appropriate family list
  if (familyName === "Malkov") {
    existingData.Malkov.push(firstName);
  } else if (familyName === "Shamath") {
    existingData.Shamath.push(firstName);
  }

  // Write the updated data back to the file
  fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Name saved successfully!" }),
  };
};

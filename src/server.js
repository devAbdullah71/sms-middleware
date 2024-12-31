const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.post("/send-sms", async (req, res) => {
  const { phoneNumber, message } = req.body;
  const url = "http://sms.connectsaudi.com/sendurlcomma.aspx";

  const params = new URLSearchParams({
    user: "armaapi",
    pwd: "bbu6y4be",
    senderid: "OPTIMO",
    CountryCode: "966",
    mobileno: phoneNumber,
    msgtext: message,
    smstype: "0",
  });

  console.log(`${url}?${params.toString()}`);

  try {
    const response = await axios.get(`${url}?${params.toString()}`);

    // if (!response.ok) {
    //   throw new Error(`HTTP error! Status: ${response.status}`);
    // }

    const data = await response;
    console.log(data);
    console.log("SMS sent successfully:", response);
    // return data;
  } catch (error) {
    console.error("Error sending SMS:", error.message);
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Middleware running on port ${PORT}`));

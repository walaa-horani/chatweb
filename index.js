const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

// Middleware configuration
app.use(express.json());
app.use(cors({ origin: "https://chatwithfriendsonline.netlify.app/" }));

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;
  try {
    const response = await axios.put("https://api.chatengine.io/users/", 
      { username: username, secret: username, first_name: username },
      { headers: { "private-key": "4ba3748d-6ebe-4faf-9283-8440b7a5024f" } }
    );
    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(error.response?.status || 500).json(error.response?.data || { error: "Internal Server Error" });
  }
});

// Server listens on port 3001
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require("express");
app.use(cors({ origin: "https://your-netlify-domain.netlify.app" }));
const { default: axios } = require("axios");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
    const { username } = req.body;
    try {
      const r = await axios.put("https://api.chatengine.io/users/", 
        { username: username, secret: username, first_name: username },
        { headers: { "private-key": "4ba3748d-6ebe-4faf-9283-8440b7a5024f" } }
      );
      return res.status(r.status).json(r.data);
    } catch (e) {
      console.error("Error occurred:", e);
      return res.status(e.response?.status || 500).json(e.response?.data || { error: "Internal Server Error" });
    }
  });
  

app.listen(3001);

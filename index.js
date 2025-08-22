const express = require("express");
const Parser = require("rss-parser");

const app = express();
const port = process.env.PORT || 3000;
const parser = new Parser();

// Middleware để parse JSON body
app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ VNExpress API is running");
});

app.get("/news", async (req, res) => {
  try {
    const feed = await parser.parseURL(
      "https://vnexpress.net/rss/tin-moi-nhat.rss"
    );
    res.json(
      feed.items.map((item) => ({
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
      }))
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Thêm POST route
app.post("/", (req, res) => {
  console.log("📩 Data received:", req.body);
  res.json({
    message: "✅ Data received successfully",
    data: req.body,
  });
});

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});

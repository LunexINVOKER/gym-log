const app = require("./app");
const client = require("./db/client");

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await client.connect();
    console.log("✅ Connected to PostgreSQL");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to DB:", err.message);
    process.exit(1);
  }
}

startServer();
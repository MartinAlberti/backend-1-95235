import app from "./src/server.js";
import env from './src/config/env.config.js'
const PORT = env.port
app.listen(PORT, console.log(`Server running on http://localhost:${PORT}`))
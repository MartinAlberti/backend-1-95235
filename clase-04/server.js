import app from "./src/app.js";
import env from './config/env.config.js'


const PORT= env.port
// run
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));

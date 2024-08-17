import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import server from "./server";
import { CONFIG } from "config";
import swaggerDocs from './swagger'

const env = dotenv.config({ path: `${__dirname}/.env` });
dotenvExpand.expand(env);

const PORT = CONFIG.PORT;
try {
    server.listen(PORT, () => console.log(`Server is live at localhost:${PORT}`));
    swaggerDocs(server, PORT)
} catch (error) {
    console.log('Cannot connect to the server')
}
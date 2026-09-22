import "dotenv/config";

import app from './app'

import createDatabase from "./config/database";
const PORT = process.env.PORT || 5120;

const startServer = async () => {
    try {
        await createDatabase();

        app.listen(PORT, () => {
            console.log('Server is ruing on PORT :>> ', PORT);
        })
    } catch (errr) {
        console.error("Failed to start server:", errr);
        process.exit(1);
    }
}
startServer()




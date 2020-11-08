import * as express from "express";
import DBLoader from "./loaders/DBLoader";
import { DDTLogger } from "./helpers";


const start = async () => {
    await DBLoader();

    const { router } = require("./routers");

    const app = express();


    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(router);


    app.listen(process.env.PORT || 3000, () => {
        DDTLogger.log(`server is running on port ${process.env.PORT || 3000} ... `);
    });

}
start().catch(err => console.log(err))
const app = require("./app");
const connectDb = require("./config/db");
const { server_port } = require("./secret");



app.listen(server_port, ()=>{
    console.log(`server is running at http://localhost:${server_port}`);
    connectDb();
});
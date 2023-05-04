const app = require('./app.js');
const {connectDataBase} = require('./config/database.js');
connectDataBase();
const server = app.listen(process.env.PORT ,()=>{
    console.log(`server is listening over port ${process.env.PORT}`);
});
process.on('unhandledRejection',()=>{
    console.log("unhandledRejectionerror")
    console.log("shouting down the server ")
    server.close(()=>{
          process.exit(1);
      });
});

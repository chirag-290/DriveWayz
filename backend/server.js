const http=require('http');
const app=require('./app');

const port=process.env.PORT ||  8000



const server=http.createServer(app);
server.listen(8000,() =>{
    console.log(`server running at port ${port}`);
})
const express= require('express');
const dotenv= require('dotenv');
const { healthRouter } = require('./routes');
const { shopRouter}= require('./routes');

const app=express();
dotenv.config();

const port= process.env.PORT||8080;

app.use('/health', healthRouter);
app.use('/shop', shopRouter);
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
  
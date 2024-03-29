const express = require('express')
const dbConnect = require('./mongodb')
const cors = require('cors');
const app = express()
app.use(cors());
app.use(express.json());
const port = 5001

app.post('/',async (req,resp)=>{
  let data = await dbConnect();
  let result = await data.insertOne(req.body);
  resp.send(result);
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
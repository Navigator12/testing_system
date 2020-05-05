const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
require('dotenv').config()

const app = express()

app.use(express.json({ extended: true }))
app.use(cors());
app.use('/api/auth', require('./routes/auth.routes'))

const PORT = process.env.PORT || 4000

const startDb = async () => {
  try {
    await mongoose.connect(process.env.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
  } catch (e) {
    console.log('Database server error')
    process.exit(1)
  }
}

startDb()
  .then(() => console.log('Successfully connected to DB'))

app.listen(PORT, () => console.log(`App has been started on port ${PORT}`))

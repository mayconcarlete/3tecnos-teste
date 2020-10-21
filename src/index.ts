import 'module-alias/register'
import mongoose from 'mongoose'
import app from './main/config/app'
const port = 3000 || process.env.SERVER_PORT
mongoose.connect('mongodb://maykids:w2w2w2w2@ds221609.mlab.com:21609/tests', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(port, () => {
      console.log('estamos on fire')
    })
  ).catch(e => {
    console.log(e)
  })

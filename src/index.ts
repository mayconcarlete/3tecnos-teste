import 'module-alias/register'
import mongoose from 'mongoose'
import app from './main/config/app'

mongoose.connect('mongodb://maykids:w2w2w2w2@ds221609.mlab.com:21609/tests', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(3000, () => {
      console.log('estamos on fire')
    })
  ).catch(e => {
    console.log('err')
  })

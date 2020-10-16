import mongoose, { Mongoose } from 'mongoose'

export class MongoConfig {
  async connect (): Promise<Mongoose> {
    const connection = await mongoose.connect('mongodb://maykids:w2w2w2w2@ds221609.mlab.com:21609/tests', { useNewUrlParser: true, useUnifiedTopology: true })
    return connection
  }

  async disconnect (): Promise<void> {
    // eslint-disable-next-line no-void
    void mongoose.disconnect()
  }
}

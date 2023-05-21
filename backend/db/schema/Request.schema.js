import mongoose from "mongoose"

const RequestSchema = mongoose.Schema({
  scanResult: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  }
})

export default RequestSchema

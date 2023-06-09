import mongoose from "mongoose"

const UserRequestSchema = mongoose.Schema({
  host: {
    type: String,
    required: true,
  },
  scanType: {
    type: String,
  },
  maxRetries: {
    type: String,
    required: false,
  },
  hostTimeout: {
    type: String,
    required: false,
  },
  port: {
    type: String,
    required: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  }
})

export default UserRequestSchema

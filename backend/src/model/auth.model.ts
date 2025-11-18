import { model, models, Schema } from "mongoose";
import bcrypt from "bcrypt"

interface AuthInterface {
  fullname: string
  email: string
  mobile: string
  password: string
  avatar?: string | null
  refreshToken?: string | null
  expiry?: Date | null
}

const authSchema = new Schema<AuthInterface>({
  fullname: {
    type: String,
    trim: true,
    lowercase: true,
    required:[ true, "Fullname required."],
  },
  email: {
    type: String,
    trim: true,
    unique: [true, "Email Id should be unique"],
    required: true,
  },
  mobile: {
    type: String,
    trim: true,
    unique: [true, "Mobile no. should be unique."],
    required: true,
  },
  avatar: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  refreshToken: {
    type: String,
  },
  expiry: {
    type: Date,
  },
}, {timestamps: true, strict: true})

authSchema.pre('save', async function (next) {
  if(!this.isModified("password")) 
    next()

  this.password = await bcrypt.hash(this.password.toString(), 12)
  this.refreshToken = null
  this.expiry = null
  next()
  
})

const AuthModel = models.Auth || model("Auth", authSchema)

export default AuthModel
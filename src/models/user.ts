import mongoose from "mongoose";
const { Schema } = mongoose;
import { Password } from "../services";

interface UserAttrs {
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<IUser> {
  build(attrs: UserAttrs): IUser;
}

interface IUser extends mongoose.Document {
  email: string;
  password: string;
  isVerified: boolean;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    password: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        (ret.id = ret._id), delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);


UserSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

UserSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

const User = mongoose.model<IUser, UserModel>("User", UserSchema);

export { User };

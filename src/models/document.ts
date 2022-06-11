import mongoose from "mongoose";
const { Schema } = mongoose;

interface DocumentAttrs {
  id: string;
  isVaccine: Boolean;
  testResult: string;
  ticket: string;
}

interface DocumentModel extends mongoose.Model<IDocument> {
  build(attrs: DocumentAttrs): IDocument;
}

interface IDocument extends mongoose.Document {
  id: string;
  isVaccine: Boolean;
  testResult: string;
  ticket: string;
}

const DocumentSchema = new Schema<IDocument>(
  {
    id: {
      type: String,
    },
    testResult: {
      type: String,
    },
    isVaccine: {
      type: Boolean,
      default: false,
    },
    ticket: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        (ret.id = ret._id), delete ret._id;
        delete ret.__v;
      },
    },
  }
);

DocumentSchema.statics.build = (attrs: DocumentAttrs) => {
  return new Document(attrs);
};

DocumentSchema.pre("save", async function (done) {
  done();
});

const Document = mongoose.model<IDocument, DocumentModel>(
  "Document",
  DocumentSchema
);

export { Document };

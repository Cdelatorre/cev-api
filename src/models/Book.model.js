const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id; // copiar _id en id
        delete ret._id; // eliminar _id
      },
    },
  }
);

module.exports = mongoose.model("Book", bookSchema);

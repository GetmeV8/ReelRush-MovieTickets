const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const screenSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, " Screen Name is require"],
  },
  seating_capacity: {
    type: Number,
    required: true,
  },
  row: {
    type: Number,
    required: true,
  },
  column: {
    type: Number,
    required: true,
  },
  screen_type: {
    type: String,
    required: true,
  }
});

const theaterAdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, " Email is required"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, " Name is required"],
  },
  place: {
    type: String,
    required: [true, " Place is required"],
  },
  password: {
    type: String,
    required: [true, " Password is required"],
  },
  accepted: {
    type: Boolean,
  },
  screens:[screenSchema]
});

// theaterAdminSchema.pre("save", async function (next) {
//   const salt = await bcrypt.genSalt();
//   this.password = await bcrypt.hash(this.password, salt);
// });
theaterAdminSchema.pre("save", async function (next) {
  // No bcrypt hashing, store the password in plain text
  // Note: This is not secure and not recommended for production use
  // You should consider using bcrypt or other secure hashing methods

  // Save the password as it is (plain text)
  // Ensure you understand the risks associated with storing passwords in plain text
  // before using this approach in a production application
  next();
});


module.exports = mongoose.model("theatres", theaterAdminSchema);


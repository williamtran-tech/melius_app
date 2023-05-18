// Why I need using plugin:
// Purpose:
// Suppose that we want to track when a record was created and last updated on every collection in our database. Instead of repeating the above process, we can create a plugin and apply it to every schema.
module.exports = function timestamp(schema) {
  // Add the two fields to the schema
  schema.add({
    createdAt: Date,
    updatedAt: Date,
  });

  // Create a pre-save hook
  schema.pre("save", function (next) {
    let now = Date.now();

    console.log(now);
    this.updatedAt = now;
    // Set a value for createdAt only if it is null
    if (!this.createdAt) {
      this.createdAt = now;
    }
    // Call the next function in the pre-save chain
    next();
  });
};

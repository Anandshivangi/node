  const knex = require("../src/config/db");
exports.up = function (knex) {
  return knex.schema.createTable("students", function (table) {
    table.increments("id").primary();
    table.string("name", 255).notNullable();
    table.string("email", 255).notNullable();
    table.string("password", 255).notNullable();
    table.string("token", 255).notNullable();
  });
};

exports.down = function (knex) {
    return knex.schema
      .dropTable("students");
};

exports.up = async function (knex) {
  await knex.schema.table("students", (table) => {
    table.string("image", 255).notNullable();
  });
};

exports.down = async function (knex) {
  await knex.schema.table("students", (table) => {
    table.dropColumn("image");
  });
};

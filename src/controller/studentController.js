const knex = require("../config/db");

const signUp = async (req, res) => {
  try {
    const { name } = req.body;

    const insert = await knex("students").insert({ name });

    res.send({ status: 1, message: "name inserted" });
  } catch (error) {
    console.log(error);

    res.send({ status: 0, message: "internal server error " });
  }
};

const login = async (req, res) => {
  const { email } = req.body;

  res.send(email);
};

const read = async (req, res) => {
  const [name, email] = await knex("students").select("name", "email");

  res.send({ name, email });
};

const showById = async (req, res) => {
  const id = req.params.id;
  const show = await knex("students").where({ id }).select("name");
  res.send(show);
};
const update = async (req, res) => {
  const { id } = req.body;
  const upd = await knex("students").where({ id :id }).update();
};

const image = async (req, res) => {
  const file = req.file;
  console.log(file);
  const image = file.filename;
  const imageInsert = await knex("students").insert({ image: image });
  if (imageInsert) {
    res.send({
      status: 1,
      message: "image inserted",
    });
  } else {
    res.send({
      status: 0,
      message: "internal server error",
    });
  }
};

const multipleImage = async (req, res) => {
  try {
    const multiplefile = req.files;
    const filenames = multiplefile.map((file) => "http://localhost:8080/"+file.filename);

    const imageInsert = await knex("students").insert({
      image: JSON.stringify(filenames),
    });
    if (imageInsert) {
      res.send({
        status: 1,
        message: "Images uploaded and inserted into the database successfully",
      });
    } else {
      res.send({
        status: 1,
        message:
          "Images not uploaded and inserted into the database successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.send({ error: error });
  }
};

module.exports = { signUp, login, showById, read, image, multipleImage };

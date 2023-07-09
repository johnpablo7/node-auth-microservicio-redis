const express = require("express");
const response = require("../../../network/response");
const Controller = require("./index");
const router = express.Router();

router.get("/", (req, res) => {
  // res.send("Todo funciona"); // Se muestra como texto en el Navegador
  Controller.listUser()
    .then((listing) => {
      response.success(req, res, listing, 200);
    })
    .catch((err) => {
      response.error(req, res, err.message, 500);
    });
});

router.get("/:id", (req, res) => {
  Controller.getUser(req.params.id)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch((err) => {
      response.error(req, res, err.message, 500);
    });
});

router.post("/", (req, res) => {
  Controller.upsertUser(req.body)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch((err) => {
      response.error(req, res, err.message, 500);
    });
});

router.delete("/:id", (req, res) => {
  Controller.deleteUser(req.params.id)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch((err) => {
      response.error(req, res, err.message, 500);
    });
});

module.exports = router;

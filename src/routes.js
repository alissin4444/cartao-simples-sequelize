const express = require("express");

const UserController = require("./controllers/UserController");
const PurchaseController = require("./controllers/PurchaseController");
const PortionController = require("./controllers/PortionController");

const routes = express.Router();

routes.get("/", (req, res) => {
    return res.json({ helloworld: "helloworld" })
})

routes.get("/users", UserController.index);
routes.post("/users", UserController.store);
routes.get("/users/:id", UserController.show);
routes.put("/users/:id", UserController.update);
routes.delete("/users/:id", UserController.destroy); 

routes.get("/purchases", PurchaseController.index);
routes.post("/users/:id/purchases", PurchaseController.store);
routes.get("/purchases/:id", PurchaseController.show);
routes.delete("/purchases/:id", PurchaseController.destroy);

routes.put("/users/:user_id/purchases/:purchase_id/portions/:portion_id", PortionController.update);

module.exports = routes;
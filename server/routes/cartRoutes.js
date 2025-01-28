// cartRoutes.js

const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const cartModel = require("../models/cartModel");

// Route to get shopping cart for a user
router.get("/:userId", cartController.getShoppingCart);

// Route to add a product to the shopping cart
router.post("/add", cartController.addToCart);

// Route to remove a product from the shopping cart
router.delete("/remove/:productId/:userId", cartController.removeFromCart);

// Route to complete purchase and update views
router.post("/buy/:id", cartController.buy);

// Route to initialize triggers and views (optional, admin-level setup)
router.post("/setup/views-and-triggers", (req, res) => {
    Promise.all([
        cartModel.createTriggerForProductStock(),
        cartModel.createUserOrderSummaryView()
    ])
        .then(results => {
            res.send({
                message: "Triggers and views initialized successfully.",
                results
            });
        })
        .catch(err => {
            console.error("Error initializing triggers/views:", err.message);
            res.status(500).send("Error setting up triggers and views.");
        });
});

module.exports = router;
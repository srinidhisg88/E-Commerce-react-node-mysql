// cartModel.js with Trigger and View Enhancements

const pool = require("../database/connection");

// Trigger: Automatically update product stock on adding items to productsInOrder
exports.createTriggerForProductStock = () => {
    return new Promise((resolve, reject) => {
        const triggerQuery = `
        CREATE TRIGGER updateProductStock
        AFTER INSERT ON productsInOrder
        FOR EACH ROW
        BEGIN
            UPDATE product
            SET stock = stock - NEW.quantity
            WHERE productId = NEW.productId;
        END;
        `;

        pool.query(triggerQuery, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve("Trigger for product stock updates created successfully.");
            }
        });
    });
};

// View: User Order Summary
exports.createUserOrderSummaryView = () => {
    return new Promise((resolve, reject) => {
        const viewQuery = `
       CREATE OR REPLACE VIEW PastOrdersView AS
SELECT 
    O.orderId, 
    O.userId,
    P.name AS productName, 
    O.createdDate, 
    PIN.quantity, 
    PIN.totalPrice
FROM 
    orders O
INNER JOIN 
    productsInOrder PIN ON O.orderId = PIN.orderId
INNER JOIN 
    product P ON PIN.productId = P.productId
ORDER BY 
    O.orderID DESC;
        `;

        pool.query(viewQuery, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve("View for user order summary created successfully.");
            }
        });
    });
};

// Existing cartModel.js logic
exports.getShoppingCart = (userId) => {
    return new Promise((resolve, reject) => {
        pool.query(
            "SELECT S.quantity, P.name, P.price, P.productId FROM shopingCart S INNER JOIN product P ON S.productId = P.productId WHERE S.userId = ?",
            [userId],
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }
        );
    });
};

exports.addToCart = (customerId, productId, quantity, isPresent) => {
    return new Promise((resolve, reject) => {
        if (isPresent) {
            pool.query(
                "UPDATE shopingCart SET quantity = quantity + ? WHERE productId = ? AND userId = ?",
                [quantity, productId, customerId],
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        } else {
            pool.query(
                "INSERT INTO shopingCart (userId, productId, quantity) VALUES (?, ?, ?)",
                [customerId, productId, quantity],
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        }
    });
};

exports.removeFromCart = (productId, userId) => {
    return new Promise((resolve, reject) => {
        pool.query(
            "DELETE FROM shopingCart WHERE productId = ? AND userId = ?",
            [productId, userId],
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }
        );
    });
};


exports.buy = (customerId, address) => {
    return new Promise((resolve, reject) => {
        // Create order
        pool.query(
            "INSERT INTO orders (userId, address) VALUES (?, ?);",
            [customerId, address],
            (err, orderResult) => {
                if (err) {
                    reject(err);
                } else {
                    // Move items from shopping cart to products in order
                    pool.query(
                        "INSERT INTO productsInOrder (orderId, productId, quantity, totalPrice) " +
                        "SELECT (SELECT max(orderId) FROM orders WHERE userId = ?), S.productId, S.quantity, P.price * S.quantity " +
                        "FROM shoppingCart S INNER JOIN product P ON S.productId = P.productId " +
                        "WHERE S.userId = ?;",
                        [customerId, customerId],
                        (err, productsResult) => {
                            if (err) {
                                reject(err);
                            } else {
                                // Update total price in order table
                                pool.query(
                                    "UPDATE orders O " +
                                    "SET totalPrice = (SELECT SUM(P.totalPrice) " +
                                    "FROM productsInOrder P " +
                                    "WHERE O.orderId = P.orderId " +
                                    "GROUP BY O.orderId) " +
                                    "WHERE userId = ? AND totalPrice IS NULL;",
                                    customerId,
                                    (err, totalPriceResult) => {
                                        if (err) {
                                            reject(err);
                                        } else {
                                            // No need to manually clear shopping cart, trigger will do that
                                            resolve({ orderResult, productsResult, totalPriceResult });
                                        }
                                    }
                                );
                            }
                        }
                    );
                }
            }
        );
    });
};

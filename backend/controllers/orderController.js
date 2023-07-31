import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

// Route: GET /api/orders
// Access: Private
// Controller: addOrderItems
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items!");
  } else {
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// Route: GET /api/orders/:id
// Access: Private
// Controller: getOrderById
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found!");
  }
});

// Route: GET /api/orders/:id/pay
// Access: Private
// Controller: updateOrderToPaid
const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send("update order to paid");
});

// Route: GET /api/orders/:id/deliver
// Access: Private
// Controller: updateOrderToDelivered
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send("update order to delivered");
});

// Route: GET /api/orders/mine
// Access: Private
// Controller: getMyOrders
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// Route: GET /api/orders
// Access: Private
// Controller: getOrders
const getOrders = asyncHandler(async (req, res) => {
  res.send("get all orders");
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
};

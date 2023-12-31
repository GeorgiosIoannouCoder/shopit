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
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found!");
  }
});

// Route: PUT /api/orders/:id/pay
// Access: Private
// Controller: updateOrderToPaid
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found!");
  }
});

// Route: PUT /api/orders/:id/deliver
// Access: Private
// Controller: updateOrderToDelivered
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found!");
  }
});

// Route: GET /api/orders/myorders
// Access: Private
// Controller: getMyOrders
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

// Route: GET /api/orders
// Access: Private
// Controller: getOrders
const getOrders = asyncHandler(async (req, res) => {
  // const orders = await Order.find({}).populate("user", "id name");
  // res.status(200).json(orders);

  const pageSize = 2;

  const page = Number(req.query.pageNumber) || 1;

  const count = await Order.countDocuments();

  const orders = await Order.find({})
    .populate("user", "id name")
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.status(200).json({ orders, page, pages: Math.ceil(count / pageSize) });
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
};

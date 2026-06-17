const { Router } = require("express");
const fetch = require("node-fetch");
const router = Router();

const API = "http://api-gateway:9001/orders";

router.get("/", async (req, res) => {
  const r = await fetch(API);
  const data = await r.json();
  res.render("orders", { orders: data });
});

router.post("/add", async (req, res) => {
  const payload = {
    customerName: req.body.customerName,
    orderDate: new Date(req.body.orderDate).toISOString(),
    totalAmount: Number(req.body.totalAmount),
    status: req.body.status,
  };

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  res.redirect("/orders");
});

router.get("/delete/:id", async (req, res) => {
  await fetch(`${API}/${req.params.id}`, {
    method: "DELETE",
  });

  res.redirect("/orders");
});

router.get("/edit/:id", async (req, res) => {
  const r = await fetch(`${API}/${req.params.id}`);
  const order = await r.json();
  res.render("edit-order", { order });
});

router.post("/edit/:id", async (req, res) => {
  const payload = {
    customerName: req.body.customerName,
    orderDate: new Date(req.body.orderDate).toISOString(),
    totalAmount: Number(req.body.totalAmount),
    status: req.body.status,
  };

  await fetch(`${API}/${req.params.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  res.redirect("/orders");
});

module.exports = router;

const { Router } = require("express");
const fetch = require("node-fetch");
const router = Router();

const API = "http://api-gateway:9001/payments";

router.get("/", async (req, res) => {
  const r = await fetch(API);
  const data = await r.json();
  res.render("payments", { payments: data });
});

router.post("/add", async (req, res) => {
  const payload = {
    orderId: req.body.orderId,
    amount: Number(req.body.amount),
    paymentDate: new Date(req.body.paymentDate).toISOString(),
    paymentMethod: req.body.paymentMethod,
    status: req.body.status,
  };

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  res.redirect("/payments");
});

router.get("/delete/:id", async (req, res) => {
  await fetch(`${API}/${req.params.id}`, {
    method: "DELETE",
  });

  res.redirect("/payments");
});

router.get("/edit/:id", async (req, res) => {
  const r = await fetch(`${API}/${req.params.id}`);
  const payment = await r.json();
  res.render("edit-payment", { payment });
});

router.post("/edit/:id", async (req, res) => {
  const payload = {
    orderId: req.body.orderId,
    amount: Number(req.body.amount),
    paymentDate: new Date(req.body.paymentDate).toISOString(),
    paymentMethod: req.body.paymentMethod,
    status: req.body.status,
  };

  await fetch(`${API}/${req.params.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  res.redirect("/payments");
});

module.exports = router;

const express = require("express");
const services = require("./config/services");

const app = express();

app.use(express.json());

const INVENTORY = services.inventory;
const ORDERS = services.orders;
const PAYMENTS = services.payments;

async function forward(url, options = {}) {
  try {
    const response = await fetch(url, options);
    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }

    return {
      status: response.status,
      data,
    };
  } catch (err) {
    return {
      status: 500,
      data: { error: "Service unreachable", message: err.message },
    };
  }
}

function normalizeList(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.items)) return data.items;
  return [];
}

app.get("/inventory", async (req, res) => {
  const result = await forward(INVENTORY);
  const books = normalizeList(result.data);
  res.status(result.status).json(books);
});

app.post("/inventory", async (req, res) => {
  const result = await forward(INVENTORY, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req.body),
  });

  res.status(result.status).json(result.data);
});

app.put("/inventory/:id", async (req, res) => {
  const result = await forward(`${INVENTORY}/${req.params.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req.body),
  });

  res.status(result.status).json(result.data);
});

app.delete("/inventory/:id", async (req, res) => {
  const result = await forward(`${INVENTORY}/${req.params.id}`, {
    method: "DELETE",
  });

  res.status(result.status).json(result.data);
});

app.get("/orders", async (req, res) => {
  const result = await forward(ORDERS);
  const data = normalizeList(result.data);
  res.status(result.status).json(data);
});

app.post("/orders", async (req, res) => {
  const result = await forward(ORDERS, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req.body),
  });

  res.status(result.status).json(result.data);
});

app.put("/orders/:id", async (req, res) => {
  const result = await forward(`${ORDERS}/${req.params.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req.body),
  });

  res.status(result.status).json(result.data);
});

app.delete("/orders/:id", async (req, res) => {
  const result = await forward(`${ORDERS}/${req.params.id}`, {
    method: "DELETE",
  });

  res.status(result.status).json(result.data);
});

app.get("/payments", async (req, res) => {
  const result = await forward(PAYMENTS);
  const data = normalizeList(result.data);
  res.status(result.status).json(data);
});

app.post("/payments", async (req, res) => {
  const result = await forward(PAYMENTS, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req.body),
  });

  res.status(result.status).json(result.data);
});

app.put("/payments/:id", async (req, res) => {
  const result = await forward(`${PAYMENTS}/${req.params.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req.body),
  });

  res.status(result.status).json(result.data);
});

app.delete("/payments/:id", async (req, res) => {
  const result = await forward(`${PAYMENTS}/${req.params.id}`, {
    method: "DELETE",
  });

  res.status(result.status).json(result.data);
});

const PORT = 9001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`API Gateway running on http://0.0.0.0:${PORT}`);
});

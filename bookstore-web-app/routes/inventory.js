const { Router } = require("express");
const fetch = require("node-fetch");
const router = Router();

const API = "http://api-gateway:9001/inventory";

router.get("/", async (req, res) => {
  try {
    const response = await fetch(API);
    const data = await response.json();

    const books = data.data ?? data;

    res.render("inventory", { books });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/add", async (req, res) => {
  try {
    const payload = {
      title: req.body.title,
      author: req.body.author,
      price: Number(req.body.price),
      stock: Number(req.body.stock),
    };

    const response = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const createdBook = await response.json();

    if (!response.ok) {
      throw new Error(JSON.stringify(createdBook));
    }

    res.redirect("/inventory");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating book");
  }
});

router.get("/edit/:id", async (req, res) => {
  const response = await fetch(`${API}/${req.params.id}`);
  const book = await response.json();

  res.render("edit-inventory", { book });
});

router.post("/edit/:id", async (req, res) => {
  try {
    const payload = {
      title: req.body.title,
      author: req.body.author,
      price: Number(req.body.price),
      stock: Number(req.body.stock),
    };

    await fetch(`${API}/${req.params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    res.redirect("/inventory");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating book");
  }
});

router.get("/delete/:id", async (req, res) => {
  await fetch(`${API}/${req.params.id}`, {
    method: "DELETE",
  });

  res.redirect("/inventory");
});

module.exports = router;

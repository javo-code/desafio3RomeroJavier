import express from "express";
import { ProductManager } from "./manager/product.manager.js";
const productManager = new ProductManager("./products.json");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/products", async (req, res) => {
    try {
        const { limit } = req.query;

        const products = await productManager.getProducts();

        if (!limit) {
        res.status(200).json(products);
        } else {
        const productsByLimit = await productManager.getProductsByLimit(limit);
        res.status(200).json(productsByLimit);
        }
    } catch (error) {
        res.status(404).json({ message: "The product does not exist..." });
    }
});

app.get("/api/:pid", async (req, res) => {
    try {
        const { pid } = req.params;

        const productById = await productManager.getProductById(Number(pid));

        if (!productById) {
        res.status(404).json({ message: "The product does not exist..." });
        } else {
        res.status(200).json(productById);
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

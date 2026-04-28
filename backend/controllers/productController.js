import Product from '../models/productModel.js';

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.getAll();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener productos', error: err });
    }
};

const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.getById(id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener el producto', error: err });
    }
};

const createProduct = async (req, res) => {
    const {
        name,
        description,
        price,
        image,
        stock,
        productTypeId
    } = req.body;

    try {
        const newProduct = await Product.create(
            name,
            description,
            price,
            image,
            stock,
            productTypeId
        );
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(500).json({ message: 'Error al crear el producto', error: err });
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const {
        name,
        description,
        price,
        image,
        stock,
        productTypeId
    } = req.body;

    try {
        const updatedProduct = await Product.update(
            id,
            name,
            description,
            price,
            image,
            stock,
            productTypeId
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json({ message: 'Error al actualizar el producto', error: err });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.delete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ message: 'Error al eliminar el producto', error: err });
    }
};

export default {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
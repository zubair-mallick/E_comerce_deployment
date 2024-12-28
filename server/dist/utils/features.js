import mongoose from "mongoose";
import { myCache } from "../app.js";
import { Product } from "../models/products.js";
export const connectdb = () => {
    mongoose
        .connect(process.env.MONGODB_URI, {
        dbName: process.env.DBNAME,
    })
        .then((c) => console.log(`db sonnected to ${c.connection.host}`))
        .catch((err) => console.log(`db conection error :${err}`));
};
export const invalidateCache = ({ product, order, admin, userId, orderId, productId, }) => {
    if (product) {
        const productKeys = [
            "latest-product",
            "category",
            "adminProducts",
        ];
        if (typeof productId === "string")
            productKeys.push(`singleProduct-${productId}`);
        if (Array.isArray(productId)) {
            productId.forEach((productId) => {
                productKeys.push(`singleProduct-${productId}`);
            });
        }
        myCache.del(productKeys);
    }
    if (order) {
        const orderKeys = [
            "all-orders",
            `my-orders-${userId}`,
            `singleorder-${orderId}`,
        ];
        myCache.del(orderKeys);
    }
    if (admin) {
        myCache.del(["admin-stats", "admin-pie-charts", "admin-bar-charts", "admin-line-charts"]);
    }
    myCache.del(["admin-stats", "admin-pie-charts", "admin-bar-charts", "admin-line-charts"]);
};
export const reduceStock = async (orderItems) => {
    for (let i = 0; i < orderItems.length; i++) {
        const order = orderItems[i];
        const product = await Product.findById(order.productId);
        if (!product) {
            throw new Error(`Product not found ${order.productId}`);
        }
        product.stock -= order.quantity;
        await product.save();
    }
};
export const calculatePercentage = (thisMonth, lastMonth) => {
    if (lastMonth == 0) {
        return Number((thisMonth * 100).toFixed(0));
    }
    const percent = ((thisMonth - lastMonth) / lastMonth) * 100;
    return Number(percent.toFixed(0));
};
export const getInventories = async ({ categories, productCount }) => {
    const categoriesCountPromise = categories.map((category) => Product.countDocuments({ category }));
    const categoriesCount = await Promise.all(categoriesCountPromise);
    const categoryCount = [];
    categories.forEach((cat, i) => {
        categoryCount.push({
            [cat]: Math.round((categoriesCount[i] / productCount) * 100),
        });
    });
    return categoryCount;
};
export const getChartData = ({ length, docArr, today, property }) => {
    const data = new Array(length).fill(0);
    docArr.forEach((i) => {
        const creationDate = i.createdAt;
        const monthDiff = (today.getMonth() - creationDate.getMonth() + 12) % 12;
        if (monthDiff < length) {
            data[length - 1 - monthDiff] += property ?
                Math.round(i[property]) : 1;
        }
    });
    return data;
};

const productscontent = require("./constant/productscontent");
const Products = require("./models/productsSchema");

const DefaultContent = async()=>{
    try {
        await Products.deleteMany({});
        const storeData = await Products.insertMany(productscontent);
        console.log(storeData);
    } catch (error) {
        console.log("error" + error.message);
    }
};

module.exports = DefaultContent;
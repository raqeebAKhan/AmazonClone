const express = require("express");
const Products = require("../models/productsSchema");
const router = new express.Router();
const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const authenicate = require("../middleware/authenticate")

router.get("/getproducts", async(req, res)=>{
    try{
const productscontent = await Products.find();
// console.log("console the data" + productscontent);
res.status(201).json(productscontent);
    }catch(error){
        console.log("error" + error.message)
    }
})


router.get("/getproductsone/:id", async (req, res) => {

    try {
        const { id } = req.params;
        // console.log(id);

        
        const individual = await Products.findOne({ id: id });
        console.log(individual);

        
        res.status(201).json(individual);
    } catch (error) {
        res.status(400).json(error);
    }


    
});

// register the data
router.post("/register", async (req, res) => {
    console.log(req.body);
    const { fname, email, mobile, password, cpassword } = req.body;

    if (!fname || !email || !mobile || !password || !cpassword) {
        res.status(422).json({ error: "fill the all details" });
        console.log("no data available");
    };

    try {

        const preuser = await User.findOne({ email: email });

        if (preuser) {
            res.status(422).json({ error: "This email is already exist" });
        } else if (password !== cpassword) {
            res.status(422).json({ error: "password are not matching" });;
        } else {

            const finalUser = new User({
                fname, email, mobile, password, cpassword
            });

            const storedata = await finalUser.save();
            console.log("storedata");
            res.status(201).json(storedata);
        }

    } catch (error) {
        
    }

})

// login data
router.post("/login", async (req, res) => {
    // console.log(req.body);
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: "fill the details" });
    }

    try {

        const userlogin = await User.findOne({ email: email });
        console.log(userlogin);
        if (userlogin) {
            const isMatch = await bcrypt.compare(password, userlogin.password);
            console.log(isMatch);

            if (!isMatch) {
                res.status(400).json({ error: "invalid detials" })
            } else {

                 // token genrate
                const token = await userlogin.generateAuthtoken();
                // console.log(token);
    
                res.cookie("Amazon",token,{
                    expires:new Date(Date.now() + 900000),
                    httpOnly:true
                })
                res.status(201).json(userlogin);
            }
            }
        } catch(error){
            res.status(400).json({error:"invalid details"})
        }
    })

    // data into cart

router.post("/addcart/:id",authenicate, async(req,res) =>{
    try{
        const {id} = req.params;
        const cart = await Products.findOne({id:id})
        console.log(cart + "cart value")

        const UserContact = await User.findOne({_id:req.userID})
        console.log(UserContact)
        if (UserContact) {
            const cartData = await UserContact.addcartdata(cart);

            await UserContact.save();
            console.log(cartData);
            console.log(UserContact + "userjode save");
            res.status(201).json(UserContact);
        }else{
            res.status(401).json("invalid user");
        }
    } catch (error) {
        res.status(401).json("invalid user");
        console.log(error);
    }
});

// get user is login or not
router.get("/cartdetails", authenicate, async (req, res) => {
    try {
        const buynowuser = await User.findOne({ _id: req.userID});
        console.log(buynowuser);
        res.status(201).json(buynowuser);
    } catch (error) {
        console.log(error);
    }
});

// get user is login or not
router.get("/validuser", authenicate, async (req, res) => {
    try {
        const validuserone = await User.findOne({ _id: req.userID });
        console.log(validuserone);
        res.status(201).json(validuserone);
    } catch (error) {
        console.log(error);
    }
});

// remove iteam from the cart

router.get("/remove/:id", authenicate, async (req, res) => {
    try {
        const { id } = req.params;

        req.rootUser.carts = req.rootUser.carts.filter((curel) => {
            return curel.id != id
        });

        req.rootUser.save();
        res.status(201).json(req.rootUser);
        console.log("iteam remove");

    } catch (error) {
        console.log(error + "jwt provide then remove");
        res.status(400).json(error);
    }
});

router.get("/logout", authenicate, async (req, res) => {
    try {
        req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
            return curelem.token !== req.token
        });

        res.clearCookie("Amazon", { path: "/" });
        req.rootUser.save();
        res.status(201).json(req.rootUser.tokens);
        console.log("user logout");

    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
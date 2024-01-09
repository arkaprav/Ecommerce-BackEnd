const asyncHandler = require("express-async-handler");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const SubscribersModel = require("../models/SubscribersModel");
const AdminModel = require("../models/AdminModel");

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

const registerSubscriber = asyncHandler(async (req, res) => {
    const { name, password, address, email, phone, adminId } = req.body;
    if(!name) {
        res.status(401);
        throw new Error("Invalid name");
    }
    if(!password){
        res.status(401);
        throw new Error("Invalid password");
    }
    if(!email){
        res.status(401);
        throw new Error("Invalid email");
    }
    if(!address){
        res.status(401);
        throw new Error("Invalid address");
    }
    const admin = await AdminModel.findOne({ _id: adminId });
    if(!admin){
        res.status(401);
        throw new Error("Invalid address");
    }
    if(!isNumeric(phone)){
        res.status(401);
        throw new Error("Invalid phone");
    }
    const existsWithEmail = await SubscribersModel.findOne({ email });
    if(existsWithEmail){
        res.status(403);
        throw new Error("User with same email already exists");
    }
    const hashedPass = await bcrypt.hash(password, 10);
    const subscriber = await SubscribersModel.create({
        name,
        password: hashedPass,
        address,
        email,
        phone,
        adminId
    });
    res.status(201).json(subscriber);
});

const loginSubscriber = asyncHandler(async (req, res) => {
    const { name, password } = req.body;
    if(!name || !password){
        res.status(403);
        throw new Error("Invalid name or password");
    }
    let subscriber = await SubscribersModel.findOne({ name });
    if(!subscriber){
        res.status(404);
        throw new Error("Invalid name");
    }
    else{
        const comparePass = await bcrypt.compare(password, subscriber.password);
        if (comparePass) {
            const accessToken = jwt.sign({
                subscriber: {
                    id: subscriber._id,
                    name: subscriber.name,
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "7d" }
            );
            res.status(200).json(accessToken);
        }
        else{
            res.status(404);
            throw new Error("Invalid password");
        }
    }
});

const updateSubscriber = asyncHandler(async (req, res) => {
    const existsWithName = await SubscribersModel.findById(req.params.id);
    if(!existsWithName){
        res.status(403);
        throw new Error("Subscriber not Found");
    }
    const { password } = req.body;
    if(password){
        const hashedPass = await bcrypt.hash(password, 10);
        req.body = {
            ...req.body,
            password:hashedPass
        }
    }
    const subscriber = await SubscribersModel.findByIdAndUpdate(req.params.id, req.body);
    res.status(201).json(subscriber);
});


const deleteSubscriber = asyncHandler(async (req, res) => {
    const { password } = req.body;
    if(!password){
        res.status(401);
        throw new Error("Invalid password");
    }
    const existsWithName = await SubscribersModel.findById(req.params.id);
    if(!existsWithName){
        res.status(404);
        throw new Error("Subscriber not Found");
    }
    const comparePass = await bcrypt.compare(password, existsWithName.password);
    if(comparePass){
        const admin = await SubscribersModel.findByIdAndDelete(req.params.id);
    }
    else {
        res.status(401);
        throw new Error("Password does not match");
    }
    res.status(204).json({ message: "Subscriber Deleted!!"});
});

const getAllSubscribers = asyncHandler(async (req, res) => {
    const subscriber = await SubscribersModel.find({ adminId: req.admin.id });
    res.status(200).json(subscriber);
});

const getSingleSubscriber = asyncHandler(async (req, res) => {
    const subscriber = await SubscribersModel.findById(req.params.id);
    res.status(200).json(subscriber);
});

module.exports = { getAllSubscribers, getSingleSubscriber, loginSubscriber, registerSubscriber, updateSubscriber, deleteSubscriber }
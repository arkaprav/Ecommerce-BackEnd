const testGet = (req, res) => {
    res.status(200).json({ message: "Welcome to Ecommerce Backend API" });
};

module.exports = { testGet };
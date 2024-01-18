
# MERN Ecommerce Backend Api

An Api for Ecommerce app using express and mongo DB database

## Usage
there are currently three api services for admins, subscribers and products

### Admins
Base Url for admins is : https://ecommerce-back-end-orpin.vercel.app/api/admins/

#### register admin

relative Url: /register

headers: None

method: "POST"

data: {
    name: String,
    password: String
}

return type: admin object

#### login admin

relative Url: /login

headers: None

method: "POST"

data: {
    name: String,
    password: String
}

return type: jwt authentication key

#### update password admin

relative Url: /update

headers: None

method: "PUT"

data: {
    name: String,
    password: String
}

return type: admin object

#### delete admin

relative Url: /delete

headers: None

method: "DELETE"

data: {
    name: String,
    password: String
}

return type: json object

#### get all admins

relative Url: /all

method: "GET"

headers: None

return type: list of admin objects

#### get single admins

relative Url: /:id

method: "GET"

headers: None

return type: admin object

### Categorys
Base Url for admins is : https://ecommerce-back-end-orpin.vercel.app/api/category/

#### create product

relative Url: /secure/

headers: {
    Authorization: "Bearer __jwt_Authentication_key_after_login"
}

method: "POST"

data: {
    name: String,
    description: String,
    category_image: Image File
}

return type: category object

#### update category

relative Url: /secure/:id

headers:  {
    Authorization: "Bearer __jwt_Authentication_key_after_login"
}

method: "PUT"

data: {
    name: String,
    description: String,
    no_of_products: Number
    category_image: Image File
}

return type: category object

#### delete category

relative Url: /secure/:id

headers: {
    Authorization: "Bearer __jwt_Authentication_key_after_login"
}

method: "DELETE"

return type: json object

#### get single category

relative Url: /:id

headers: None

method: "GET"

return type: product object

#### get all category

relative Url: /all

headers: None

method: "GET"

return type: category object

### Products
Base Url for admins is : https://ecommerce-back-end-orpin.vercel.app/api/products/

#### create product

relative Url: /secure/

headers: {
    Authorization: "Bearer __jwt_Authentication_key_after_login"
}

method: "POST"

data: {
    name: String,
    description: String,
    brand: String,
    catgeoryId: String,
    purchasePrice: Number,
    retailPrice: Number,
    product_image: Image File
}

return type: product object

#### update product

relative Url: /secure/:id

headers:  {
    Authorization: "Bearer __jwt_Authentication_key_after_login"
}

method: "PUT"

data: {
    name: String,
    description: String,
    brand: String,
    catgeoryId: String,
    purchasePrice: Number,
    retailPrice: Number,
    product_image: Image File
}

return type: product object

#### delete product

relative Url: /secure/:id

headers: {
    Authorization: "Bearer __jwt_Authentication_key_after_login"
}

method: "DELETE"

return type: json object

#### get single product

relative Url: /:id

headers: None

method: "GET"

return type: product object

#### get all products

relative Url: /all

headers: None

method: "GET"

return type: product object


### Subscribers
Base Url for subscribers is : https://ecommerce-back-end-orpin.vercel.app/api/subscribers/

#### register subscriber

relative Url: /register

headers: None

method: "POST"

data: {
    name: String,
    password: String,
    email: String,
    address: String,
    phone: String,
    adminId: String(admins id in the browser)
}

return type: admin object

#### login subscriber

relative Url: /login

headers: None

method: "POST"

data: {
    name: String,
    password: String
}

return type: jwt authentication key

#### update subscriber

relative Url: /:id

headers: None

method: "PUT"

data: {
    name: String,
    password: String,
    email: String,
    address: String,
    phone: String,
    adminId: String(admins id in the browser)
}

return type: admin object

#### delete subscriber

relative Url: /:id

headers: None

method: "DELETE"

data: {
    password: String
}

return type: json object

#### get all subscribers

relative Url: /all

method: "GET"

headers: None

return type: list of subscriber objects

#### get single subscriber

relative Url: /:id

method: "GET"

headers: None

return type: subscriber object

### Orders
Base Url for subscribers is : https://ecommerce-back-end-orpin.vercel.app/api/orders/

#### create order

relative Url: /

headers: None

method: "POST"

data: {
    customerId: String (Subscriber's ID),
    products: Array of JSON Object({
        ID: String (Product ID),
        quantity: Number,
        SingleItemPrice: Number,
        SingleItemDiscount: Number (optional),
        SingleItemDiscountedPrice: Number,
        ProductCartTotal: Number,
        ProductCartSpecialDiscount: Number (optional),
        ProductCartTotal: Number
    }),
    orderTotal: Number,
    orderDiscount: Number,
    orderDiscountedTotal: Number,
    amountPaid: Number,
    paymentStatus: String,
    delivaryStatus: String,
    mop: String
}

return type: order object

#### update Order

relative Url: /:id

headers: None

method: "PUT"

data: {
    customerId: String (Subscriber's ID),
    products: Array of JSON Object({
        ID: String (Product ID),
        quantity: Number,
        SingleItemPrice: Number,
        SingleItemDiscount: Number (optional),
        SingleItemDiscountedPrice: Number,
        ProductCartTotal: Number,
        ProductCartSpecialDiscount: Number (optional),
        ProductCartTotal: Number
    }),
    orderTotal: Number,
    orderDiscount: Number,
    orderDiscountedTotal: Number,
    amountPaid: Number,
    paymentStatus: String,
    delivaryStatus: String,
    mop: String
}

return type: admin object

#### delete order

relative Url: /:id

headers: None

method: "DELETE"

return type: json object

#### get all orders

relative Url: /all

method: "GET"

headers: None

return type: list of order objects

#### get single order

relative Url: /:id

method: "GET"

headers: None

return type: order object

### Transactions
Base Url for subscribers is : https://ecommerce-back-end-orpin.vercel.app/api/transactions/

#### create transactions

relative Url: /

headers: None

method: "POST"

data: {
    orderId: String (order ID),
    customerId: String (Subscriber's ID),
    paymentStatus: String,
    amountPaid: Number,
    mop: String
}

return type: transaction object

#### update transaction

relative Url: /:id

headers: None

method: "PUT"

data: {
    orderId: String (order ID),
    customerId: String (Subscriber's ID),
    paymentStatus: String,
    amountPaid: Number,
    mop: String
}

return type: transaction object

#### delete transaction

relative Url: /:id

headers: None

method: "DELETE"

return type: json object

#### get all transaction

relative Url: /all

method: "GET"

headers: None

return type: list of trnsaction objects

#### get single transaction

relative Url: /:id

method: "GET"

headers: None

return type: transaction object


#### Further Api services will be updated soon ...
thank you for your support
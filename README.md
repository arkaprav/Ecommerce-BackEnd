
# MERN Ecommerce Backend Api

An Api for Ecommerce app using express and mongo DB database

## Usage
there are currently three api services for admins, subscribers and products

### Admins
Base Url for admins is : https://ecommerce-backend-new-api.vercel.app/api/admins/

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

### Products
Base Url for admins is : https://ecommerce-backend-new-api.vercel.app/api/products/

#### create product

relative Url: /

headers: {
    Authorization: "Bearer __jwt_Authentication_key_after_login"
}

method: "POST"

data: {
    name: String,
    description: String,
    brand: String,
    purchasePrice: Number,
    retailPrice: Number,
    product_image: Image File
}

return type: product object

#### update product

relative Url: /:id

headers:  {
    Authorization: "Bearer __jwt_Authentication_key_after_login"
}

method: "PUT"

data: {
    name: String,
    description: String,
    brand: String,
    purchasePrice: Number,
    retailPrice: Number,
    product_image: Image File
}

return type: product object

#### delete product

relative Url: /:id

headers: {
    Authorization: "Bearer __jwt_Authentication_key_after_login"
}

method: "DELETE"

return type: json object

#### get single product

relative Url: /:id

headers: {
    Authorization: "Bearer __jwt_Authentication_key_after_login"
}

method: "GET"

return type: product object


### Subscribers
Base Url for subscribers is : https://ecommerce-backend-new-api.vercel.app/api/subscribers/

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

headers: {
    Authorization: "Bearer __jwt_Authentication_key_after_login"
}

return type: list of subscriber objects

#### get single subscriber

relative Url: /:id

method: "GET"

headers: None

return type: subscriber object

#### Further Api services will be updated soon ...
thank you for your support
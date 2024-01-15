1. Authentication:

i. Authenticate the user using JWT.
ii. On Sign Up check for all validations and then create the user in the database.

> Query: INSERT INTO users ( first_name, last_name, email, password ) VALUES ( $first_name, $last_name, $email, $hashedPassword);

iii. As soon as the user sign up we will use next() and hit the Sign In route, and create a JWT access token so user doesn't need to explicitly Sign In up.

iv. If user closes the browser, opens up the app back sign in the user up, using the JWT within the expiry time and retrieve the user information from the payload.

v. On every Sign in create a new JWT for a user which contains id, firstName, lastName and email, but before that verify the user credentials in the database.

> Query: SELECT password FROM users where email= $email;

vi. Don't forget to encrypt and verify the password using "bcrypt" package, you have to use the above query for database to get the user hashedPassword.

vii. Return the user details as a response, we will use it in our app for further user related requirements.

viii. Make the required changes in the app such as enabling users to "Add Items to the Cart", change the login modal, and on navbar show the name of the user.


2. A. When user add items to the cart:

=> Frontend

i. When the user signs in give the ability to the user to add items to the cart from the homepage as well as product page.
ii. Upon adding the product on homepage, change the "Add to Cart" button to "Quantity" button and also show the user the "Remove Item" button to remove the item from the cart as well take care of the "Visit Cart" button.
iii. When adding from the product page, show the toast message that how many items does the user has added and also show him the button to remove the item and go to cart page.

=> Backend

i. As soon as the user add the product, create the cart. Get the user id from the response you received earlier from the sign in.

> Query: INSERT INTO carts (user_id) VALUES ($user_id);

ii. Pull the value of user cart_id from the database and value of the added product data-product_id and the Quantity.

> Query: SELECT cart_id FROM carts WHERE user_id = $user_id;

iii. Store the required values in cart_items table.

> Query: INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($cart_id, $data-product_id, $Quantity);


B. a. When user updated the quantity of the product: On Homepage

 i. Pull up the product id from data-product_id attribute.
 ii. Let the user set the final quantity. Make sure to use cancel token to avoid multiple API request.
 iii. Make a API post request and send the values of product id, quantity and cart_id.
 iv. Now, update the required cart_item in the cart_items table.

 > Query: UPDATE cart_items SET quantity = $quantity WHERE cart_id = $cart_id AND product_id = $product_id;

b. On Product Page

i. Let the user set the quantity, by default keep quantity 1.
ii. When the user hit Add to Cart button, pull out the product id, quantity and then hit the API post request and add the the quantity of the product with the existed previous quantity.

> QUERY: UPDATE cart_items SET quantity = $quantity + $newQuantity WHERE cart_id = $cart_id AND product_id = $product_id;

C. Handling Removing of item : On Homepage, Product, Cart

i. Once remove item button got clicked, hit the API post request and send the cart_id and product_id and then delete the cart item from the database.

> Query: DELETE FROM cart_items WHERE cart_id = $cart_id AND product_id = $product_id;


3. On Cart Page

i. Show the cart items by fetching data from the API aka database.

> QUERY:

  SELECT
    p.product_image_url,
    p.product_name,
    p.price,
    ci.quantity,
    (p.price * ci.quantity) AS subtotal
  FROM
    products AS p
  JOIN
    cart_items AS ci
  ON
    p.product_id = ci.product_id
  WHERE
    ci.cart_id = $cart_id;

ii. Calculate the $SUBTOTAL of Summary section and store it safe for further use, make user to use the previous value method for better performance in calculating $SUBTOTAL.

iii. Populate the SHIPPING dropdown by pulling the values from the database.

> Query: SELECT shipping_method, shipping_amount FROM shipping;

iv. Handle coupon when entered by user, check for the coupon in database.

> Query: SELECT * FROM coupons WHERE coupon_code = $coupon_code;

v. Handle the coupon as per the conditions and show appropriate message.

vi. When user click on the Checkout button, before moving to the checkout page verify the shipping method at the backend so, it keeps malicious users away.

First pull out the shipping_id, shipping_method and shipping_amount values from the client-end and then 
check in the database and give response accordingly.

> Query: SELECT shipping_id FROM shipping WHERE shipping_id = $shipping_id, shipping_method = $shipping_method AND shipping_amount = $shipping_amount;

Store the shipping_id for further use.


4. What happens when the user click purchase on the checkout page.

i. Make the payment using Stripe, and handle the response status accordingly.

a. If payment failed - Pull the cart_id and put it in the orders table and set status as "Failed" and let the rest of the attributes to be taken by default.

> Query: INSERT INTO orders (cart_id, status) VALUES ($cart_id, "FAILED");

b. If payment succeed - Pull the cart_id and put it in the orders table and rest of the table attributes value will be taken by default.

> Query: INSERT INTO orders (cart_id) VALUES $cart_id;

c. If there is delay in payment - Let the user know this, and set the order status as "PENDING". Later, handle it as per the status and let the user know everything.

> Query: INSERT INTO orders (cart_id, status) VALUES ($cart_id, "PENDING");

ii. Now, pull the cart_items from Redux, local storage or database as per condition and then insert them into order_items table.

> Query:
    INSERT INTO order_items (order_id, product_id, quantity)
      SELECT o.order_id, ci.product_id, ci.quantity
      FROM orders AS o
      JOIN cart_items AS ci
      ON o.cart_id = ci.cart_id
      WHERE ci.cart_id = $cart_id;

iii. Now, calculate the order_items products price total at the backend and verify the value with the $SUBTOTAL, if it matches proceed, if not update the $SUBTOTAL value with the result of query from the database.

> Query:
    SELECT SUM(p.price) AS total_price FROM order_items AS oi JOIN products AS p ON oi.product_id = p.product_id;

iv. Now, fill up the payments table with the required details.

> Query:
    SELECT order_id FROM orders WHERE cart_id = $cart_id;

> Query:
    INSERT INTO payments (order_id, payment_method, payment_amount, status) VALUES ($order_id, $payment_method, $payment_amount, $status);

v. Now, fill up the shipping_details table, pull the form data values from the shipping details form and insert them into the table.

> Query:
    INSERT INTO shipping_details (first_name, last_name, street, city, state, zip, mobile_number) VALUES ($firstName, $lastName, $street, $city, $state, $zip, $mobileNumber);

vi. Now, fill up the order_details table.

Extract the coupon_id too.

> Query:
    SELECT coupon_id FROM coupons WHERE coupon_code = $coupon_code;

Now, fill up the data.

> Query:
    INSERT INTO order_details (order_id, coupon_id, shipping_id) VALUES ($order_id, $coupon_id, $shipping_id);


5. When user check its orders.

Collecting all orders list and the particular order details:

Things Needed:

 - Order List:
  - Order Placed
  - Total
  - Ship To
  - Order ID
  - Order Status
  - Product Image
  - Product Name

 - Particular Order Details List:
  - Shipping Address
  - Payment Method
  - Items Subtotal
  - Shipping method and amount
  - Coupon Code, Type and Discount
  - Product Price

  > Query: Order ID, Order Placed, Order Status
      SELECT order_id, order_date, status FROM orders WHERE user_id = $user_id;

  > Query: Payment Method and Total
      SELECT p.payment_method, p.payment_amount FROM payments AS p JOIN orders AS o ON p.order_id = o.order_id WHERE o.user_id = $user_id;

  > Query: Ship To
      SELECT sd.first_name, COALESCE(sd.last_name, '') AS last_name, street, city, state, zip FROM shipping_details AS sd JOIN orders AS o ON sd.order_id = o.order_id WHERE o.user_id = $user_id;

  > Query: Product Name, Product Image, Product Price
      SELECT p.product_name, p.product_image_url, price FROM products AS p JOIN order_items AS ot ON p.product_id = ot.product_id JOIN orders AS o ON ot.order_id = o.order_id WHERE o.user_id = $user_id;

  > Query: Shipping Method and Amount
      SELECT s.shipping_method, s.shipping_amount 
      FROM orders AS o 
      JOIN order_details AS od ON o.order_id = od.order_id 
      JOIN shipping AS s ON od.shipping_id = s.shipping_id 
      WHERE o.user_id = $user_id;

  > Query: Coupon Code, Type and Discount
      SELECT c.coupon_code, c.coupon_type, c.coupon_discount
      FROM orders AS o
      JOIN order_details AS od ON o.order_id = od.order_id
      JOIN coupons AS c ON od.coupon_id = c.coupon_id
      WHERE o.user_id = $user_id;

After making the user order details collection, display it to the UI.

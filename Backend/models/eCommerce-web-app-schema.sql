CREATE TABLE `users` (
  `user_id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255),
  `email` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255) NOT NULL COMMENT 'store in hash format',
  `role` varchar(255) NOT NULL DEFAULT "USER" COMMENT 'else ADMIN'
);

CREATE TABLE `products` (
  `product_id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) NOT NULL,
  `price` integer NOT NULL,
  `arrived` datetime NOT NULL DEFAULT "CURRENT_TIMESTAMP",
  `product_image_url` varchar(255) NOT NULL
);

CREATE TABLE `carts` (
  `cart_id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` integer NOT NULL,
  `created_date` datetime NOT NULL DEFAULT "CURRENT_TIMESTAMP",
  `status` varchar(255) NOT NULL DEFAULT "ACTIVE" COMMENT 'else PURCHASED'
);

CREATE TABLE `cart_items` (
  `cart_item_id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `cart_id` integer NOT NULL,
  `product_id` integer NOT NULL,
  `quantity` integer NOT NULL DEFAULT 1 COMMENT 'quantity >= 1'
);

CREATE TABLE `orders` (
  `order_id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` integer NOT NULL,
  `cart_id` integer NOT NULL,
  `order_date` datetime NOT NULL DEFAULT "CURRENT_TIMESTAMP",
  `status` varchar(255) NOT NULL DEFAULT "ACTIVE" COMMENT 'else PENDING or SHIPPED'
);

CREATE TABLE `order_items` (
  `order_item_id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `order_id` integer NOT NULL,
  `product_id` integer NOT NULL,
  `quantity` integer NOT NULL DEFAULT 1 COMMENT 'if qty > 1, then cart_items table value will be copied here.'
);

CREATE TABLE `payments` (
  `payment_id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `order_id` integer NOT NULL,
  `payment_date` datetime NOT NULL DEFAULT "CURRENT_TIMESTAMP",
  `payment_method` varchar(255) NOT NULL DEFAULT "Cash on Delivery",
  `payment_amount` integer NOT NULL,
  `status` varchar(255) NOT NULL COMMENT 'SUCCESSFUL, IN PROCESS or FAILED'
);

CREATE TABLE `shipping` (
  `shipping_id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `shipping_method` varchar(255) NOT NULL,
  `shipping_amount` integer NOT NULL
);

CREATE TABLE `shipping_details` (
  `shipping_details_id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `order_id` integer NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255),
  `street` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `zip` integer NOT NULL,
  `mobile_number` integer
);

CREATE TABLE `coupons` (
  `coupon_id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `coupon_code` varchar(255) UNIQUE NOT NULL,
  `coupon_type` varchar(255) NOT NULL DEFAULT "FLAT" COMMENT 'else PERCENTAGE',
  `coupon_discount` integer NOT NULL,
  `coupon_min_spend` integer NOT NULL DEFAULT 0,
  `coupon_max_spend` integer NOT NULL DEFAULT 2147483647,
  `coupon_created` date NOT NULL,
  `coupon_expire` date
);

CREATE TABLE `order_details` (
  `order_details_id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `order_id` integer NOT NULL,
  `coupon_id` integer NOT NULL,
  `shipping_id` integer NOT NULL
);

ALTER TABLE `carts` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `cart_items` ADD FOREIGN KEY (`cart_id`) REFERENCES `carts` (`cart_id`);

ALTER TABLE `cart_items` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

ALTER TABLE `orders` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `orders` ADD FOREIGN KEY (`cart_id`) REFERENCES `cart_items` (`cart_id`);

ALTER TABLE `order_items` ADD FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`);

ALTER TABLE `order_items` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

ALTER TABLE `payments` ADD FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`);

ALTER TABLE `shipping_details` ADD FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`);

ALTER TABLE `order_details` ADD FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`);

ALTER TABLE `order_details` ADD FOREIGN KEY (`coupon_id`) REFERENCES `coupons` (`coupon_id`);

ALTER TABLE `order_details` ADD FOREIGN KEY (`shipping_id`) REFERENCES `shipping` (`shipping_id`);

CREATE TABLE `users` (
  `user_id` integer PRIMARY KEY AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255),
  `email` varchar(255) UNIQUE NOT NULL,
  `role` varchar(255) DEFAULT "USER" COMMENT 'else ADMIN'
);

CREATE TABLE `products` (
  `product_id` integer PRIMARY KEY AUTO_INCREMENT,
  `product_name` varchar(255) NOT NULL,
  `price` integer NOT NULL,
  `arrived` datetime NOT NULL
);

CREATE TABLE `carts` (
  `cart_id` integer PRIMARY KEY AUTO_INCREMENT,
  `user_id` integer,
  `created_date` datetime NOT NULL,
  `status` varchar(255) DEFAULT "ACTIVE" COMMENT 'else PURCHASED'
);

CREATE TABLE `cart_items` (
  `cart_item_id` integer PRIMARY KEY AUTO_INCREMENT,
  `cart_id` integer,
  `product_id` integer,
  `quantity` integer DEFAULT 1 COMMENT 'quantity >= 1'
);

CREATE TABLE `orders` (
  `order_id` integer PRIMARY KEY AUTO_INCREMENT,
  `user_id` integer,
  `order_date` datetime NOT NULL,
  `status` varchar(255) DEFAULT "ACTIVE" COMMENT 'else PENDING or COMPLETED'
);

CREATE TABLE `order_items` (
  `order_item_id` integer PRIMARY KEY AUTO_INCREMENT,
  `order_id` integer,
  `product_id` integer,
  `quantity` integer COMMENT 'cart items table quantity will be copied here',
  `unit_price` integer NOT NULL
);

CREATE TABLE `payments` (
  `payment_id` integer PRIMARY KEY AUTO_INCREMENT,
  `order_id` integer,
  `payment_date` datetime NOT NULL,
  `payment_amount` integer NOT NULL,
  `status` varchar(255) DEFAULT "PENDING" COMMENT 'else IN PROCESS, SUCCESSFUL or FAILED'
);

CREATE TABLE `shipping` (
  `shipping_id` integer PRIMARY KEY AUTO_INCREMENT,
  `shipping_method` VARCHAR(255),
  `shipping_amount` integer NOT NULL
);

CREATE TABLE `coupons` (
  `coupon_id` integer PRIMARY KEY AUTO_INCREMENT,
  `coupon_code` varchar(255) UNIQUE NOT NULL,
  `coupon_type` varchar(255) DEFAULT "FLAT" COMMENT 'else PERCENTAGE',
  `coupon_discount` integer NOT NULL,
  `coupon_min_spend` integer DEFAULT 0,
  `coupon_max_spend` integer DEFAULT 2147483647,
  `coupon_created` date NOT NULL,
  `coupon_expire` date NULL
);

ALTER TABLE `carts` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `cart_items` ADD FOREIGN KEY (`cart_id`) REFERENCES `carts` (`cart_id`);

ALTER TABLE `cart_items` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

ALTER TABLE `orders` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `order_items` ADD FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`);

ALTER TABLE `order_items` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

ALTER TABLE `payments` ADD FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`);

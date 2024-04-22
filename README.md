# Nike clone with MERN stack

## Admin
Email: admin@gmail.com 

pass : 123456



![](https://i.ibb.co/Jsn40q6/Capture.png)

Welcome to our Room Booking Website repository! Here you'll find everything you need to know about our platform, designed to provide users with a seamless booking experience.

## Features:
### Authentication System

We employ a secure authentication system to protect user accounts and data integrity.
### Dynamic Design

Our website features a dynamic and responsive design, ensuring an optimal user experience across various devices.
### Image Upload System

Easily upload images of your products to showcase them effectively to users.
### Landing Page

Our landing page features a captivating carousel, highlighting best-selling collections, and includes a newsletter section for users to stay updated.
### Dynamic Product Search Bar

Users can search for any product using our dynamic search bar, making it convenient to find what they need.
### Product Page

The product page offers various features including sorting options, category sections, a price slider, and beautiful pagination for easy navigation.
### Product Details Page

View detailed information about each product, including a carousel of product images and options for size selection before adding to the cart.
### Cart Page

Users can view all added items to their cart, and easily proceed to checkout with the option to purchase using Stripe payment.
### Admin Role System

Administrators have access to a dashboard where they can monitor total revenue, shipped orders, total products, and view the status of orders from the past six months.
### Product Management

Admins can manage all products, including viewing, editing, and deleting them. They can also add new products by providing all required details.
### Order Page

Admins have access to detailed order information, allowing them to track and manage orders efficiently.

# Get Started

Clone the repository and follow the setup instructions in the README to launch your own Room Booking Website!

### Cloning the repository

```shell
git clone https://github.com/saiyedimtiaj/Nike-Store.git
```
### Change Directory to Backend

```shell
cd backend
```
### Install packages

```shell
npm i
```
### Setup .env file

```shell
DB_USER = Your Database Name
DB_PASS = Your Database password
STRIPE_PAYMENT_SECRET = Your stripe payment secrate key
```
### Start Server

```shell
nodemon index.js
```

### Open Another Powershell
### Change Directory to Client

```shell
cd backend
```

### Install packages

```shell
npm i
```

### Setup .env file

```shell
VITE_apiKey=Firebase api key
VITE_authDomain=Firebase authDomain
VITE_projectId=Firebase ProjectId
VITE_storageBucket=Firebse storageBucket
VITE_messagingSenderId=Firebase messagingSenderId
VITE_appId=Firebase appId

VITE_Stripe_Publishable_Key=Your stripe Publishable Key

VITE_Imgbb_Api_Key= Your Imgbb image api key
```
### Start The app

```shell
npm run dev
```
# CrypWallet

CrypWallet is a cryptocurrency wallet application that allows users to manage multiple wallets, view real-time cryptocurrency values, and perform transactions such as sending, receiving, buying, and exchanging cryptocurrencies. The application supports multiple languages and currencies for a personalized and global experience.

## Features

- **Multiple Wallet Management**: Create and manage multiple wallets for different cryptocurrencies.
- **Real-Time Visualization**: View real-time cryptocurrency values.
- **Transactions**: Easily send, receive, buy, and exchange cryptocurrencies.
- **Multi-Language Support**: The application can be used in various languages.
- **Multiple Currency Support**: Check and perform transactions in different currencies (USD, EUR, COP, etc.).

## Installation

Follow the steps below to install and run CrypWallet:

## Prerequisites

Before you begin, ensure you have the following prerequisites:

- 🐳 Docker and Docker Compose installed on your machine.
- Node.js and npm (optional for development and local testing).

### 1. Clone the Repository

```bash
git clone https://github.com/SebastianHinestroza12/CrypWallet-webapp.git

cd CrypWallet-webapp

```
### 2. Configure Environment Variables

Create a `.env` file in the root of the project and configure the following environment variables:

```json
{
  "VITE_API_BASE_URL": "YOUR_API_BASE_URL",
  "VITE_KEY_UPLOAD_PRESET": "YOUR_KEY_UPLOAD_PRESET"
}

```

`Note: If you wish to connect with the server, these environment variables are mandatory. If you do not need to connect with the server, configuring these variables is optional.`

### 3. Build and Lift Containers

To build and raise the containers, run the following command:

```bash
docker-compose up
```

### 4. Access the Application

Once the containers are up and running, you can access the application in [http://localhost:3000](http://localhost:3000).

## 3. Usage

### Home

The Home section provides an overview of various cryptocurrencies along with their current market prices. This allows you to keep track of the latest values and trends in the cryptocurrency market.

![Home Page](https://res.cloudinary.com/dafsjo7al/image/upload/v1722887533/iPhone-13-PRO-MAX-localhost_po3fx7.png)

### Registration

To start using CrypWallet, you need to register an account. Fill in your details on the registration form and submit.

![Registration Form](https://res.cloudinary.com/dafsjo7al/image/upload/v1722887599/iPhone-13-PRO-MAX-localhost_1_e01adl.png)

### Secure Phrase

After registering, you'll be shown a set of secure words. These words are crucial for recovering your account if you forget your password. Make sure to save them in a safe place.

![Secure Words](https://res.cloudinary.com/dafsjo7al/image/upload/v1722887947/iPhone-13-PRO-MAX-localhost_3_flpj7s.png)

### Login

Once registered, you can log in using your credentials. Enter your email and password on the login page.

![Login Page](https://res.cloudinary.com/dafsjo7al/image/upload/v1722887855/iPhone-13-PRO-MAX-localhost_2_nsxlu8.png)

### Currencies and Languages

CrypWallet supports multiple currencies and languages. You can select your preferred currency and language from the settings.

<div style="display: flex; justify-content: space-around;">
  <img src="https://res.cloudinary.com/dafsjo7al/image/upload/v1722888052/iPhone-13-PRO-MAX-localhost_4_sjm5bt.png" alt="Currencies" style="width: 48%;">
  <img src="https://res.cloudinary.com/dafsjo7al/image/upload/v1722888053/iPhone-13-PRO-MAX-localhost_5_t4g4gt.png" alt="Languages" style="width: 48%;">
</div>

### Cryptocurrency Details

Clicking on a cryptocurrency from the Home page will take you to the Cryptocurrency Details section. Here, you can view basic information about the selected cryptocurrency, including:

![Basic Cryptocurrency Details](https://res.cloudinary.com/dafsjo7al/image/upload/v1722888587/iPhone-13-PRO-MAX-localhost_6_kqlyey.png)

In the top-right corner, there is an **info** icon. Clicking this icon will display additional details about the cryptocurrency, such as:

- **24-Hour Trading Volume:** The total volume traded in the last 24 hours.
- **Historical Price Chart:** A graph showing the price trends over time.
- **Current Price:** The latest price of the cryptocurrency.
- **Market Cap:** The total market capitalization.

![Full Cryptocurrency Details](https://res.cloudinary.com/dafsjo7al/image/upload/v1722888586/iPhone-13-PRO-MAX-localhost_7_imouvq.png)

### Sending Cryptocurrencies

To send cryptocurrencies, navigate to the 'Send' section. Select the cryptocurrency you want to send, enter the recipient's address, and specify the amount. Confirm the transaction to complete the process.

<div style="display: flex; justify-content: space-around;">
  <img src="https://res.cloudinary.com/dafsjo7al/image/upload/v1722888747/iPhone-13-PRO-MAX-localhost_8_xpppqt.png" alt="Send" style="width: 48%;">
  <img src="https://res.cloudinary.com/dafsjo7al/image/upload/v1722888746/iPhone-13-PRO-MAX-localhost_9_t1unod.png" alt="Send BTC" style="width: 48%;">
</div>

### Buying Cryptocurrencies

To buy cryptocurrencies, follow these steps:

1. **Enter Amount:** Go to the 'Buy' section, select the cryptocurrency you want to purchase, and enter the amount you wish to buy.

   ![Enter Amount](https://res.cloudinary.com/dafsjo7al/image/upload/v1722888984/iPhone-13-PRO-MAX-localhost_10_mjhpob.png)

2. **Proceed to Checkout:** After entering the amount, click 'Continue' to proceed. You will be redirected to the Stripe checkout page to complete the payment.

   ![Stripe Checkout](https://res.cloudinary.com/dafsjo7al/image/upload/v1722888992/Captura_de_pantalla_2024-08-05_151606_zzyts4.png)

3. **Test Credit Card Information:** For testing purposes, you can use the following test credit card information in Stripe:

   | Card Type        | Card Number          | CVV         | Expiry Date     |
   |------------------|-----------------------|-------------|-----------------|
   | Visa             | 4242424242424242      | Any 3 digits | Any future date |
   | Visa (debit)     | 4000056655665556      | Any 3 digits | Any future date |
   | Mastercard       | 5555555555554444      | Any 3 digits | Any future date |
   | Mastercard (2-series) | 2223003122003222  | Any 3 digits | Any future date |
   | Mastercard (debit) | 5200828282828210    | Any 3 digits | Any future date |
   | Mastercard (prepaid) | 5105105105105100   | Any 3 digits | Any future date |

### Exchanging Cryptocurrencies

For exchanging cryptocurrencies, visit the 'Swap' section. Select the cryptocurrency you want to swap from and the one you want to swap to. Enter the amount and confirm the exchange.

![Swap Cryptocurrency](https://res.cloudinary.com/dafsjo7al/image/upload/v1722889252/iPhone-12-PRO-localhost_2_m1ue2r.png)

### Receiving Cryptocurrencies

To receive cryptocurrencies, follow these steps:

1. **Generate QR Code:** Go to the 'Receive' section. Here, you will see a QR code that contains the address of your wallet. This address is used for receiving cryptocurrencies.

2. **Share Your Wallet Address:** You can share the QR code with others to receive payments. Scanning the QR code will automatically populate the wallet address in the sender's application.

3. **Copy Wallet Address:** Alternatively, you can copy your wallet address and provide it directly to others for receiving payments.

![Receive QR Code](https://res.cloudinary.com/dafsjo7al/image/upload/v1722889585/iPhone-12-PRO-localhost_4_sgv6ms.png)

### Transaction History

You can view all your transactions in the 'History' section. This includes all your sends, receives, buys, and swaps. Each transaction is listed with details such as date, amount, and type.

When you click on a transaction card, a modal will appear displaying detailed information about the selected transaction. This modal provides a comprehensive view of the transaction, including:

- **Date:** The date when the transaction occurred.
- **Amount:** The amount of cryptocurrency involved in the transaction.
- **Type:** The type of transaction (send, receive, buy, swap).
- **Transaction ID:** A unique identifier for the transaction.

![Transaction History](https://res.cloudinary.com/dafsjo7al/image/upload/v1722889376/iPhone-12-PRO-localhost_3_pl0au4.png)

### Conclusion

These are the main features of the CrypWallet app, including managing multiple wallets, viewing real-time cryptocurrency values, making transactions, and more. The app offers many additional features that you can explore to enhance your experience.

I encourage you to dive in and discover everything CrypWallet has to offer. Happy exploring!

## Authors

- [@SebastianHinestroza12](https://github.com/SebastianHinestroza12)
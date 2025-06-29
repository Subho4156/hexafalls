# Krishak Biniyog
Empowering Indian agriculture through blockchain-based asset tokenization and global investment  

Krishak Biniyog is a revolutionary platform that leverages blockchain technology to address critical challenges in Indian agriculture. By tokenizing agricultural assets, we aim to bridge the gap between Indian farmers and global investors, unlocking the vast potential of the country's agricultural sector.

---

## 🌾 Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project Locally](#running-the-project-locally)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

---

## 🧪 Technologies Used

- **Solidity**  
- **React**  
- **Node.js**  
- **IPFS**  
- **Chainlink**  
- **Base (Ethereum L2)**  
- **Hardhat**  
- **OpenZeppelin**  
- **Web3.js**

---

## ⚙️ Getting Started

### 🔧 Prerequisites

Ensure you have the following installed:  
- **Node.js** (v20.11.1 or later)  
- **npm** (v10.2.4 or later)  
- **Git** (v2.45.1 or later)  

---

### 📥 Installation

```bash
git clone https://github.com/your-username/krishak-biniyog.git
cd app
npm install
````

Create a `.env` file in the root directory and add the following:

```
NEXT_PUBLIC_PRIVY_APP_ID=""
NEXT_PUBLIC_PINATA_JWT=""
NEXT_PUBLIC_PINATA_GATEWAY=""
```

---

### 🧾 Running the Project Locally

```bash
npm start
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

### Run local blockchain node:

```bash
npx hardhat node
```

Then deploy contracts locally:

```bash
npx hardhat run scripts/deploy-contracts.ts --network localhost
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE.md).

---

## 📬 Contact

For more info, email us at: **[teamxtesseract@gmail.com](mailto:teamxtesseract@gmail.com)**

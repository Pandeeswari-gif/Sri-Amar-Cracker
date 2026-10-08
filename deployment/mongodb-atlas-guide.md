# MongoDB Atlas Setup Guide — Sri Amar Crackers

Follow these steps to connect your production MongoDB Atlas cluster:

### 1. Create a Free Cluster
1. Sign up or log into [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Click **Create Deployment** → Select **M0 Free Tier**.
3. Choose the region closest to your users (e.g., `ap-south-1` Mumbai).
4. Click **Create Cluster**.

### 2. Configure Database User
1. Go to **Security** → **Database Access** → **Add New Database User**.
2. Authentication Method: **Password**.
3. Set Username: e.g., `sriamar_admin`.
4. Set a strong password (or auto-generate).
5. Built-in Role: **Read and write to any database**.
6. Click **Add User**.

### 3. Configure IP Access (Network Access)
1. Go to **Security** → **Network Access** → **Add IP Address**.
2. Select **Allow Access from Anywhere** (`0.0.0.0/0`) so that hosting providers like Render / Railway can connect securely.
3. Click **Confirm**.

### 4. Obtain Connection URI
1. Go to **Database** → **Clusters** → Click **Connect**.
2. Select **Drivers** (Node.js).
3. Copy the connection string:
   ```env
   mongodb+srv://<username>:<password>@cluster0.mongodb.net/sri_amar_crackers?retryWrites=true&w=majority
   ```
4. Replace `<username>` and `<password>` with your database user credentials.

### 5. Seed Database
Run the seed command with your Atlas URI:
```bash
cd backend
MONGODB_URI="mongodb+srv://..." npm run seed
```
This automatically imports all 117 authoritative products, 19 categories, 6 combo packs, admin accounts, and coupons!

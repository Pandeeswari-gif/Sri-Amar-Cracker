# Vercel Frontend Deployment Guide — Sri Amar Crackers

This application is 100% prepared for instant Vercel deployment with client-side SPA routing (`vercel.json`) and responsive mobile optimizations.

### Steps to Deploy:
1. Push your repository to **GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Sri Amar Crackers complete e-commerce platform"
   git branch -M main
   git remote add origin https://github.com/<your-username>/sri-amar-crackers.git
   git push -u origin main
   ```
2. Log into [Vercel](https://vercel.com).
3. Click **Add New...** → **Project**.
4. Import your `sri-amar-crackers` repository.
5. In project configuration:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Add Environment Variables:
   - `VITE_API_URL`: Your deployed backend URL (e.g. `https://sri-amar-crackers-backend.onrender.com/api`)
   - `VITE_WHATSAPP_NUMBER`: `7094183836`
7. Click **Deploy**.
8. Your store will be live with a public HTTPS URL (e.g. `https://sri-amar-crackers.vercel.app`)!

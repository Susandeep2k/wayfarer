# Deploy to Vercel

## Step 1: Sign Up / Login
1. Go to https://vercel.com
2. Click "Sign Up" (or "Log In")
3. Choose "Continue with GitHub" or use email: susandeep2k@gmail.com
4. Complete signup

## Step 2: Create New Project
1. Click "Add New..." → "Project"
2. Click "Import Git Repository"
3. Paste your GitHub repo URL (or upload folder)

## Alternative: Direct Upload
1. Go to https://vercel.com/new
2. Scroll down to "Deploy a Git Repository"
3. Or drag entire wayfarer-v8 folder onto page

## Step 3: Configure Environment Variables
1. In project settings, click "Environment Variables"
2. Add:
   - Name: `ANTHROPIC_API_KEY`
   - Value: (your Claude API key)
3. Save

## Step 4: Deploy
1. Click "Deploy"
2. Wait 2-3 minutes for build
3. Get your live URL (e.g., wayfarer-v8.vercel.app)

## Folder Structure Ready:
```
wayfarer-v8/
├── index.html
├── vercel.json
├── api/
│   └── chat.js
└── public/
    └── data/
        └── zealand.json
```

All files are prepared in: /mnt/user-data/outputs/wayfarer-v8/

Just upload to Vercel!

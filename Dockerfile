# 🟢 Node.js ka latest stable version use karein
FROM node:lts-buster

# 📂 App directory create karein
WORKDIR /app

# 📦 Dependencies install karne ke liye files copy karein
# Isse build fast hoti hai (Layer caching)
COPY package*.json ./

# 🛠️ System tools aur Node modules install karein
# qrcode-terminal aur pm2 ko globally install kiya
RUN apt-get update && apt-get install -y \
    ffmpeg \
    imagemagick \
    webp && \
    npm install && \
    npm install -g qrcode-terminal pm2

# 📁 Baaki sara code copy karein
COPY . .

# 🌐 Port 3000 expose karein (Render ke liye zaroori hai)
EXPOSE 3000

# 🚀 Bot ko start karne ki command
# PM2 use karne se bot crash hone par auto-restart ho jayega
CMD ["pm2-runtime", "index.js"]

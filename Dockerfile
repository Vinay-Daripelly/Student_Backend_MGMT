# 1. Use official Node image
FROM node:18

# 2. Set working directory
WORKDIR /app

# 3. Copy package files
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy the entire backend code
COPY . .

# 6. Expose port (matches the backend PORT)
EXPOSE 5000

# 7. Start the server
CMD ["npm", "start"]

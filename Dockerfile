# Step 1: Use a lightweight Node.js image
FROM node:18-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to the container
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application files
COPY . .

# Step 6: Build the Nuxt 3 app (for production use)
RUN npm run build

# Step 7: Expose the port that Nuxt will run on
EXPOSE 3000

# Step 8: Command to run the app
CMD ["npm", "run", "dev"]

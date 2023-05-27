# Use a Node.js base image with a specific version
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire project directory to the working directory
COPY . .

# Expose the port that the Express app will listen on
EXPOSE 3000

ENV NODE_ENV=production

# Specify the command to run when the container starts
CMD ["npm", "run", "dev"]
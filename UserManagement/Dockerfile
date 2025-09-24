# Use official Node.js LTS version as base image
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if any)
COPY package*.json ./

# Copy Prisma schema and related files early
COPY prisma ./prisma

# Install dependencies (only production)
RUN npm install --production --ignore-scripts

# Copy the rest of your application code
COPY . .

# Generate Prisma client (important to run this during build)
# RUN npx prisma generate

# Expose port your app listens on (adjust if needed)
EXPOSE 3002

# Start the Express app
CMD ["sh", "-c", "npx prisma generate && npx prisma migrate deploy && node index.js"]


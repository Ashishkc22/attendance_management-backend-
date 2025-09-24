# Use official Node.js LTS version as base image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if any)
COPY package*.json ./

# Install dependencies (only production)
RUN npm install --production

# Copy the rest of your application code
COPY . .


# # Generate Prisma client (important to run this during build)
# RUN npx prisma generate

# # Run database migrations
# RUN npx prisma migrate deploy

# Expose port your app listens on (adjust if needed)
EXPOSE 3001

# Start the Express app
CMD ["sh", "-c", "npx prisma generate && npx prisma migrate deploy && node index.js"]

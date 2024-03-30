# Use a base image with Node.js installed
FROM node:21-alpine

# ENV PORT=5001

# PRISMA
# ENV DATABASE_URL="mysql://root:my-secret-pw@db-ecourse-rehab-hati:3306/ecourse"

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# EXPOSE ${PORT}

# Command to run your application
CMD npx prisma generate && npm run migrate:deploy && npm run start
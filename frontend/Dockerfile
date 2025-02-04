# Use official Node.js LTS image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the React app
RUN npm run build

# Use nginx to serve the built React app
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]





# # Use official Node.js LTS image
# FROM node:18 AS builder

# # Set working directory
# WORKDIR /app

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Set the backend API URL during build
# ARG REACT_APP_BACKEND_URL
# ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL

# # Copy the rest of the application
# COPY . .

# # Build the React app
# RUN npm run build

# # Use nginx to serve the built React app
# FROM nginx:alpine
# COPY --from=builder /app/build /usr/share/nginx/html

# # Copy custom Nginx configuration
# COPY nginx.conf /etc/nginx/nginx.conf

# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]


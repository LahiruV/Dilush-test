# Use a lightweight HTTP server image
FROM nginx:alpine

# Remove default Nginx config
RUN rm -rf /usr/share/nginx/html/*

# Copy built React app
COPY dist /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]

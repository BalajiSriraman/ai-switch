# Create build stage
FROM node:20.14.0-slim AS build

# Enable pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm i corepack -g
RUN corepack enable

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and pnpm-lock.yaml files to the working directory
COPY ./package.json /app/
COPY ./pnpm-lock.yaml /app/

## Install dependencies
RUN pnpm install 

# Copy the rest of the application files to the working directory
COPY . ./

# Build the application
RUN pnpm run build

# Create a new stage for the production image
FROM node:20.14.0-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the output from the build stage to the working directory
COPY --from=build /app/.output ./

# Define environment variables
ENV HOST=0.0.0.0 NODE_ENV=production
ENV NODE_ENV=production

# Expose the port the application will run on
EXPOSE 3000

# Start the application
CMD ["node","/app/server/index.mjs"]

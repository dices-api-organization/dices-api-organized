FROM node:20.9.0
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT=3001
EXPOSE 3001
CMD npx tsc && npx ts-node-dev src/backend/server.ts
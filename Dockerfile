FROM node:20

WORKDIR /app/student-course-api

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

CMD ["node", "server.js"]

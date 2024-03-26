FROM node:18-alpine
WORKDIR /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]


# COPY dist/ngrxsignals/ .

# EXPOSE 3000

FROM nginx:alpine
COPY --from=node /app/dist/ngrxsignals /usr/share/nginx/html

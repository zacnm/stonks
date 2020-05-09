FROM nginx:alpine
COPY /dist/stonks /usr/share/nginx/html
EXPOSE 80
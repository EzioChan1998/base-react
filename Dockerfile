FROM nginx:1.20.2
COPY html /etc/nginx/html
COPY conf /etc/nginx/
WORKDIR /etc/nginx/html
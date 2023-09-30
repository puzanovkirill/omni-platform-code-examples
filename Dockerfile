FROM nginx:1.21-alpine

COPY nginx.conf /nginx.conf
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

COPY build /build

ENTRYPOINT /docker-entrypoint.sh

#!/bin/sh
set -x
set -e
envsubst '$BACKEND_HOST' < /nginx.conf > /etc/nginx/nginx.conf
exec nginx -g 'daemon off;'
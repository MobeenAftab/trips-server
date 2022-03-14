#!/bin/bash

echo "Kill port $1"
npx kill-port $1

# PORT = netstat -ano | findstr "PID $1"
# kill $PORT

#!/bin/bash

if [ $# -lt 2 ]; then
  echo "Usage: $0 <command> <version>"
  exit 1
fi

command="$1"
version="$2"

case "$command" in
  "build")
    docker build -t memorizend:$version .
    ;;
  "tag")
    docker tag memorizend:$version ariman/memorizend:$version
    ;;
  "push")
    docker push ariman/memorizend:$version
    ;;
  *)
    echo "Unknown command: $command"
    exit 1
    ;;
esac

exit 0

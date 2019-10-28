#!/usr/bin/env bash

cd "$(dirname "$0")/.."

ng build
docker build . -t maarten551/tic-tac-toe-multiplayer-front-end

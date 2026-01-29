#!/usr/bin/env bash

MODEL=${2:-mistral}

case "$1" in
  start)
    echo "Starting Ollama..."
    ollama serve >/dev/null 2>&1 &
    echo "Ollama started"
    ;;

  stop)
    echo "Stopping Ollama..."
    pkill -f ollama
    echo "Ollama stopped"
    ;;

  run)
    echo "Running model: $MODEL"
    ollama run "$MODEL"
    ;;

  status)
    echo "---- Ollama Processes ----"
    pgrep -af ollama || echo "Not running"
    echo
    echo "---- Resource Usage ----"
    ps -C ollama -o pid,%cpu,%mem,cmd
    ;;

  top)
    echo "Press q to exit"
    top -p "$(pgrep -d',' ollama)"
    ;;

  kill)
    echo "⚠️  Killing Ollama immediately!"
    pkill -9 -f ollama
    echo "Killed."
    ;;

  *)
    echo "Usage:"
    echo "  ai start"
    echo "  ai stop"
    echo "  ai run [model]"
    echo "  ai status"
    echo "  ai top"
    echo "  ai kill"
    ;;
esac
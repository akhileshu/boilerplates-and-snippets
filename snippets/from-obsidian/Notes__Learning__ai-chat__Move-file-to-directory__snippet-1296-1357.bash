#!/usr/bin/env bash

MODEL=${2:-mistral}
HOST=127.0.0.1
PORT=11434

export OLLAMA_HOST=$HOST:$PORT

case "$1" in
  start)
    echo "Starting Ollama on $OLLAMA_HOST ..."
    if pgrep -f ollama >/dev/null; then
      echo "Ollama already running"
      exit 0
    fi
    ollama serve >/dev/null 2>&1 &
    sleep 1
    echo "Ollama started"
    ;;

  stop)
    echo "Stopping Ollama (graceful)..."
    sudo systemctl stop ollama 2>/dev/null || sudo pkill -f ollama
    echo "Stopped"
    ;;

  run)
    echo "Running model: $MODEL"
    ollama run "$MODEL"
    ;;

  status)
    echo "---- Ollama ----"
    pgrep -af ollama || echo "Not running"
    echo
    echo "---- Resource Usage ----"
    ps -C ollama -o pid,%cpu,%mem,etime
    echo
    echo "---- Endpoint ----"
    echo "http://$OLLAMA_HOST"
    ;;

  top)
    echo "Press q to exit"
    PIDS=$(pgrep -d',' ollama)
    [ -z "$PIDS" ] && echo "Not running" || top -p "$PIDS"
    ;;


> 🔗 Extracted to GitHub
> https://github.com/akhileshu/boilerplates-and-snippets/blob/main/snippets/from-obsidian/Notes__Learning__ai-chat__Move-file-to-directory__snippet-1345-1417.txt


OpenCode usually reads env or config.

### Option A: environment variable (simplest)

```bash
export OLLAMA_HOST=127.0.0.1:11434
opencode
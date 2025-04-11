cd priv/schema

set -euo pipefail

DESC_DIR="./descriptions"
OUT_FILE="./build/channel-descriptions.json"

echo '{' > "$OUT_FILE"
echo '  "asyncapi": "3.0.0",' >> "$OUT_FILE"
echo '  "channels": {' >> "$OUT_FILE"

first=true
for filepath in "$DESC_DIR"/*.md; do
  [ -e "$filepath" ] || continue
  channel=$(basename "$filepath" .md)
  description=$(jq -Rs '.' < "$filepath")

  if [ "$first" = false ]; then
    echo ',' >> "$OUT_FILE"
  fi
  first=false

  cat >> "$OUT_FILE" <<EOF
    "$channel": {
      "description": $description
    }
EOF
done

echo '' >> "$OUT_FILE"
echo '  }' >> "$OUT_FILE"
echo '}' >> "$OUT_FILE"

asyncapi bundle user.yaml common.yaml build/channel-descriptions.json -o build/user.json  
asyncapi bundle service.yaml common.yaml build/channel-descriptions.json -o build/service.json

asyncapi validate build/user.json
asyncapi validate build/service.json

asyncapi pretty build/user.json
asyncapi pretty build/service.json

asyncapi generate fromTemplate build/user.json @asyncapi/html-template -o ./docs --use-new-generator
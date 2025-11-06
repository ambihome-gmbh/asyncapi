mix test && 
for d in examples/*; do 
    [ -f "$d/mix.exs" ] && echo "==> $d" && (cd "$d" && mix deps.get && mix compile && mix test) || true 
done

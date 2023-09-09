# Detect shell
echo Detecting current shell...

SHELL=""
for i in $(echo $0 | tr "/" "\n"); do
    SHELL=$i
done
RC="$HOME/.${SHELL}rc"

echo RC Path: $RC
echo 'export PATH=$PATH:~/zig' >> $RC
echo Done!
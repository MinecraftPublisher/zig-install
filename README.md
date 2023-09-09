# zig-build
An installer script for zig, Written in Bun Javascript.

### This script:
1. Fetches the release data from the official zig website
2. Obtains the build target for the current machine
3. Checks for an existing clone of the latest download ->
     If yes, Jumps directly to Step 5.
4. Downloads and extracts the latest release
5. Copies the latest release to the current user's home directory.
6. Quits; If there are no errors, A `zig/` directory should be created on your
     home directory.

### Adding to PATH
To add zig to path after running this script, You have to add this line to your rc file:
```bash
export PATH=$PATH:~/zig
```
Or, To ease your work, Run this:
```bash
curl https://raw.githubusercontent.com/MinecraftPublisher/zig-build/master/path.sh | $0
```
(This will download and run the script below)

Or, Run this script to add it directly to your rc file:
```bash
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
```
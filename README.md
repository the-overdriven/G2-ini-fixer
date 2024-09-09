# G2-ini-fixer
Gothic 2 .ini fixer, a script to selectively apply settings from file(s), without changing entire target .ini file(s). Requires Node.js.

Why? Because dumb Steam keeps resetting my settings. It helps whem having multiple game installations. And backup of the .ini files is not sufficient. A script selectively replacing specific options is more reliable than replacing entire .ini files, as i.e. `Gothic.ini` may have included settings appended from new Union plugins in the meantime, so we obviously don't want to loose them by careless overwrite of the entire .ini file. The script also provides logging, so we know which settings have been changed and when.

It might not work with non-unique options such as `Enabled=1`.

## Usage
1. Enter your preferred settings in the .ini files.
2. Change path to the script directory (`sourceDir`) in `fix-ini.js` (required only before the first script run).
3. Change path to the game directory (`targetDir`) in `fix-ini.js` (required only once per each game installation).
4. Run `fix-ini.bat` (ideally from command line).


Currently it works with `Gothic.ini`, `SystemPack.ini` and `GD3D11/UserSettings.ini`, but specific files can be adjusted in `fix-ini.bat`.

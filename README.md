# G2-ini-fixer
Gothic 2 .ini fixer, a script to selectively apply settings from a file, without changing entire target .ini files. Requires Node.js.

Why? Because dumb Steam keeps overwriting my settings. It's also more reliable than replacing entire .ini files, as i.e. Gothic.ini may include settings appended from new Union plugins, so we obviously don't want to loose them by careless overwrite of the entire .ini file. The script also provides logging, so we know which settings have been changed and when.

## Usage
1. Change path to the script directory (`sourceDir`) in `fix-ini.js`.
2. Change path to the game directory (`targetDir`) in `fix-ini.js`
3. Run `fix-ini.bat` (ideally from command line).


Currently it works with `Gothic.ini`, `SystemPack.ini` and `GD3D11/UserSettings.ini`, but specific files can be adjusted in `fix-ini.bat`.

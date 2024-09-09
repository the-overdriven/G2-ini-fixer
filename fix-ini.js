// usage example:
// node fix-ini.js file=SystemPack.ini

const fs = require('fs');
const path = require('path');

// Default filenames and directories
const sourceDir = 'C:\\Users\\dell\\Dropbox\\_GAMES\\GOTHIC\\PROJECTS\\G2-ini-fixer';
const targetDir = 'C:\\Program Files (x86)\\Steam\\steamapps\\common\\Gothic II\\system';
const logFilePath = 'update_log.txt';

// Retrieve the filename from the command line arguments
const args = process.argv.slice(2);
const filenameArg = args.find(arg => arg.startsWith('file='));
const filename = filenameArg ? filenameArg.split('=')[1] : 'Gothic.ini'; // Default to Gothic.ini if no argument is provided

// Construct full paths based on the filename
const sourceIniPath = path.join(sourceDir, filename);
const targetIniPath = path.join(targetDir, filename);
const tempIniPath = path.join(targetDir, `${filename}_temp`);
const backupIniPath = path.join(targetDir, `${filename}_backup`);

// Helper function to log messages
const logMessage = (message) => {
    console.log(message);
    fs.appendFileSync(logFilePath, message + '\n');
};

// Read the source INI file and create a map of key-value pairs
const readSourceIni = () => {
    logMessage(`[${new Date().toISOString()}] INFO: Reading source INI file: ${sourceIniPath}`);
    const sourceData = fs.readFileSync(sourceIniPath, 'utf8');
    const sourceLines = sourceData.split('\n');
    const sourceMap = new Map();

    sourceLines.forEach(line => {
        const [key, value] = line.split('=').map(part => part ? part.trim() : '');
        if (key) {
            sourceMap.set(key, value);
        }
    });

    logMessage(`[${new Date().toISOString()}] INFO: Source INI file read successfully`);
    return sourceMap;
};

// Create a backup of the target INI file
const backupTargetIni = () => {
    logMessage(`[${new Date().toISOString()}] INFO: Creating backup of target INI file: ${targetIniPath}`);
    fs.copyFileSync(targetIniPath, backupIniPath);
    logMessage(`[${new Date().toISOString()}] INFO: Backup of target INI file created: ${backupIniPath}`);
};

// Update the target INI file based on the source INI file
const updateTargetIni = (sourceMap) => {
    logMessage(`[${new Date().toISOString()}] INFO: Updating target INI file: ${targetIniPath}`);
    const targetData = fs.readFileSync(targetIniPath, 'utf8');
    const targetLines = targetData.split('\n');
    const updatedLines = [];

    targetLines.forEach(line => {
        const [key, value] = line.split('=').map(part => part ? part.trim() : '');

        if (line.startsWith(';') || line.startsWith('[') || line.trim() === '') {
            // Preserve comments, section headers, and blank lines
            updatedLines.push(line);
        } else if (key && sourceMap.has(key)) {
            // Update key-value pairs
            const newValue = sourceMap.get(key);
            if (value !== newValue) {
                updatedLines.push(`${key}=${newValue}`);
                logMessage(`[${new Date().toISOString()}] INFO: Updated key '${key}' from value '${value}' to '${newValue}'`);
            } else {
                updatedLines.push(line);
            }
        } else {
            updatedLines.push(line);
        }
    });

    fs.writeFileSync(tempIniPath, updatedLines.join('\n'));
    fs.renameSync(tempIniPath, targetIniPath);
    logMessage(`[${new Date().toISOString()}] INFO: ${filename} file updated successfully`);
};

// Main function to perform the update
const main = () => {
    try {
        logMessage(`[${new Date().toISOString()}] INFO: Starting update process`);

        if (!fs.existsSync(sourceIniPath)) {
            throw new Error(`Source INI file not found: ${sourceIniPath}`);
        }

        if (!fs.existsSync(targetIniPath)) {
            throw new Error(`Target INI file not found: ${targetIniPath}`);
        }

        backupTargetIni();
        const sourceMap = readSourceIni();
        updateTargetIni(sourceMap);
    } catch (error) {
        logMessage(`[${new Date().toISOString()}] ERROR: ${error.message}`);
    }
};

main();

const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Function to convert size strings to bytes
function convertToBytes(sizeStr) {
  const units = {
    KB: 1024,
    MB: 1024 * 1024,
    GB: 1024 * 1024 * 1024,
    TB: 1024 * 1024 * 1024 * 1024
  };
  const match = sizeStr.match(/^(\d+(?:\.\d+)?)\s*(KB|MB|GB|TB)$/i);
  if (match) {
    return parseFloat(match[1]) * units[match[2].toUpperCase()];
  }
  return 0;
}

// Function to convert bytes to the most appropriate unit
function formatBytes(bytes) {
  if (bytes >= 1024 * 1024 * 1024 * 1024) return (bytes / (1024 * 1024 * 1024 * 1024)).toFixed(2) + ' TB';
  else if (bytes >= 1024 * 1024 * 1024) return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
  else if (bytes >= 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  else if (bytes >= 1024) return (bytes / 1024).toFixed(2) + ' KB';
  return bytes + ' bytes';
}

// Total size of all games across all consoles
let totalSizeBytesAllGames = 0;

// Use path.resolve to make sure the correct absolute path is used
const consolesDir = path.resolve(__dirname, 'updated_consoles');

// Read the directory for JS files
fs.readdir(consolesDir, async (err, files) => {
  if (err) {
    console.error("Could not list the directory.", err);
    process.exit(1);
  }

  // Use a for...of loop to handle the asynchronous nature of API calls
  for (const file of files) {
    if (path.extname(file) === '.js') {
      try {
        // Require the JS file
        const consoleData = require(path.join(consolesDir, file));
        const consoleName = path.basename(file, '.js').charAt(0).toUpperCase() + path.basename(file, '.js').slice(1);
        if (consoleData && Array.isArray(consoleData.games)) {
          let totalSizeBytes = 0;
          for (const gameId of consoleData.games) {
            try {
              const response = await axios.get(`http://localhost:3017/api/games/read/game/${gameId}`);
              const sizeBytes = convertToBytes(response.data.downloadSize);
              totalSizeBytes += sizeBytes;
              totalSizeBytesAllGames += sizeBytes; // Add to the total size of all games
            } catch (apiError) {
              console.error(`Error calling API for game ID ${gameId}:`, apiError.message);
            }
          }
          console.log(`${consoleName} has ${consoleData.games.length} games and they take up ${formatBytes(totalSizeBytes)}`);
        } else {
          console.log(`No games array found in ${file}`);
        }
      } catch (error) {
        console.error(`Error requiring file ${file}:`, error);
      }
    }
  }
  
  // After all files have been processed, print out the total size for all games
  console.log(`All of the games combined take up ${formatBytes(totalSizeBytesAllGames)}`);
});

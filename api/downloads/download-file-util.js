const fs = require("fs");
const appSettings = require('../app-settings');

/**
 *
 * @type {{start: number, end: null}}
 */
const defaultOptions = Object.assign(
  {
    start: 0,
    end: null
  },
  appSettings.getSettings().defaultManifestRequestOptions
);

/**
 *
 * @type {{CHUNK_ERROR: string, CHUNK_SIZE_ERROR: string, FILE_CREATING_ERROR: string, FILE_WRITING_ERROR: string,
 *     ABORTED: string}}
 */
const errors = {
  ABORTED: "ABORTED",
  CHUNK_ERROR: "CHUNK_ERROR",
  CHUNK_SIZE_ERROR: "CHUNK_SIZE_ERROR",
  FILE_CREATING_ERROR: "FILE_CREATING_ERROR",
  FILE_WRITING_ERROR: "FILE_WRITING_ERROR",
  INTERNET: "INTERNET",
  TIMEOUT: "TIMEOUT",
};

/**
 * @param {string} fileUrl - file url
 * @param {function} callback - callback to be invoked when check for file has been done
 * @returns {void}
 */
function checkForLocalFile (fileUrl, callback) {
  fs.exists(fileUrl, function (exists) {
    if (exists) {
      fs.stat(fileUrl, function (error, stat) {
        if (error) {
          callback(false)
        } else {
          callback(true, stat.size);
        }
      });
    } else {
      callback(false);
    }
  });
}

module.exports = {
  checkForLocalFile: checkForLocalFile,
  defaultOptions: defaultOptions,
  errors: errors
};
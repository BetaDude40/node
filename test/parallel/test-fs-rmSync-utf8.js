'use strict';

// This test will make sure that fs.rmSync works correctly on Windows file paths
// which require a conversion from UTF-16 to UTF-8 encoding.

require('../common');
const filesys = require('node:fs');
const path = require('node:path');
const assert = require('node:assert');
const tempdir = require('../common/tmpdir');

// Initialize a temporary directory for testing
tempdir.refresh();

// Create a file path which has the offending character from issue #56049
const filepath = path.join(tempdir.path, '速.txt');

// Create a directory and a file with non-ASCII characters, then remove it
filesys.writeFileSync(filepath, 'This is a test file with special characters.');
filesys.rmSync(filepath);

// Use an assertion to verify the file is deleted
assert.strictEqual(fs.existsSync(filepath), false);

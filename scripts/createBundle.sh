#!/bin/bash

# move to folder of script / to able to run same script from here or one folder up
cd "$(dirname "$0")" 
cd ..

browserify --debug app/js/main.js -o bundle.js

echo "Created bundle.js"
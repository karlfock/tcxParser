#!/bin/bash

BASE_DIR=`dirname $0`

# move to folder of script / to able to run same script from here or one folder up
cd "$(dirname "$0")" 
cd ..

echo ""
echo "Starting Karma Server (http://karma-runner.github.io)"
echo "-------------------------------------------------------------------"

echo "*******************************"
echo "**** generate test data *******"
echo "*******************************"

pwd
./scripts/generateTestData.sh

# run server side test
cd node
mocha

cd ..


echo "*******************************"
echo "**** mocha test finished ******"
echo "*******************************"


$BASE_DIR/../node_modules/karma/bin/karma start $BASE_DIR/../config/karma.conf.js $*

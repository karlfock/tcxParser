#!/bin/sh

# invoke node to create test data from test.tcx
echo "generates JSON test data from test.tcx: ../test/resources/parsedTcxJson.json"
cd node
node test/resources/generateTestData.js > ../test/resources/parsedTcxJson.js
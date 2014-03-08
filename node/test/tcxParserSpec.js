"use strict";

var expect = require("chai").expect,

    TestHelper = require("./helper/testHelper").TestHelper,
    testHelper = new TestHelper(),
    tcxXml = testHelper.tcxXml,
    tcxXml2 = testHelper.tcxXml2,
    tcxParser = testHelper.tcxParser;

describe("TcxParser", function () {
    describe('parse()', function () {

        it("should parse tcx files to JS object", function () {

            [tcxXml, tcxXml2].forEach(function (xml) {


                tcxParser.parse(xml, function (track) {

                    console.log("track:", JSON.stringify(track));

                    var firstLap, firstTrackPoint, firstPosition;

//                    expect(track).to.have.a.property("date", "2013-12-17T07:30:01Z");
                    expect(track.laps).to.be.instanceof(Array);
//                    expect(track.laps).to.have.length(8);

                    // test lap object
                    firstLap = track.laps[0];

                    expect(firstLap).to.have.property("startTime");
                    expect(firstLap).to.have.property("calories");
                    expect(firstLap).to.have.property("distanceMeters");
                    expect(firstLap).to.have.property("intensity");
                    expect(firstLap).to.have.property("maximumSpeed");
                    expect(firstLap).to.have.property("totalTimeSeconds");
                    expect(firstLap).to.have.property("trackPoints");
                    expect(firstLap).to.have.property("triggerMethod");

                    // track points should have the lap index in it
                    expect(track.laps[0].trackPoints[0].lapId).to.equal(0);
                    expect(track.laps[1].trackPoints[0].lapId).to.equal(1);

                    firstTrackPoint = firstLap.trackPoints[0];
                    expect(firstTrackPoint).to.have.property("trackPointId");
                    expect(firstTrackPoint.trackPointId).to.equal(0);
                    expect(firstTrackPoint).to.have.property("altitudeMeters");
                    expect(firstTrackPoint).to.have.property("distanceMeters");
                    expect(firstTrackPoint).to.have.property("position");

                    firstPosition = firstTrackPoint.position;
                    expect(firstPosition).to.have.property("latitudeDegrees");
                    expect(firstPosition).to.have.property("longitudeDegress");

                    expect(firstTrackPoint).to.have.property("sensorState");
                    expect(firstTrackPoint).to.have.property("altitudeMeters");
                    expect(firstTrackPoint).to.have.property("time");

                });
            });
        });
    });
});
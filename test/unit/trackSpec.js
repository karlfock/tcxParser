define([
    'baseTestUrl/resources/parsedTcxJson',
    'lib/track'
], function (tcxData, Track) {
    'use strict';

    var NBR_TRACK_POINTS_IN_TEST_FILE = 454,
        track = new Track(tcxData);

    describe('Track', function () {


        describe('getTrackPoints()', function () {
            it("should get the track points of a track", function () {
                var firstTrackPoint = track.getTrackPoints()[0],
                    lastTrackPoint = track.getTrackPoints()[NBR_TRACK_POINTS_IN_TEST_FILE - 1];

                expect(track.getTrackPoints().length).toEqual(NBR_TRACK_POINTS_IN_TEST_FILE);
                expect(firstTrackPoint.trackPointId).toEqual(0);
                expect(lastTrackPoint.trackPointId).toEqual(NBR_TRACK_POINTS_IN_TEST_FILE - 1);
            });
        });

        describe('getLastTrackPoint()', function () {
            it("should get the last track point containing track data", function () {
                var lastTrackPoint = track.getLastTrackPoint();
                expect(lastTrackPoint.distanceMeters).toEqual("7090.3901367");
            });
        });

        describe('getTrackSummary()', function() {
            it("should return an object containing summary info for the track", function  () {
                var trackSummary = track.getTrackSummary();
                expect(trackSummary.getDistanceInKm()).toEqual(7.1);
                expect(trackSummary.getDate()).toEqual("2013-12-17");
            });
        });

        describe('getTpLength()', function () {
            it("should get the length of all track points", function () {
                expect(track.getTpLength()).toEqual(NBR_TRACK_POINTS_IN_TEST_FILE);
            });
        });

        describe('createSubTrack()', function () {
            it("should create a sub track of specified start and end index", function () {

                expect(track.createSubTrack({
                    from: 1,
                    to: 5
                }).length).toEqual(5);

                expect(track.createSubTrack({
                    from: NBR_TRACK_POINTS_IN_TEST_FILE,
                    to: 500
                }).length).toEqual(0);
                expect(track.createSubTrack({
                    from: 5,
                    to: 4
                }).length).toEqual(0);
                expect(track.createSubTrack({
                    from: 4,
                    to: 5
                }).length).toEqual(2);
                expect(track.createSubTrack({
                    from: -1,
                    to: 5
                }).length).toEqual(0);
                expect(track.createSubTrack({
                    from: 0,
                    to: 0
                }).length).toEqual(1);
            });
        });

    });

});
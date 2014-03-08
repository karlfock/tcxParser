define([
    'baseTestUrl/resources/parsedTcxJson',
    'lib/track',
    'lib/trackSearcher'
], function (tcxData, Track, TrackSearcher) {
    'use strict';

    describe("TrackSearcher", function () {
        describe('getFastestSubTrackByDistance()', function () {
            it("get the fastest sub track with a specified distance", function () {

                var subTrack,
                    firstSubTrackPoint, nextToLastSubTrackPoint, lastSubTrackPoint, afterLastSubTrackPoint,
                    diffTargetDistanceFirstLast, diffTargetDistanceFirstNextToLast, diffTargetDistanceFirstAfterLast,
                    targetDistance = 100,
                    expectedSubTrackLength = 7,
                    trackSearcher,
                    track,
                    NBR_TRACK_POINTS_IN_TEST_FILE = 454;

                track = new Track(tcxData);
                trackSearcher = new TrackSearcher(track);

                subTrack = trackSearcher.getFastestSubTrackByDistance(targetDistance);
                expect(subTrack.length).toEqual(expectedSubTrackLength);

                // verify that the difference between the first point and the
                // last point in the sub track is the closest to the target distance.
                // also compare with the points before and after, the one after
                // being outside the subtrack.
                firstSubTrackPoint = subTrack[0];

                nextToLastSubTrackPoint = subTrack[expectedSubTrackLength - 2];
                lastSubTrackPoint = subTrack[expectedSubTrackLength - 1];
                afterLastSubTrackPoint = trackSearcher.getNextPoint(lastSubTrackPoint);

                diffTargetDistanceFirstLast = Math.abs(targetDistance - (lastSubTrackPoint.distanceMeters - firstSubTrackPoint.distanceMeters));
                diffTargetDistanceFirstNextToLast = Math.abs(targetDistance - (nextToLastSubTrackPoint.distanceMeters - firstSubTrackPoint.distanceMeters));
                diffTargetDistanceFirstAfterLast = Math.abs(targetDistance - (afterLastSubTrackPoint.distanceMeters - firstSubTrackPoint.distanceMeters));

                expect(diffTargetDistanceFirstLast < diffTargetDistanceFirstNextToLast).toEqual(true);
                expect(diffTargetDistanceFirstLast < diffTargetDistanceFirstAfterLast).toEqual(true);

                // distance is bigger than entire track, should get all track points
                subTrack = trackSearcher.getFastestSubTrackByDistance(8000);
                expect(subTrack.length).toEqual(NBR_TRACK_POINTS_IN_TEST_FILE);

                subTrack = trackSearcher.getFastestSubTrackByDistance(0);
                expect(subTrack.length).toEqual(0);

                // if positive number, it will always try to find two points
                // as close as possible to that target distance.
                subTrack = trackSearcher.getFastestSubTrackByDistance(1);
                expect(subTrack.length).toEqual(2);
            });
        });
    });
});
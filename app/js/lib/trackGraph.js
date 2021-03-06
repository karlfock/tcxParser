"use strict";

var d3 = require("d3");

function TrackGraph(track) {
    this.track = track;
}

TrackGraph.prototype.init = function() {

    var margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40
    },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var formatPercent = d3.format(".0");

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], 0.1, 1);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(formatPercent);

    var svg = d3.select("#track-laps-graph").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var data = this.track.laps.map(function(lap, idx) {
        lap.id = idx + 1;
        return lap;
    });


    data.forEach(function(d) {
        d.totalTimeSeconds = +d.totalTimeSeconds;
    });

    x.domain(data.map(function(d) {
        return d.id;
    }));
    y.domain([0, d3.max(data, function(d) {
        return d.totalTimeSeconds;
    })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("totalTimeSeconds");

    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) {
            return x(d.id);
        })
        .attr("width", x.rangeBand())
        .attr("y", function(d) {
            return y(d.totalTimeSeconds);
        })
        .attr("height", function(d) {
            return height - y(d.totalTimeSeconds);
        });

    d3.select("#sort-graph").on("change", change);

    var sortTimeout = setTimeout(function() {
        d3.select("#sort-graph").property("checked", true).each(change);
    }, 2000);

    function change() {
        clearTimeout(sortTimeout);

        // Copy-on-write since tweens are evaluated after a delay.
        var x0 = x.domain(data.sort(this.checked ? function(a, b) {
                return b.totalTimeSeconds - a.totalTimeSeconds;
            } : function(a, b) {
                return d3.ascending(a.id, b.id);
            })
            .map(function(d) {
                return d.id;
            }))
            .copy();

        var transition = svg.transition().duration(750),
            delay = function(d, i) {
                return i * 50;
            };

        transition.selectAll(".bar")
            .delay(delay)
            .attr("x", function(d) {
                return x0(d.id);
            });

        transition.select(".x.axis")
            .call(xAxis)
            .selectAll("g")
            .delay(delay);
    }
};


module.exports.create = function(track) {
    return new TrackGraph(track);
};
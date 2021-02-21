import React, {useRef, useEffect} from 'react';

import * as d3 from "d3";

import './GraphicView.scss'

const GraphicView = ({ratesData, setRef, ...props}) => {
    const placeholder = useRef(null);

    useEffect(() => {
        setNewGraphic();
        setRef(placeholder.current);
    }, [ratesData]);

    const setNewGraphic = () => {
        const placeholderEl = placeholder.current;

        var margin = {top: 15, right: 30, bottom: 30, left: 60},
            width = placeholderEl.offsetWidth - margin.left - margin.right,
            height = placeholderEl.offsetHeight - margin.top - margin.bottom;

        placeholderEl.innerHTML = '';
        var newBlock = document.createElement("div");
        placeholderEl.appendChild(newBlock);

        // append the svg object to the body of the page
        var svg = d3.select(newBlock)
            .append("svg")
            .attr("width", width)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");




        // const example = [{"day":"2021-01-01","mean":1615,"low":1037,"high":2736},{"day":"2021-01-02","mean":1615,"low":1037,"high":2500},{"day":"2021-01-03","mean":1615,"low":1037,"high":2600}];
        const example = ratesData || [];

        const localData = example.map(item => ({
            ...item,
            day: d3.timeParse("%Y-%m-%d")(item.day)
        }));

        // Add X axis --> it is a date format
        var x = d3.scaleTime()
            .domain(d3.extent(localData, function(d) { return d.day; }))
            .range([ 0, width ]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).ticks(d3.timeDay.every(1)));

        // Add Y axis
        var y = d3.scaleLinear()
            .domain([0, d3.max(localData, function(d) { return +d.high; })])
            .range([ height, 0 ]);
        svg.append("g")
            .call(d3.axisLeft(y)
                .ticks(5)
                .tickFormat((d)=>  '$ ' +d));

        // Add the line
        svg.append("path")
            .datum(localData)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                .x(function(d) { return x(d.day) })
                .y(function(d) { return y(d.high) })
            )

        svg.append("path")
            .datum(localData)
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                .x(function(d) { return x(d.day) })
                .y(function(d) { return y(d.low) })
            )

        svg.append("path")
            .datum(localData)
            .attr("fill", "none")
            .attr("stroke", "green")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                .x(function(d) { return x(d.day) })
                .y(function(d) { return y(d.mean) })
            )
    };

    return (
        <div className="GraphicView">
            <div className="GraphicView__placeholder" ref={placeholder}/>
        </div>
    )
};

export default GraphicView;
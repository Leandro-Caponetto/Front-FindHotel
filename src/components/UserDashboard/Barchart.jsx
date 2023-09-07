import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import styles from "./Barchart.module.css"
import PropTypes from 'prop-types';

const BarChart = ({ data, title }) => {
    const chartRef = useRef();  
    useEffect(() => {
      const svg = d3.select(chartRef.current);
  
      const xScale = d3.scaleBand()
        .domain(data.map(d => d.label))
        .range([0, 350])
        .padding(0.1);
  
      const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)])
        .range([150, 0]);
  
        svg.selectAll(`.${styles.bar}`)
        .data(data)
        .enter().append("rect")
        .attr("class", styles.bar)
        .attr("x", d => xScale(d.label))
        .attr("y", d => yScale(d.value))
        .attr("width", xScale.bandwidth())
        .attr("height", d => 250 - yScale(d.value));
    }, [data]);
  
    return (
      <div className={styles.chartContainer}>
        <h2 className={styles.chartTitle}>{title}</h2>
        <svg ref={chartRef} width={400} height={200}></svg>
      </div>
    );
  };



  BarChart.propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
      })
    ).isRequired,
    title: PropTypes.string.isRequired,
  };
export default BarChart;

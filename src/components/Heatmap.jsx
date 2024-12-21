



import React, { useState } from 'react';
import { HeatMapGrid } from 'react-grid-heatmap';

// Helper function to process data by hour and day within the selected month and week
const processData = (data, selectedMonth, weekOffset) => {
  const xLabels = new Array(24).fill(0).map((_, i) => `${i}`);
  const yLabels = [];

  // Calculate the start and end of the selected week
  const firstDayOfMonth = new Date(new Date().getFullYear(), selectedMonth, 1);
  const startOfWeek = new Date(firstDayOfMonth);
  startOfWeek.setDate(firstDayOfMonth.getDate() + weekOffset * 7);
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  // Generate yLabels as "1 Jan", "2 Jan", etc.
  for (let d = new Date(startOfWeek); d <= endOfWeek; d.setDate(d.getDate() + 1)) {
    yLabels.push(`${d.getDate()} ${d.toLocaleString('default', { month: 'short' })}`);
  }

  // Initialize data structure for the heatmap
  const result = new Array(yLabels.length)
    .fill(0)
    .map(() => new Array(xLabels.length).fill(0));

  data.forEach((item) => {
    const date = new Date(item.DateTimestamp);
    if (
      item.Category === 'Defect' &&
      date >= startOfWeek &&
      date <= endOfWeek &&
      date.getMonth() === selectedMonth
    ) {
      const hour = date.getHours();
      const dayIndex = Math.floor((date - startOfWeek) / (1000 * 60 * 60 * 24));
      if (dayIndex >= 0 && dayIndex < yLabels.length) {
        result[dayIndex][hour]++;
      }
    }
  });

  return { xLabels, yLabels, result };
};

const Heatmap = ({ rawData }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [weekOffset, setWeekOffset] = useState(0);

  const { xLabels, yLabels, result: data } = processData(
    rawData,
    selectedMonth,
    weekOffset
  );

  const handleMonthChange = (event) => {
    setSelectedMonth(Number(event.target.value));
    setWeekOffset(0); // Reset week slider when the month changes
  };

  return (
    <div style={{ width: '100%', padding: '20px' }}>
      <h2>Defect Heatmap</h2>

      {/* Month Filter */}
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="month-select" style={{ marginRight: '10px' }}>
          Select Month:
        </label>
        <select
          id="month-select"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i}>
              {new Date(0, i).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>
      </div>

      {/* Week Navigation */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setWeekOffset((prev) => prev - 1)}>
          Previous Week
        </button>
        <button onClick={() => setWeekOffset((prev) => prev + 1)}>
          Next Week
        </button>
      </div>

      {/* Heatmap */}
      <HeatMapGrid
        data={data}
        xLabels={xLabels}
        yLabels={yLabels}
        cellRender={(x, y, value) => (
          <div title={`Hour: ${x}, Date: ${yLabels[y]} | Total Defects: ${value}`}>
            {value}
          </div>
        )}
        xLabelsStyle={(index) => ({
          color: index % 2 ? 'transparent' : '#777',
          fontSize: '.8rem',
        })}
        yLabelsStyle={() => ({
          fontSize: '.7rem',
          textTransform: 'uppercase',
          color: '#777',
        })}
        cellStyle={(_x, _y, ratio) => ({
          background: `rgb(255, 69, 0, ${ratio})`,
          fontSize: '.8rem',
          color: `rgb(0, 0, 0, ${ratio / 2 + 0.4})`,
        })}
        cellHeight="2rem"
        xLabelsPos="bottom"
        yLabelsPos="left"
        square
      />
    </div>
  );
};

export default Heatmap;

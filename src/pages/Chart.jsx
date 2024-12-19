import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css'; // Optional: To style the calendar

const Chart = () => {
  // Sample defect data
  const defectData = [
    { day: '2024-12-01', hour: 8, type: 'holed' },
    { day: '2024-12-01', hour: 14, type: 'folding' },
    { day: '2024-12-02', hour: 10, type: 'holed' },
    { day: '2024-12-02', hour: 12, type: 'folding' },
    { day: '2024-12-03', hour: 9, type: 'holed' },
    { day: '2024-12-03', hour: 15, type: 'folding' },
    // More data...
  ];

  // Define color based on defect type
  const getColor = (type) => {
    switch (type) {
      case 'holed':
        return '#FF5733'; // Red for "holed"
      case 'folding':
        return '#33FF57'; // Green for "folding"
      default:
        return '#D3D3D3'; // Gray for no data
    }
  };

  // Transform defect data into a format suitable for the heatmap
  const heatmapData = defectData.map((entry) => ({
    date: entry.day, // Date key
    count: 1, // Each occurrence is counted as a single entry
    type: entry.type, // Defect type (holed/folding)
  }));

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Defect Heatmap</h1>
      
      <CalendarHeatmap
        startDate={new Date('2024-12-01')}
        endDate={new Date('2024-12-31')}
        values={heatmapData}
        showWeekdayLabels={true}
        classForValue={(value) => {
          // Apply different colors based on defect type
          if (value) {
            return `calendar-cell-${value.type}`;
          }
          return 'calendar-cell-default';
        }}
        tooltipDataAttrs={(value) => ({
          'data-tip': value ? `${value.type} defect on ${value.date}` : 'No defect',
        })}
        // Add styling classes
        style={{ width: '100%', height: 'auto' }}
      />

      <style jsx>{`
        /* Defining specific colors for each defect type */
        .calendar-cell-holed {
          background-color: #FF5733 !important;
        }
        .calendar-cell-folding {
          background-color: #33FF57 !important;
        }
        .calendar-cell-default {
          background-color: #D3D3D3 !important;
        }
      `}</style>
    </div>
  );
};

export default Chart;

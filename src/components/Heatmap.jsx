import { Button } from '@nextui-org/react';
import React from 'react';
import { HeatMapGrid } from 'react-grid-heatmap';

const xLabels = new Array(24).fill(0).map((_, i) => `${i}`); // Hours
const yLabels = new Array(7).fill(0).map((_, i) => `${i + 1}`);
const data = new Array(yLabels.length)
  .fill(0)
  .map(() =>
    new Array(xLabels.length)
      .fill(0)
      .map(() => Math.floor(Math.random() * 50 + 50))
  );


const Heatmap = () => {
  return (
    <div
      style={{
        width: 'calc(100% - 32px)', // Full width minus margin (16px on each side)
        margin: '16px', // Add margin around the heatmap
        overflowX: 'hidden', // Prevent horizontal scrolling
      }}
    >
      <HeatMapGrid
        data={data}
        xLabels={xLabels}
        yLabels={yLabels}
        // Render cell with tooltip
        cellRender={(x, y, value) => (
          <div title={`Pos(${x}, ${y}) = ${value}`}>{value}</div>
        )}
        xLabelsStyle={(index) => ({
          color: index % 2 ? 'transparent' : '#777',
          fontSize: '.8rem',
        })}
        yLabelsStyle={() => ({
          fontSize: '.7rem',
          color: '#777',
        })}
        cellStyle={(_x, _y, ratio) => ({
          background: `rgb(255, 0, 0, ${ratio})`, // Shades of red
          fontSize: '.8rem',
          color: `rgb(0, 0, 0, ${ratio / 2 + 0.4})`,
          width: `calc(100% / ${xLabels.length})`, // Dynamically adjust cell width
          height: '2rem', // Set cell height to be smaller
        })}
        cellHeight='2rem' // Adjust cell height for smaller cells
        xLabelsPos='bottom'
        onClick={(x, y) => alert(`Clicked (${x}, ${y})`)}
        yLabelsPos='right'
        square={false} // Allow rectangular cells
      />
      {/* <Button onClick>Next</Button> */}
    </div>
  );
};

export default Heatmap;

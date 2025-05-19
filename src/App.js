import React, { useState, useRef, useEffect } from 'react';
import { Bar, Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, 
  BarElement, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend
} from 'chart.js';
import { saveAs } from 'file-saver';
import * as Papa from 'papaparse';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const initialSampleData = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: 'Sample Dataset',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: '#1e40af',
    },
  ],
};

function App() {
  const [chartType, setChartType] = useState('bar');
  const [chartData, setChartData] = useState(initialSampleData);
  const [fileName, setFileName] = useState('No file chosen');
  const [csvData, setCsvData] = useState(null);
  const [headers, setHeaders] = useState([]);
  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');
  const chartRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setFileName(file.name);

    Papa.parse(file, {
      complete: (results) => {
        const data = results.data;
        if (data.length > 0) {
          setCsvData(data);
          const fileHeaders = data[0];
          setHeaders(fileHeaders);
          setXAxis(fileHeaders[0]);
          setYAxis(fileHeaders[1]);
        }
      },
      header: false,
    });
  };

  useEffect(() => {
    if (csvData && xAxis && yAxis) {
      const xIndex = headers.indexOf(xAxis);
      const yIndex = headers.indexOf(yAxis);

      if (xIndex >= 0 && yIndex >= 0) {
        const labels = csvData.slice(1).map(row => row[xIndex]);
        const values = csvData.slice(1).map(row => parseFloat(row[yIndex]));

        const newChartData = {
          labels: chartType === 'bar' ? labels : values,
          datasets: [
            {
              label: `${yAxis} vs ${xAxis}`,
              data: chartType === 'bar' ? values : values.map((val, i) => ({
                x: i,
                y: val
              })),
              backgroundColor: '#1e40af',
            },
          ],
        };
        setChartData(newChartData);
      }
    }
  }, [csvData, xAxis, yAxis, chartType, headers]);

  const getChartOptions = () => {
    return {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: `${yAxis} vs ${xAxis}`,
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: xAxis,
          },
        },
        y: {
          title: {
            display: true,
            text: yAxis,
          },
        },
      },
    };
  };

  const downloadChart = () => {
    if (chartRef.current) {
      const chartCanvas = chartRef.current.canvas;
      chartCanvas.toBlob((blob) => {
        saveAs(blob, `${chartType}-chart-${xAxis}-${yAxis}.png`);
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md border border-slate-200">
        <header className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-blue-800 mb-2">Chart Viewer</h1>
          <p className="text-slate-500 text-sm">Upload data & visualize it</p>
        </header>

        <div className="mb-6">
          <div className="flex items-center justify-center gap-4 mb-4">
            <label className="flex flex-col items-center px-4 py-2 bg-white text-blue-800 rounded-md border border-slate-300 cursor-pointer hover:bg-blue-50">
              <span className="text-sm font-medium">Choose CSV File</span>
              <input 
                type="file" 
                accept=".csv" 
                onChange={handleFileUpload} 
                className="hidden" 
              />
            </label>
            <span className="text-sm text-slate-500">{fileName}</span>
          </div>

          {headers.length > 0 && (
            <div className="flex justify-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-slate-700">X Axis:</label>
                <select
                  value={xAxis}
                  onChange={(e) => setXAxis(e.target.value)}
                  className="px-2 py-1 border border-slate-300 rounded-md text-sm"
                >
                  {headers.map((header, index) => (
                    <option key={`x-${index}`} value={header}>{header}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-slate-700">Y Axis:</label>
                <select
                  value={yAxis}
                  onChange={(e) => setYAxis(e.target.value)}
                  className="px-2 py-1 border border-slate-300 rounded-md text-sm"
                >
                  {headers.map((header, index) => (
                    <option key={`y-${index}`} value={header}>{header}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <div className="flex justify-center gap-4">
            <button
              onClick={() => setChartType('bar')}
              className={`px-4 py-2 rounded-md text-sm font-medium border ${
                chartType === 'bar'
                  ? 'bg-blue-800 text-white border-blue-800'
                  : 'bg-white text-blue-800 border-slate-300 hover:bg-blue-50'
              }`}
            >
              Bar Chart
            </button>
            <button
              onClick={() => setChartType('scatter')}
              className={`px-4 py-2 rounded-md text-sm font-medium border ${
                chartType === 'scatter'
                  ? 'bg-blue-800 text-white border-blue-800'
                  : 'bg-white text-blue-800 border-slate-300 hover:bg-blue-50'
              }`}
            >
              Scatter Chart
            </button>
            <button
              onClick={downloadChart}
              className="px-4 py-2 rounded-md text-sm font-medium border bg-green-600 text-white border-green-600 hover:bg-green-700"
              disabled={!xAxis || !yAxis}
            >
              Export as PNG
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-slate-200 h-[28rem]">
          {xAxis && yAxis ? (
            chartType === 'bar' ? (
              <Bar 
                ref={chartRef}
                data={chartData} 
                options={getChartOptions()} 
              />
            ) : (
              <Scatter 
                ref={chartRef}
                data={chartData} 
                options={getChartOptions()} 
              />
            )
          ) : (
            <div className="flex items-center justify-center h-full text-slate-500">
              {headers.length > 0 ? 'Please select X and Y axes' : 'Upload a CSV file to visualize data'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
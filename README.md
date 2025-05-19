# Data Visualization Dashboard

A React-based web application that allows users to upload CSV files and visualize the data through interactive charts, with the ability to export visualizations as PNG images.

## Features

- **CSV File Upload**: Upload any CSV file for visualization
- **Interactive Charts**: Choose between Bar and Scatter plot visualizations
- **Axis Selection**: Select which columns to use for X and Y axes
- **PNG Export**: Download your visualizations as high-quality PNG images
- **Responsive Design**: Works on desktop and mobile devices

## Technologies Used

- React.js
- Chart.js
- Papa Parse (for CSV parsing)
- FileSaver.js (for image downloads)
- Tailwind CSS (for styling)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/data-visualization-dashboard.git
   ```

2. Navigate to the project directory:

   ```bash
   cd data-plots
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Usage

1. Click **"Choose CSV File"** to upload your dataset
2. Select which columns to use for **X and Y axes** from the dropdown menus
3. Toggle between **Bar and Scatter** chart types
4. Click **"Export as PNG"** to download your visualization

## Project Structure

```
src/
├── App.js          # Main application component
├── index.js        # React entry point
├── components/     # Reusable components
├── assets/         # Static assets
└── styles/         # CSS files
```

## Screenshots

![Image 1](https://github.com/Pynthamil/PLOT-REACT/blob/1e10aaa63c9e82ce7b0df40fb89b993deaf84b8c/public/assets/img1.png)
![Image 2](https://github.com/Pynthamil/PLOT-REACT/blob/1e10aaa63c9e82ce7b0df40fb89b993deaf84b8c/public/assets/img2.png)
![Image 3](https://github.com/Pynthamil/PLOT-REACT/blob/1e10aaa63c9e82ce7b0df40fb89b993deaf84b8c/public/assets/img3.png)
![Image 4](https://github.com/Pynthamil/PLOT-REACT/blob/1e10aaa63c9e82ce7b0df40fb89b993deaf84b8c/public/assets/img4.png)

## Demo Video

🎥 [▶ Watch Demo Video](https://drive.google.com/file/d/1lBJ5XA5iDGRLSUMs46IUTiT0tGRuSObA/view?usp=drive_link)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements.

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

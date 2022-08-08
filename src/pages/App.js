import './App.css';
import convert from '../services/xlsx-to-csv';

function App() {
  return (
    <div className="App">
      <input type="file" accept='.xlsx' onChange={async (event) => {
        const csv = await convert(event.target.files[0]);
        console.log(csv)

        const url = window.URL.createObjectURL(
          new Blob([csv]),
        )
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'export.csv');
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      }}/>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/data');
      const data = await response.json();

      setData(data.output);
    };

    fetchData();
  }, []);

  return (
    <>
      <header>Data Table</header>
      <main>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Status</th>
              <th>Description</th>
              <th>Delta</th>
              <th>CreatedOn</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.status}</td>
                <td>{item.description}</td>
                <td>{item.delta}</td>
                <td>{item.createdOn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
}

export default App;

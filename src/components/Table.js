import React from 'react';
import './Table.css';

const Table = ({ entries, statuses, onFilterChange }) => (
  <table>
    <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>
          Status
          <br />
          <select onChange={event => onFilterChange(event.target.value)}>
            <option value="">--Filter by status--</option>
            {statuses.map(status => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </th>
        <th>Description</th>
        <th>Delta</th>
        <th>CreatedOn</th>
      </tr>
    </thead>
    <tbody>
      {entries.length > 0 ? (
        entries.map((item, index) => (
          <tr key={index}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.status}</td>
            <td>{item.description}</td>
            <td>{item.delta}</td>
            <td>{item.createdOn}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={6}>No matching records found</td>
        </tr>
      )}
    </tbody>
  </table>
);

export default Table;

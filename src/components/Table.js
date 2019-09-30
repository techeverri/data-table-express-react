import React from 'react';
import './Table.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { SORT_BY } from 'config';

const Table = ({ entries, statuses, onFilterChange, onSortByClick }) => (
  <table>
    <thead>
      <tr>
        <th
          className="table__sort-by"
          onClick={() => onSortByClick(SORT_BY.ID)}
        >
          Id <FontAwesomeIcon icon={faSort} pull="right" />
        </th>
        <th
          className="table__sort-by"
          onClick={() => onSortByClick(SORT_BY.NAME)}
        >
          Name <FontAwesomeIcon icon={faSort} pull="right" />
        </th>
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
        <th
          className="table__sort-by"
          onClick={() => onSortByClick(SORT_BY.CREATED_ON)}
        >
          CreatedOn <FontAwesomeIcon icon={faSort} pull="right" />
        </th>
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

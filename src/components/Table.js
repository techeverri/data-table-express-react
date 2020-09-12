import React from 'react';
import './Table.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSort,
  faSortDown,
  faSortUp,
} from '@fortawesome/free-solid-svg-icons';
import { SORT_BY, ORDER } from 'config';
import { format } from 'date-fns';

const INACTIVE_SORT_BY_COLOR = 'lightgray';

const getSortByIconColor = column => sortBy =>
  sortBy !== column ? INACTIVE_SORT_BY_COLOR : null;

const getSortByIcon = ({ column, sortBy, order }) =>
  sortBy !== column ? faSort : order === ORDER.ASC ? faSortUp : faSortDown;

const Table = ({
  entries,
  statuses,
  sortBy,
  order,
  onFilterChange,
  onSortByClick,
}) => (
  <table>
    <thead>
      <tr>
        <th
          className="table__header-id table__sort-by"
          onClick={() => onSortByClick(SORT_BY.ID)}
        >
          Id{' '}
          <FontAwesomeIcon
            icon={getSortByIcon({ column: SORT_BY.ID, sortBy, order })}
            pull="right"
            color={getSortByIconColor(SORT_BY.ID)(sortBy)}
          />
        </th>
        <th
          className="table__header-name table__sort-by"
          onClick={() => onSortByClick(SORT_BY.NAME)}
        >
          Name{' '}
          <FontAwesomeIcon
            icon={getSortByIcon({ column: SORT_BY.NAME, sortBy, order })}
            pull="right"
            color={getSortByIconColor(SORT_BY.NAME)(sortBy)}
          />
        </th>
        <th className="table__header-status">
          Status
          <br />
          <select onChange={event => onFilterChange(event.target.value)}>
            <option value="">-- Filter by status --</option>
            {statuses.map(status => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </th>
        <th className="table__header-description">Description</th>
        <th className="table__header-delta">Delta</th>
        <th
          className="table__header-created table__sort-by"
          onClick={() => onSortByClick(SORT_BY.CREATED_ON)}
        >
          CreatedOn{' '}
          <FontAwesomeIcon
            icon={getSortByIcon({ column: SORT_BY.CREATED_ON, sortBy, order })}
            pull="right"
            color={getSortByIconColor(SORT_BY.CREATED_ON)(sortBy)}
          />
        </th>
      </tr>
    </thead>
    <tbody>
      {entries.length > 0 ? (
        entries.map((entry, index) => {
          const createdOn = format(
            new Date(entry.createdOn),
            'yyyy-MM-dd HH:mm'
          );

          return (
            <tr key={index}>
              <td>{entry.id}</td>
              <td>{entry.name}</td>
              <td>{entry.status}</td>
              <td>{entry.description}</td>
              <td>{entry.delta}</td>
              <td>{createdOn}</td>
            </tr>
          );
        })
      ) : (
        <tr>
          <td colSpan={6}>No matching records found</td>
        </tr>
      )}
    </tbody>
  </table>
);

export default Table;

import PaginationControls from 'components/PaginationControls';
import Search from 'components/Search';
import Table from 'components/Table';
import { ENTRIES_PER_PAGE, INITIAL_PAGE, SORT_BY, ORDER } from 'config';
import useDebounce from 'hooks/useDebounce';
import qs from 'qs';
import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState({});
  const [page, setPage] = useState(INITIAL_PAGE);
  const [limit, setLimit] = useState(ENTRIES_PER_PAGE);

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 250);

  const [filterBy, setFilterBy] = useState('');

  const [sortBy, setSortBy] = useState(SORT_BY.ID);
  const [order, setOrder] = useState(ORDER.ASC);

  useEffect(() => {
    const fetchData = async () => {
      const query = qs.stringify({
        page,
        limit,
        search: debouncedSearch,
        filterBy,
        sortBy,
        order,
      });
      const path = '/data';
      const url = `${path}?${query}`;

      const response = await fetch(url);

      const {
        entries,
        from,
        to,
        total,
        pages,
        statuses,
      } = await response.json();
      setData({ entries, from, to, total, pages, statuses });
    };

    fetchData();
  }, [page, limit, debouncedSearch, filterBy, sortBy, order]);

  useEffect(() => {
    setPage(1);
  }, [filterBy, debouncedSearch, limit]);

  const { entries, from, to, total, pages, statuses } = data;

  const hasEntries = entries && Array.isArray(entries) && entries.length > 0;

  return (
    <>
      <header>
        <h1>Data Table</h1>
      </header>
      <main>
        {typeof entries === 'undefined' ? (
          <div>Loading...</div>
        ) : (
          <>
            <Search
              limit={limit}
              onLimitChange={limit => setLimit(limit)}
              onSearchChange={search => setSearch(search)}
            />
            <Table
              entries={entries}
              statuses={statuses}
              onFilterChange={filter => setFilterBy(filter)}
              onSortByClick={selectedSortBy => {
                setSortBy(selectedSortBy);

                if (selectedSortBy === sortBy) {
                  setOrder(order === ORDER.ASC ? ORDER.DESC : ORDER.ASC);
                } else {
                  setOrder(ORDER.ASC);
                }
              }}
            />

            {hasEntries && (
              <PaginationControls
                from={from}
                to={to}
                total={total}
                onPreviousClick={() => setPage(page - 1)}
                page={page}
                pages={pages}
                onNextClick={() => setPage(page + 1)}
              />
            )}
          </>
        )}
      </main>
    </>
  );
}

export default App;

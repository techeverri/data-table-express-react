import PaginationControls from 'components/PaginationControls';
import Search from 'components/Search';
import Table from 'components/Table';
import { ENTRIES_PER_PAGE, INITIAL_PAGE } from 'config';
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

  useEffect(() => {
    const fetchData = async () => {
      const query = qs.stringify({
        page,
        limit,
        search: debouncedSearch,
        filterBy,
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
  }, [page, limit, debouncedSearch, filterBy]);

  const { entries, from, to, total, pages, statuses } = data;

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
            />

            <PaginationControls
              from={from}
              to={to}
              total={total}
              onPreviousClick={() => setPage(page - 1)}
              page={page}
              pages={pages}
              onNextClick={() => setPage(page + 1)}
            />
          </>
        )}
      </main>
    </>
  );
}

export default App;

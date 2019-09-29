import qs from 'qs';
import React, { useEffect, useState } from 'react';
import './App.css';
import { ENTRIES_PER_PAGE, INITIAL_PAGE } from './constants';
import PaginationControls from './PaginationControls';
import Search from './Search';
import Table from './Table';
import useDebounce from './useDebounce';

function App() {
  const [data, setData] = useState({ entries: [] });
  const [page, setPage] = useState(INITIAL_PAGE);
  const [limit, setLimit] = useState(ENTRIES_PER_PAGE);

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 250);

  useEffect(() => {
    const fetchData = async () => {
      const query = qs.stringify({ page, limit, search: debouncedSearch });
      const path = '/data';
      const url = `${path}?${query}`;

      const response = await fetch(url);

      const { entries, from, to, total, pages } = await response.json();
      setData({ entries, from, to, total, pages });
    };

    fetchData();
  }, [page, limit, debouncedSearch]);

  const { entries, from, to, total, pages } = data;

  return (
    <>
      <header>
        <h1>Data Table</h1>
      </header>
      <main>
        {entries.length === 0 ? (
          <div>Loading...</div>
        ) : (
          <>
            <Search
              limit={limit}
              onLimitChange={limit => setLimit(limit)}
              onSearchChange={search => setSearch(search)}
            />
            <Table entries={entries} />

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

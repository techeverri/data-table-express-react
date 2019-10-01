import { useEffect, useState } from 'react';
import qs from 'qs';

const useData = ({ page, limit, search, filterBy, sortBy, order }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const query = qs.stringify({
        page,
        limit,
        search,
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
  }, [page, limit, search, filterBy, sortBy, order]);

  return data;
};

export default useData;

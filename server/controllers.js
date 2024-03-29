import fetch from 'node-fetch';
import { API_URL } from './config.js';
import Fuse from 'fuse.js';

export const dataController = async (req, res) => {
  const { page, limit, search, filterBy, sortBy, order } = req.query;

  let data;

  try {
    const result = await fetch(API_URL);
    data = (await result.json()).output;
  } catch (response) {
    return res.sendStatus(500);
  }

  // To be able to sort by `createdOn` there should be some consistency in the records
  // So this removes records where the `createdOn` property is either empty string, zero, or missing
  data = data.filter(entry => entry.createdOn);

  data = data.map(entry => ({
    ...entry,
    createdOn: new Date(entry.createdOn).getTime(),
  }));

  let statuses = data.map(entry => entry.status);
  statuses = [...new Set(statuses)].sort();

  if (filterBy) {
    data = data.filter(entry => entry.status === filterBy);
  }

  if (search) {
    const options = { keys: ['name'], threshold: 0.4 };
    const fuse = new Fuse(data, options);

    data = fuse.search(search).map(({item}) => item /** remove `refIndex` from `fuse.js` result */);
  }

  if (sortBy) {
    data = data.sort(
      (a, b) => (a[sortBy] > b[sortBy] ? 1 : -1) * (order === 'asc' ? 1 : -1)
    );
  }

  const start = (page - 1) * limit;
  const end = page * limit;
  const entries = data.slice(start, end);

  const total = data.length;
  const pages = Math.ceil(total / limit);

  return res.json({
    entries,
    limit,
    page,
    from: start + 1,
    to: end > total ? total : end,
    total,
    pages,
    statuses,
  });
};

import axios from 'axios';
import { createReadStream, readdirSync } from 'fs';
import FormData from 'form-data';

const host = 'localhost';
const port = '8000';

const instance = axios.create({
  baseURL: `http://${host}:${port}`
});

// Always resolve even if index does not exist
const deleteIndex = async () => {
  return new Promise((resolve) => {
    instance
      .delete('/elastic/index', {
        params: {
          name: 'cvs'
        }
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error: any) => {
        resolve(error.response);
      });
  });
};

const createIndex = async () => {
  return instance.post('/elastic/index', null, {
    params: {
      name: 'cvs'
    }
  });
};

const updateIndex = async () => {
  return instance.put(
    '/elastic/index',
    {
      mapping: {
        content: {
          type: 'text'
        },
        url: {
          type: 'text',
          index: false
        }
      }
    },
    {
      params: {
        name: 'cvs'
      }
    }
  );
};

const insertCVs = async () => {
  const dir = './scripts/data/';
  const files = readdirSync(dir);

  for (const file of files) {
    const form = new FormData();
    form.append('cvs', createReadStream(`${dir}${file}`));
    const response: any = await instance.post('/cv/', form, {
      headers: form.getHeaders()
    });
    console.log(response.data.message);
  }

  return Promise.resolve({
    data: {
      message: 'All files inserted'
    }
  });
};

// Run in order
(async () => {
  const streams = [deleteIndex, createIndex, updateIndex, insertCVs];

  for (const stream of streams) {
    const response: any = await stream();
    console.log(response.data.message);
  }
})().catch((e: any) => {
  console.error(e.response.data);
});

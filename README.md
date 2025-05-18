## How to Use Redux RTK Query in This Project
This project uses Redux Toolkit Query (RTK Query) for managing API requests efficiently.
This guide helps new developers quickly understand how to implement RTK Query to fetch or handle post request data.



## 📁 RTK Query Folder Structure
| File                          | Purpose                                                         |
| ----------------------------- | --------------------------------------------------------------- |
| `app/redux/api/apiSlice.js`   | RTK Query base setup: base URL, headers, and 401 redirect logic |
| `app/redux/api/coursesApi.js` | Example: course-related endpoints                               |
| `app/redux/store.js`          | Redux store configuration with RTK middleware                   |

## ⚙️ RTK Base Setup: apiSlice.js
In this apiSlice.js file i have added base setup like token pass, authorization checking etc like apiCall utilities function 
```
// app/redux/api/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    headers.set('Accept', 'application/json');
    return headers;
  },
});

const customBaseQuery = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('persist:user');
    window.location.href = process.env.NEXT_PUBLIC_AUTH_REDIRECT_URL;
  }
  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: customBaseQuery,
  tagTypes: ['Course'],
  endpoints: () => ({}),
});

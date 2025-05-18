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
In this apiSlice.js file I have added base setup like token pass, authorization checking etc like apiCall utilities function 
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
```

##📚 Example: Courses API Setup
in this example I have fetched courses list data, course details data with RTK Query
```
// app/redux/api/coursesApi.js
import { api } from './apiSlice';

export const coursesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPremiumCourses: builder.query({
      query: () => '/api/v2/courses',
      providesTags: ['Course'],
    }),
    getFreeCourses: builder.query({
      query: () => '/api/v2/free-courses',
      providesTags: ['Course'],
    }),
    getCourseById: builder.query({
      query: (id) => `/api/v2/courses/${id}`,
      providesTags: (result, error, id) => [{ type: 'Course', id }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPremiumCoursesQuery,
  useGetFreeCoursesQuery,
  useGetCourseByIdQuery,
} = coursesApi;
```
##🛠️ Step-by-Step: Add New RTK Query Endpoints

I have shown a GET request example; you can add any HTTP request here.

### 1. ✏️ Create New File
Create app/redux/api/interviewApi.js:
```
import { api } from './apiSlice';

export const interviewApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllInterviews: builder.query({
      query: () => '/api/v2/interviews',
      providesTags: ['Interview'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllInterviewsQuery } = interviewApi;
```

### 2. 🧩 Use the Hook in a Component

```
import { useGetAllInterviewsQuery } from '@/app/redux/api/interviewApi';

const InterviewList = () => {
  const { data, isLoading, error } = useGetAllInterviewsQuery();

  if (isLoading) return <p>Loading interviews...</p>;
  if (error) return <p>Error loading interviews.</p>;

  return (
    <ul>
      {data?.map((interview) => (
        <li key={interview.id}>{interview.title}</li>
      ))}
    </ul>
  );
};

```

### 3. Add a POST Request

Extend your endpoints in interviewApi.js:
```
addInterview: builder.mutation({
  query: (newInterview) => ({
    url: '/api/v2/interviews',
    method: 'POST',
    body: newInterview,
  }),
  invalidatesTags: ['Interview'],
});

```
Use in your component:
```
import { useAddInterviewMutation } from '@/app/redux/api/interviewApi';

const AddInterviewForm = () => {
  const [addInterview] = useAddInterviewMutation();

  const handleSubmit = async () => {
    await addInterview({ title: 'New Interview' });
  };

  return <button onClick={handleSubmit}>Add Interview</button>;
};

```


## 🧠 Helpful Tips
- Always define `tagTypes` for each resource (e.g., `['Course']`, `['Interview']`, etc.)
- Use `providesTags` and `invalidatesTags` to enable automatic cache updates
- Use `.concat(api.middleware)` in the Redux store to enable RTK Query middleware


## 📦 Learn More

## 📦 Learn More

- [Redux Toolkit Query Docs](https://redux-toolkit.js.org/rtk-query/overview)
- [Next.js Documentation](https://nextjs.org/docs)
- [Redux Persist](https://github.com/rt2zz/redux-persist)


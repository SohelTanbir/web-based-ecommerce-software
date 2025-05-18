This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## 🧭 How to Use Redux RTK Query in This Project

This project uses **Redux Toolkit Query (RTK Query)** for managing API requests efficiently.
This guide helps new developers quickly understand how to implement RTK Query to fetch or mutate data.

---

## 📁 Redux RTK Query Folder Structure

| File                          | Purpose                                                         |
| ----------------------------- | --------------------------------------------------------------- |
| `app/redux/api/apiSlice.js`   | RTK Query base setup: base URL, headers, and 401 redirect logic |
| `app/redux/api/coursesApi.js` | Example feature endpoints (e.g., premium & free courses)        |
| `app/redux/store.js`          | Redux store configuration and middleware setup                  |

---

### ✅ Features Handled by `apiSlice.js`

- Attaches `Authorization` token automatically
- Redirects to login page on 401 Unauthorized
- Base URL taken from `.env` (`NEXT_PUBLIC_BASE_URL`)

---

## 🛠️ Step-by-Step: Adding New RTK Query Endpoints

If you want to fetch or mutate data for a new resource (e.g., interviews), follow these steps.

---

### 1. ✏️ Create a New API Slice

Create a new file at: app/redux/api/interviewApi.js

Add this boilerplate:

```js
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
 🧩 Use the Hook in a Component
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
### (Optional) Add Mutations or post request
    addInterview: builder.mutation({
    query: (newInterview) => ({
        url: '/api/v2/interviews',
        method: 'POST',
        body: newInterview,
    }),
    invalidatesTags: ['Interview'],
    });
Use it like this in a component:

const [addInterview] = useAddInterviewMutation();

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
```

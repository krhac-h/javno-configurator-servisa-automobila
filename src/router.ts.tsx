import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from "react-router-dom";

import {QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
const queryClient = new QueryClient();


import Index from './pages/Index.tsx';
import Form from './pages/Form.tsx';
import Success from './pages/Success.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index></Index>,
  },
  {
    path: "form",
    element: <Form></Form>,
  },
  {
    path:"success",
    element: <Success></Success>,
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {/* <ReactQueryDevtools/> */}
    </QueryClientProvider>
  </StrictMode>,
)

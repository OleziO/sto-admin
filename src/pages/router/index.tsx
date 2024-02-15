import { createBrowserRouter } from "react-router-dom";
import { CustomerPage, loadCustomerData } from "../customerPage";
import { MainApp } from "../main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainApp />,
  },
  {
    path: "customers/:id",
    element: <CustomerPage />,
    loader: (params) => loadCustomerData(params),
  },
]);

export default router;

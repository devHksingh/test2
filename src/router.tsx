import { createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import HomeLayout from "./Layout/HomeLayout";
import FormPage from "./components/FormPage";
import ShowPage from "./components/ShowPage";
import UpdateUserData from "./components/UpdateUserData";
// import LoginPage from "./components/LoginPage";

const router = createBrowserRouter([
    {
        path:"",
        element:<HomeLayout/>,
        children:[
            {
                path:"",
                element:<Home/>
            },
            { path: "form", element: <FormPage /> },
            { path: "show", element: <ShowPage /> },
            { path: "update/:userId", element: <UpdateUserData /> },
            // { path: "login", element: <LoginPage /> },
        ]
    }
])

export default router
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {TabPage} from "@/pages/TabPage.tsx";

const router = createBrowserRouter([{
    element: <App />,
    children: [
        {
            path: '/',
            element: <TabPage />
        },
    ]
}])
//
// ReactDOM.createRoot(document.getElementById('root')!).render(
//     <React.StrictMode>
//         <RouterProvider router={router} />
//     </React.StrictMode>,
// )
ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />,
)
import { BrowserRouter, useRoutes } from "react-router-dom";
import ShowCreators from "./pages/ShowCreators";

function AppRoutes() {
    return useRoutes([{ path: "/", element: <ShowCreators /> }]);
}

export default function App() {
    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    );
}
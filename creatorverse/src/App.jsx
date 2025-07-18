// src/App.jsx
import React from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';

import ShowCreators  from './pages/ShowCreators';
import AddCreator    from './pages/AddCreator';
import EditCreator   from './pages/EditCreator';
import ViewCreator   from './pages/ViewCreator';

function AppRoutes() {
    return useRoutes([
        { path: '/',            element: <ShowCreators /> },
        { path: '/new',         element: <AddCreator /> },
        { path: '/edit/:id',    element: <EditCreator /> },
        { path: '/creator/:id', element: <ViewCreator /> },
        { path: '*',            element: <p>404 – Not Found</p> },
    ]);
}

export default function App() {
    return (
        <BrowserRouter>
            <main className="container">
                <h1>💫 Creatorverse</h1>
                <AppRoutes />
            </main>
        </BrowserRouter>
    );
}
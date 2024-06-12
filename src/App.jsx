import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import TodoContainer from './components/TodoContainer';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path='/'
                    element={
                        <TodoContainer
                            tableName={import.meta.env.VITE_TABLE_NAME}
                        />
                    }
                />
                <Route
                    path='/new'
                    element={
                        <>
                            <h1>New Todo List</h1>
                        </>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

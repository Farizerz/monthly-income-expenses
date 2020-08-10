import React, { useState } from 'react';
import AddData from './AddData';

const Navigation = () => {
    const [data, setData] = useState([]);

    const cobain = async () => {
        const response = await fetch("http://localhost:5000/incomeexpense/coba");
        const text = await response.text();
        alert(text);
    }
    return (
        <div>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark ">
                <div className="navbar-collapse">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="navbar-brand">Monthly Income and Expenses</a>
                        </li>
                    </ul>
                </div>
                <div className="navbar-collapse">
                    <ul className="navbar-nav ml-auto">
                         <AddData />
                    </ul>
                    <button className="btn btn-danger" onClick={() => cobain()}>Coba</button>
                </div>

            </nav>
        </div>
    )
}

export default Navigation;

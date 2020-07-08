import React from 'react';
import AddData from './AddData';

const Navigation = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark ">
                <div className="navbar-collapse">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="navbar-brand" >Monthly Income and Expenses</a>
                        </li>
                    </ul>
                </div>
                <div className="navbar-collapse">
                    <ul className="navbar-nav ml-auto">
                         <AddData />
                    </ul>
                </div>

            </nav>
        </div>
    )
}

export default Navigation;

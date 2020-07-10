import React, { Fragment, useEffect, useState } from 'react';

const ListData = () => {
    const [data, setData] = useState([]);

    //select function
    const getData = async () => {
        try {
            const response = await fetch("http://localhost:5000/incomeexpenses/all");
            const jsonData = await response.json();

            setData(jsonData);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <Fragment>
            <div className = "d-flex justify-content-center container p-3">
                <table className="table-dark table-striped">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-center">Date</th>
                            <th className="px-4 py-2 text-center">Income</th>
                            <th className="px-4 py-2 text-center">Expenses</th>
                            <th className="px-4 py-2 text-center">Total</th>
                            <th className="px-4 py-2 text-center"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(datas => (
                            <tr key = {datas.date}>
                                <td className="px-4 py-2 text-center">{datas.date}</td>
                                <td className="px-4 py-2 text-center">Rp. {datas.pemasukan}</td>
                                <td className="px-4 py-2 text-center">Rp. {datas.pengeluaran}</td>
                                <td className="px-4 py-2 text-center">Rp. {datas.total}</td>
                                <td className="px-4 py-2 text-center">
                                    <button 
                                            className="btn btn-info"
                                            onClick={() => alert("AAA!")}                                 
                                    >Details</button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </Fragment>
    )
}

export default ListData;

import React, { Fragment, useState, useEffect } from 'react';

import EditData from './EditData';

const DetailData = ({ datas }) => {
    const [data, setData] = useState([]);
    const [type, setType] = useState("");
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState("");

    //remove space from datas.date so modal can use them as an ID
    var date = datas.date.replace(/\s/g,'');

    const getData = async () => {
        try {

            const response = await fetch(`http://localhost:5000/incomeexpenses/${datas.date}`);
            const jsonData = await response.json();

            setData(jsonData);
        } catch (err) {
            console.error(err);
        }
    }

    const deleteData = async (id) => {
        try {
            const deleteData = await fetch (`http://localhost:5000/incomeexpenses/delete/${id}`, {
                method: "DELETE"
            });

            setData(data.filter(data => data.id !== id));
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <Fragment>
            <button 
                className="btn btn-info"
                data-toggle="modal"
                data-target={`#date${date}`}                             
            >Details</button>

            <div className="modal fade" id={`date${date}`}>
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title text-body">Detail Data on {datas.date}</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>

                        <div className="modal-body">
                                <div className = "d-flex justify-content-center container p-3">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th className="px-4 py-2 text-center">Description</th>
                                                <th className="px-4 py-2 text-center">Amount</th>
                                                <th className="px-4 py-2 text-center"></th>
                                                <th className="px-4 py-2 text-center"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.map(data_ => (
                                                <tr key = {data_.id}>
                                                    <td className="px-4 py-2 text-center">{data_.deskripsi}</td>
                                                    <td className="px-4 py-2 text-center">Rp. {data_.jumlah}</td>
                                                    <td className="px-4 py-2 text-center">
                                                        <EditData data_ = {data_} />
                                                    </td>
                                                    <td className="px-4 py-2 text-center">
                                                        <button 
                                                            className="btn btn-danger" 
                                                            onClick={() => deleteData(data_.id)}
                                                        >Delete</button>
                                                    </td>
                                                </tr>

                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => window.location = "/"}>Close</button>
                        </div>                        

                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default DetailData;

import React, { Fragment, useState } from 'react';

const EditData = ({ data_ }) => {
    const [type, setType] = useState(data_.tipe);
    const [amount, setAmount] = useState(data_.jumlah);
    const [description, setDescription] = useState(data_.deskripsi);

    const updateData = async (e) => {
        e.preventDefault();
        try {
            const body = { description, type, amount };
            if(type === "Default" || type === "" ) {
                alert("Pick a type!");
            } else {
                const response = await fetch(`http://localhost:5000/incomeexpenses/editdata/${data_.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
                });
                
                alert("Updated!");
                window.location = "/";
            }
        } catch (err) {
            console.error(err);
        }

    }

    return (
        <Fragment>
            <button 
                className="btn btn-success"
                data-toggle="modal"
                data-target= {`#id${data_.id}`}                              
            >Edit</button>

            <div className="modal fade" id={`id${data_.id}`}>
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Edit Data</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>

                        <div className="modal-body">
                                <div>
                                    Description:<input  
                                            type="text" 
                                            className="form-control" 
                                            value={description} 
                                            onChange={e => setDescription(e.target.value)}
                                    />                                    
                                    Type:<select id="type" className="form-control" value={type} onChange={e => setType(e.target.value)}>
                                        <option value="Default" className="form-control">Pick a type...</option>
                                        <option value="Pemasukan" className="form-control">Income</option>
                                        <option value="Pengeluaran" className="form-control">Expenses</option>
                                    </select>
                                    Amount:<input  
                                            type="number" 
                                            className="form-control"
                                            value={amount} 
                                            onChange={e => setAmount(e.target.value)} 
                                    />
                                </div>
                                <div className="py-3 d-flex justify-content-end">
                                    <button 
                                        className="btn btn-success"
                                        onClick={e => updateData(e)}
                                    >Save</button>
                                </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>    
            </div>            
        </Fragment>
    )
}

export default EditData;

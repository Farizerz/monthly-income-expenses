import React, { Fragment, useState, useEffect } from 'react'

const AddData = () => {
    const [date, setDate] = useState("");
    const [type, setType] = useState("");
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState("");

    //Check if the data on that month exists

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { date, description, type, amount };
            const url = ["http://localhost:5000/incomeexpenses/incomeinit",
                         "http://localhost:5000/incomeexpenses/expensesinit", 
                         "http://localhost:5000/incomeexpenses/insertdata"
                        ];
            if(type === "Pick a type..." || type === "" ) {
                alert("Pick a type!");
            } else {
                
                    Promise.all([
                    url.map(urls => fetch(urls, {
                            method: "POST",
                            headers: {"Content-Type": "application/json"},
                            body: JSON.stringify(body)
                        })
                    )
               ]).then(window.location = "/");
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Fragment>
            <button 
                className="btn btn-success"
                data-toggle="modal"
                data-target="#myModal"                              
            >Add Data</button>

            <div className="modal fade" id="myModal">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Input New Data</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>

                        <div className="modal-body">
                            <form onSubmit={onSubmitForm}>
                                <div>
                                    Date:<input  
                                            type="text" 
                                            className="form-control" 
                                            value={date} 
                                            onChange={e => setDate(e.target.value)}
                                    />
                                    Description:<input  
                                            type="text" 
                                            className="form-control" 
                                            value={description} 
                                            onChange={e => setDescription(e.target.value)}
                                    />                                    
                                    Type:<select id="type" className="form-control"  onChange={() => setType(document.getElementById("type").value)}>
                                        <option value="Pick a type..." className="form-control">Pick a type...</option>
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
                                    <button type="submit" className="btn btn-success">Save</button>
                                </div>
                            </form>
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

export default AddData;

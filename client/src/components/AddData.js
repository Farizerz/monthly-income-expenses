import React, { Fragment, useState, useEffect } from 'react'

const AddData = () => {
    const [date, setDate] = useState("");
    const [type, setType] = useState("");
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState("");

    const [data, setData] = useState(false);
    let datas = false;
    //Check if the data on that month exists
    const getData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/incomeexpenses/${date}`);
            const jsonData = await response.json();

            setData(jsonData);
            if(data !== "") {
                datas = true;
            } else {
                datas = false;
            }
        } catch (err) {
            console.error(err);
        }
    }

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            getData();
            if(data === "") {
                const body = { date, description, type, amount };
                const response = await fetch("http://localhost:5000/incomeexpenses/insertdata", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(body)
                });
    
                window.location = "/";
            } else {
                alert("Kosong Bos!");            
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
                                    Type:<input  
                                            type="text" 
                                            className="form-control"
                                            value={type} 
                                            onChange={e => setType(e.target.value)} 
                                    /> 
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

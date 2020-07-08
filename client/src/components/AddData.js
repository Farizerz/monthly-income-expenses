import React, { Fragment, useState } from 'react'

const AddData = () => {
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
                            <form>
                                <div>
                                    Date:<input  
                                            type="text" 
                                            className="form-control" 
                                    />
                                    Type:<input  
                                            type="text" 
                                            className="form-control" 
                                    /> 
                                    Amount:<input  
                                            type="text" 
                                            className="form-control" 
                                    />
                                    Description:<input  
                                            type="text" 
                                            className="form-control" 
                                    />
                                </div>
                                <div className="py-3 d-flex justify-content-end">
                                    <button type="submit" className="btn btn-success" data-dismiss="modal">Save</button>
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

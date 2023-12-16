import React from "react";

function AdminTransaction() {
  return (
    <>
      <div className="container admin_transaction">
        <p className="text_admintransaction">Transaction</p>
        <table className="table table-striped table-sm mt-3" border="2">
          <thead>
            <tr>
              <th className="col-lg-1">No</th>
              <th className="col-lg-2">Name</th>
              <th className="col-lg-2">Address</th>
              <th className="col-lg-1">Post Code</th>
              <th className="col-lg-2">Income</th>
              <th className="col-lg-2">Status</th>
              <th className="col-lg-2">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Junior</td>
              <td>Jakarta</td>
              <td>12345</td>
              <td>50.000</td>
              <td>Success</td>
              <td>Cancel-Approve</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Junior</td>
              <td>Jakarta</td>
              <td>12345</td>
              <td>50.000</td>
              <td>Success</td>
              <td>Cancel-Approve</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminTransaction;

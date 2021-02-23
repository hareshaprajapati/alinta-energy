import React from 'react';
import { Customer } from '../Model/Customer';

interface IProps {
  customers: Customer[];
  searchCustomer: string;
  editRow: (customer: Customer) => void;
  deleteCustomer: (id: number) => void;
}

const ListCustomers = (props: IProps) => {
  const { customers, editRow, deleteCustomer, searchCustomer } = props;
  return (
    <table className="customer-table">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Date Of Birth</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {customers.length > 0 ? (
          customers.map(customer => {
            if (searchCustomer && !customer.fName.toLocaleLowerCase().includes(searchCustomer)
              && !customer.lName.toLocaleLowerCase().includes(searchCustomer)) {
              return <tr key={customer.id}></tr>;
            }
            const editCustomerRow = () => {
              editRow(customer);
            }
            const deleteCustomerRow = () => {
              deleteCustomer(customer.id)
            }
            return (
              <tr key={customer.id}>
                <td>{customer.fName}</td>
                <td>{customer.lName}</td>
                <td>{customer.dob.toLocaleDateString()}</td>
                <td>
                  <button
                    onClick={editCustomerRow}
                    className="btn"
                  >
                    Edit
              </button>
                  <button
                    onClick={deleteCustomerRow}
                    className="btn btn-delete"
                  >
                    Delete
              </button>
                </td>
              </tr>
            )
          })
        ) : (
            <tr>
              <td colSpan={3}>No Customer</td>
            </tr>
          )}
      </tbody>
    </table>
  )
}
export default ListCustomers;
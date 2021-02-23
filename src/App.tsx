import React, { useState } from 'react';
import AddCustomer from './AddCustomer/AddCustomer';
import AlertDialog, { ConfirmationType } from './AlertDialog/AlertDialog';
import './App.css';
import Input from './Input/Input';
import ListCustomers from './ListCustomers/ListCustomers';
import { Customer } from './Model/Customer';

export const initialCustomerState: Customer = { id: -1, fName: '', lName: '', dob: null as any }

// /dummy customers
const customersList: Customer[] = [
  { id: 1, fName: 'Haresh', lName: 'Prajapati', dob: new Date() },
]

function App() {

  const [customers, setCustomers] = useState<Customer[]>(customersList)
  const [currentCustomer, setCurrentCustomer] = useState<Customer>(initialCustomerState)
  const [editing, setEditing] = useState<boolean>(false)
  const [deleteCustomerID, setDeleteCustomerID] = useState<number>();
  const [searchCustomerStr, setSearchCustomerStr] = useState<string>('');

  // add new customer
  const addCustomer = (customer: Customer) => {
    customer.id = customers.length + 1
    setCustomers([...customers, customer])
  }

  const deleteCustomer = (id: number) => {
    // while deleting a customer reset the current customer to blank customer
    resetEditing();
    // if id is not a number then return
    if (Number.isNaN(id)) return;
    setDeleteCustomerID(id);
  }

  const updateCustomer = (updatedCustomer: Customer) => {
    setEditing(false);
    // if id is -1 means its new customer to create
    if (updatedCustomer.id === -1) {
      addCustomer(updatedCustomer);
      return;
    }
    // edit the selected customer
    setCustomers(customers.map(customer => (customer.id === updatedCustomer.id ? updatedCustomer : customer)))
  }

  // set the customer to edit
  const editRow = (customer: Customer) => {
    setEditing(true)
    setCurrentCustomer(customer)
  }

  const resetEditing = () => {
    setEditing(false);
    setCurrentCustomer(initialCustomerState);
  }

  const handleClose = (value: ConfirmationType) => {
    if (value === 'Yes') {
      setCustomers(customers.filter(customer => customer.id !== deleteCustomerID));
    }
    setDeleteCustomerID(undefined);
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setSearchCustomerStr(value.trim());
  }

  return (
    <div className="container">
      <h1 className="header">Alinta Customers Repository</h1>
      <div className="flex-row">
        <div className="flex-large">
          <div>
            <h2 className="sub-header">{editing ? 'Edit Customer' : 'Add Customer'}</h2>
            <AddCustomer
              editing={editing}
              resetEditing={resetEditing}
              currentCustomer={currentCustomer}
              updateCustomer={updateCustomer} />
          </div>
        </div>
        <div className="flex-large">
          <div className="search-container">
            <h2 className="view-customer">View Customers</h2>
            <Input
              label="Search Customer"
              type="text"
              value={searchCustomerStr}
              name="lName"
              onChange={handleSearchChange} />
          </div>
          <ListCustomers customers={customers} editRow={editRow} deleteCustomer={deleteCustomer} searchCustomer={searchCustomerStr} />
        </div>
      </div>
      {deleteCustomerID && <AlertDialog handleClose={handleClose} customer={customers.find(cust => cust.id === deleteCustomerID)} />}
    </div>
  )
}

export default App;
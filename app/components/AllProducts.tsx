import React from 'react'
import 'dotenv/config'

interface Expense {
    id : number;
    name : string;
    category : string;
    price : number;
}

const AllProducts = async() => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/expenses`)
    const expense : Expense[] = await res.json()

  return (
        <>
            <div className="overflow-x-auto">
                <table className="table rounded-field">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                    </tr>
                    </thead>
                    <tbody>
                        {expense.map(item => <tr key={item.id.toString()}>
                            <td>{item.name}</td>
                            <td>{item.category}</td>
                            <td>{item.price.toString()}</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </>
  )
}

export default AllProducts
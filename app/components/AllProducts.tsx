"use client"
import React, { useEffect, useState } from 'react'
import 'dotenv/config'

interface Expense {
    id : number;
    name : string;
    category : string;
    price : number;
}

const AllProducts = () => {

    const [expense, setExpenses] = useState<Expense[]>([])

    useEffect(() =>{
        fetchExpenses()
    }, [])

    const fetchExpenses = async() => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/expenses`)
        const expense : Expense[] = await res.json()
        setExpenses(expense)
    }


    const handleDelete = async(id : number) => {
        console.log(id)
        try{
            const res = await fetch(`/api/expenses/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(res.ok){
                setExpenses(expense.filter(expense => expense.id !== id))
            }
        }
        catch(e){
            console.error("Error", e)
        }
    }

    const handleUpdate = async(id : number) =>{

    }


  return (
        <>
            <div className="overflow-x-auto">
                <table className="table rounded-field">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Delete Expense</th>
                        <th>Edit Expense</th>
                    </tr>
                    </thead>
                    <tbody>
                        {expense.map(item => <tr key={item.id.toString()}>
                            <td>{item.name}</td>
                            <td>{item.category}</td>
                            <td>{item.price.toString()}</td>
                            <td> <button onClick={ () => handleDelete(item.id)} className="btn btn-outline btn-error">Delete</button> </td>
                            <td> <button onClick={ () => handleUpdate(item.id)} className="btn btn-outline btn-warning">Update</button> </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </>
  )
}

export default AllProducts
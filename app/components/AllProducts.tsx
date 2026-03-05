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
        try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/expenses`)
            if(!res.ok){
                throw new Error("Failed to Fetch");
            }
            const expenseData : Expense[] = await res.json()
            setExpenses(Array.isArray(expenseData) ? expenseData : [])
        }
        catch(error){
            console.error('Error :', error)
            setExpenses([])
        }

    }


    async function handleDelete(id : number) {
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

    const handleUpdate = async(item: Expense) =>{

        const updates = {
        id: item.id,
        name: item.name, // You can modify these values
        category: item.category,
        price: item.price
    };
        try{
            const res = await fetch(`/api/expenses/${item.id}`,{
                method: 'UPDATE',
                headers: {
                    'Content-Type' : 'application.json'
                },
                body: JSON.stringify(updates)
            })

            if(res.ok){
                const updated = await res.json()
                setExpenses(expense.map(item => item.id === item.id ? updated : item))
            }
        }catch (error) {
        console.error('Error:', error)
    }
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
                            <td> <button onClick={ () => handleUpdate(item)} className="btn btn-outline btn-warning">Update</button> </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </>
)
}

export default AllProducts
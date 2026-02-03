"use client"
import { FormEvent, useState } from "react"
import DropDown from "../components/DropDown"
const AddProduct = () => {

  const [name, setName] = useState('')
  const [category, setCategory] = useState('Housing & Utilities')
  const [price, setPrice] = useState('')

  const handleSubmit = async(e : FormEvent<HTMLFormElement>) =>{
    e.preventDefault();

    try{
        const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/expenses`, {
          method : 'POST',
          headers: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({ name, category, price : Number(price) }),
        })
        if(!data.ok){
          throw new Error("Failed to add!!")
        }
        const res = await data.json()
        console.log("Added expense", res)

        setName('')
        setCategory('')
        setPrice('')
    }
    catch(e){
      console.error(e)
    }
  }

  return (
    <>
    <form action="/POST" onSubmit={handleSubmit}>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 m-auto">
        <label className="label">Name</label>
        <input type="text" className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />

        <label className="label">Category</label>
        <DropDown value={category} canBeAnyName={setCategory} />

        <label className="label">Price</label>
        <input type="text" className="input" value={price} onChange={(e) => setPrice(e.target.value)}  placeholder="Price" />

        <button className="btn btn-neutral mt-4">Add Expense</button>
      </fieldset>
    </form>
    </>
  )
}

export default AddProduct
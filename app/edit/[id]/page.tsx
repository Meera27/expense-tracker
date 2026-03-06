"use client"
import DropDown from '@/app/components/DropDown';
import { useParams, useRouter } from 'next/navigation';
import React, { FormEvent, useEffect, useState } from 'react'


const page = () => {

  const router = useRouter()
  const { id } = useParams()
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
    

    useEffect(() => {
    const fetchExpense = async () => {
      const res = await fetch(`/api/expenses/${id}`)
      const data = await res.json()
      setName(data.name)
      setCategory(data.category)
      setPrice(data.price.toString())
    }
    fetchExpense()
  }, [id])

  const handleUpdate = async(e: FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    try{
      const data = await fetch(`/api/expenses/${id}`,{
        method: "PUT",
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({name, category, price: Number(price)})
      })
      if(data.ok){
        router.push('/')
      }
    } catch(e){
      throw new Error("Error found at update!")
    }
  }

  return (
    <div>
        <form action="/PUT" onSubmit={handleUpdate}>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 m-auto">
          <label className="label">Name</label>
          <input type="text" className="input" value={name} onChange={(e) => setName(e.target.value)} />

          <label className="label">Category</label>
          <DropDown value={category} canBeAnyName={setCategory} />

          <label className="label">Price</label>
          <input type="text" className="input" value={price} onChange={(e) => setPrice(e.target.value)} />

          <button type="submit" className="btn btn-neutral mt-4">Save Changes</button>
        </fieldset>
      </form>
    </div>
  )
}

export default page
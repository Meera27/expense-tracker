"use client"
import React, { useState, ChangeEvent } from 'react'

interface DropDownProps {
    value : string;
    canBeAnyName: (category: string) => void
}

const DropDown = ({ value, canBeAnyName} : DropDownProps) => {

    const categoryOptions = [
        { value : "Housing & Utilities", label : "Housing & Utilities" },
        { value : "Transportation", label : "Transportation"},
        { value : "Food & Household", label : "Food & Household"},
        { value : "Health & Wellness", label : "Health & Wellness"},
        { value : "Shopping & Lifestyle", label : "Shopping & Lifestyle"},
        { value : "Financial & Other", label : "Financial & Other"}
    ]

    const handleChange = (e : ChangeEvent<HTMLSelectElement>) =>{
        canBeAnyName(e.target.value);
    }

  return (
    <>
        <select name="category-select" id="category" value={value} onChange={handleChange}>
            {categoryOptions.map((item) => (
                <option key= {item.value} value={item.value}>{item.label}</option>
            ) )}
        </select>
    </>
  )
}

export default DropDown
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { search } from '../features/appSlice';

import {BsSearch} from 'react-icons/bs'

function Search() {

    const data = useSelector(state => state.table)
    const dispatch = useDispatch();

    const [value, setValue] = useState('')

    function submit(e) {
        e.preventDefault()
        const filter = data.data.filter(f => f.title.includes(value) || f.body.includes(value) )
        if (filter.length) {
            dispatch(search(filter))
        }else{
            dispatch(search(data.data))
        }
    }

    return (
        <div className='p-5 '>
            <form onSubmit={submit} className='flex items-start text-[10px] sm:text-xs md:text-base lg:text-lg'>
                <input value={value} onChange={(e) => setValue(e.target.value)} type="text" placeholder='search' className='bg-[#5A5C66] w-[50%] text-white outline-none p-2 md:px-5 md:py-3' />
                <button className='bg-[#5A5C66] text-white p-2 md:py-4 md:px-5'><BsSearch /></button>
            </form>
        </div>
    )
}

export default Search
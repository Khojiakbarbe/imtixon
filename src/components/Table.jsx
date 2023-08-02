import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { allData, back, backBtn, next, nextBtn } from '../features/appSlice'
import axios from 'axios';
import Search from './Search';

function Table() {


    const current = useSelector(state => state.table)
    const dispatch = useDispatch()
    const [paginations, setPaginations] = useState(Array.from(Array(6).keys()))

    const navigate = useNavigate();

    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(res => {
                setData(res.data)
                dispatch(allData(res.data))
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        if (current.search) {
            setData(current.search)
        } else {
            setData(current.data[0])
        }
    }, [current.search])

    function navigateNext() {
        dispatch(next())
        navigate(`/${current.count + 1}`)
        setPaginations(paginations.map(p => {
            return p = p + 1
        }))
    }
    function navigateBack() {
        setPaginations(paginations.map(p => {
            return p = p - 1
        }))
        dispatch(back(current.count - 1))
        navigate(`/${current.count - 1}`)
    }




    const [btn, setBtn] = useState();

    function paginate(e) {
        if (btn) {
            btn.target.classList.remove('text-[gray]')
        }
        setBtn(e)
        e.target.classList.add('text-[gray]')

        let action = 0;
        setPaginations(paginations.map(p => {
            if (e.target.value >= paginations[3]) {
                if (action == 0) {
                    dispatch(nextBtn(+e.target.value + 1))
                    navigate(`/${+e.target.value + 1}`)
                    action++
                }
                return p = p + 1
            } else if (paginations[0] != 0) {
                if (p > -1) {
                    if (action == 0) {
                        dispatch(backBtn(+e.target.value + 1))
                        navigate(`/${+e.target.value + 1}`)
                        action++
                    }
                    return p - 1
                }
            } else {
                if (action == 0) {
                    dispatch(backBtn(+e.target.value + 1))
                    navigate(`/${+e.target.value + 1}`)
                    action++
                }
                return p
            }
        }))
    }


    // sort by id 1-100 || 100-1
    const [id, setId] = useState(true)
    function sortById() {
        setId(!id)
        if (id) {
            const all = [...data]
            const sort = all.sort((a, b) => b.id - a.id)
            setData(sort)
        } else {
            const all = [...data]
            const sort = all.sort((a, b) => a.id - b.id)
            setData(sort)
        }
    }

    const [sortTitleBody, setSortTitleBody] = useState(true)
    function sortByTitle(e) {
        setSortTitleBody(!sortTitleBody)
        if (sortTitleBody) {
            const currentData = [...data]
            if (e) {
                const sort = currentData.sort((a, b) => b.title.localeCompare(a.title))
                setData(sort)
            } else {
                const sort = currentData.sort((a, b) => b.body.localeCompare(a.body))
                setData(sort)
            }
        } else {
            const currentData = [...data]
            if (e) {
                const sort = currentData.sort((a, b) => a.title.localeCompare(b.title))
                setData(sort)
            } else {
                const sort = currentData.sort((a, b) => a.body.localeCompare(b.body))
                setData(sort)
            }
        }
    }


    return (
        <div className='my-5'>
            <Search />
            <div className='grid text-xs sm:text-sm md:text-2xl gap-3 w-ull p-5 bg-[#474955]  grid-cols-[auto_1fr]'>
                <button onClick={sortById} className='text-white'>
                    ID
                </button>
                <div className='flex justify-around'>
                    <button onClick={() => sortByTitle(true)} className='text-white'>
                        sort Title
                    </button>
                    <button onClick={() => sortByTitle(false)} className='text-white'>
                        sort Title
                    </button>
                </div>
            </div>
            <div className='container m-[0_auto] mt-5 px-5'>
                {
                    current.count != 10 ?
                        data?.slice(current.slice, current.slice + 10).map(p => {
                            return (
                                <div key={p.id} className='grid grid-cols-[auto_1fr]'>
                                    <h1 className='text-[10px] sm:text-xs md:text-base lg:text-lg  border px-6 flex items-center p-1 lg:h-[70px]'>{p.id}</h1>
                                    <div className='grid grid-cols-2'>
                                        <h1 className='border text-[8px] sm:text-xs md:text-xs lg:text-[13px] flex items-center p-1 lg:h-[70px]'>{p.title}</h1>
                                        <h1 className='border text-[8px] sm:text-xs md:text-xs lg:text-[13px] flex items-center p-1 lg:h-[70px]'>{p.body}</h1>
                                    </div>
                                </div>
                            )
                        })
                        :
                        <h1>Not FOUNDED</h1>
                }
            </div>
            <div className='flex justify-between px-5 mt-5 text-[10px] sm:text-xs md:text-base lg:text-lg'>
                <button onClick={navigateBack}>Back</button>
                <div className='flex gap-1 md:gap-4 font-[Roboto] font-bold'>
                    {paginations.map(p => <button key={p} value={p} onClick={(e) => paginate(e)} className='p-1 md:px-4 md:py-2 text-[10px] sm:text-xs md:text-base lg:text-lg'>{p + 1}</button>)}
                </div>
                <button className='font-bold' onClick={navigateNext}>Next</button>
            </div>
        </div>
    )
}

export default Table
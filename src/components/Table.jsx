import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { allData, back, next } from '../features/appSlice'
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
                    dispatch(next(+e.target.value + 1))
                    navigate(`/${+e.target.value + 1}`)
                    action++
                }
                return p = p + 1
            } else {
                if (p > -1) {
                    if (action == 0) {
                        dispatch(back(+e.target.value + 1))
                        navigate(`/${+e.target.value + 1}`)
                        action++
                    }
                    if(p != 3 && p != 2 && p !=1 ){
                        return p - 1
                    }else{
                        return p
                    }
                }
            }
        }))

    }

    console.log(current.count);

    return (
        <div className='my-5'>
            <Search />
            <div className='grid text-xs sm:text-sm md:text-2xl gap-3 w-ull p-5 bg-[#474955]  grid-cols-[auto_1fr]'>
                <select className='text-white bg-[unset]'>
                    <option value="id">ID</option>
                </select>
                <div className='flex justify-around'>
                    <select className='bg-[unset] text-white'>
                        <option value="">Заголовок</option>
                    </select>
                    <select className='bg-[unset] text-white'>
                        <option value="">Описание</option>
                    </select>
                </div>
            </div>
            <div className='container m-[0_auto] mt-5 px-5'>
                {
                    data ?
                        data?.slice(current.slice, current.slice + 10).map((p, ind) => {
                            return (
                                <div key={ind} className='grid grid-cols-[auto_1fr]'>
                                    <h1 className='text-[10px] sm:text-xs md:text-base lg:text-lg  border px-6 flex items-center p-1 lg:h-[70px]'>{ind + 1}</h1>
                                    <div className='grid grid-cols-2'>
                                        <h1 className='border text-[8px] sm:text-xs md:text-xs lg:text-[13px] flex items-center p-1 lg:h-[70px]'>{p.title}</h1>
                                        <h1 className='border text-[8px] sm:text-xs md:text-xs lg:text-[13px] flex items-center p-1 lg:h-[70px]'>{p.body}</h1>
                                    </div>
                                </div>
                            )
                        })
                        :
                        <h1>NOt FOUNDED</h1>
                }
            </div>
            <div className='flex justify-between px-5 mt-5 text-[10px] sm:text-xs md:text-base lg:text-lg'>
                <button onClick={navigateBack}>Back</button>
                <div className='flex gap-1 md:gap-4 font-[Roboto] font-bold'>
                    {paginations.map(p => <button key={p} value={p} onClick={(e) => paginate(e)} className='p-1 md:px-4 md:py-2 text-[10px] sm:text-xs md:text-base lg:text-lg'>{p + 1}</button>)}
                </div>
                <button onClick={navigateNext}>Next</button>
            </div>
        </div>
    )
}

export default Table
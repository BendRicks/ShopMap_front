import { useEffect, useState } from "react";
import ShopPlate from "../components/ShopPlate";
import { DataInput, PagesContainer, SearchInput, SearchSubmitInput, ShopsContainer, ShopsPlatesContainer, ShopsSearchBar, SubmitInput } from "./pages_elements";
import Select from 'react-select'
import './resources/pages_styles.css'
import { useNavigate } from "react-router-dom";

export default function Shops(){

    const url = process.env.REACT_APP_BACKEND_URL

    let [shops, setShops] = useState([])
    let [page, setPage] = useState(0)
    let [pages, setPages] = useState(0)
    let [nameLike, setNameLike] = useState('')
    let [reloadSwitch, setMustReload] = useState(true)
    let reloaded = false

    let [selectedDirection, setSelectedDirection] = useState({ value: 'ASC', label: 'Ascending'})
    const directionOptions = [
        { value: 'ASC', label: 'Ascending'},
        { value: 'DESC', label: 'Descending'}
    ]

    let [selectedSize, setSelectedSize] = useState({ value: 4, label: '4'})
    const sizeOptions = [
        { value: 4, label: '4'},
        { value: 8, label: '8'},
        { value: 12, label: '12'},
        { value: 16, label: '16'}
    ]

    useEffect(() => {
        if (!reloaded){
            fetch(`${url}/api/shops/?page=${page}&size=${selectedSize.value}&param=name&dir=${selectedDirection.value}&nameLike=${nameLike}`)
            .then((resp) => resp.json())
            .then((data) => {
                setShops(data.data)
                setPages(Math.ceil(data.matchesFound/selectedSize.value))
            })
            .catch((err) => alert(err.message))
            reloaded=true
        }
    }, [reloadSwitch, page])

    function handleSearch(event){
        setPage(0)
        event.preventDefault()
        reloaded=false
        setMustReload(!reloadSwitch)
    }

    function range(start, end) {
        let nums = [];
        for (let i = start; i < end; i++) nums.push(i);
        return nums;
    }

    function turnPage(event, newPage){
        event.preventDefault()
        setPage(newPage)
    }

    function listPages(){
        let nums = range(0, pages)

        return nums.map(i => i===page ? (<span className="selected_page_span"> {i+1} </span>) : (<span className="page_span" onClick={e => turnPage(e, i)}> {i+1} </span>))
    }

    return (
    <ShopsContainer>
        <ShopsSearchBar onSubmit={e => handleSearch(e)}>
            <Select isSearchable={false} defaultValue={selectedDirection} onChange={setSelectedDirection} options={directionOptions} required/>
            <Select isSearchable={false} defaultValue={selectedSize} onChange={setSelectedSize} options={sizeOptions} required/>
            <SearchInput placeholder="Search" onChange={e => setNameLike(e.target.value)}/>
            <SearchSubmitInput type='submit' value='Search'/>
        </ShopsSearchBar>
        <ShopsPlatesContainer>
            {shops?.map((shop) => <ShopPlate shop={shop}/>)}
        </ShopsPlatesContainer>
        <PagesContainer>{listPages()}</PagesContainer>
    </ShopsContainer>)

}
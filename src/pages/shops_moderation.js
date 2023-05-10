import { useEffect, useState } from "react";
import ShopPlate from "../components/ShopPlate";
import { PagesContainer, SearchSubmitInput, ShopsContainer, ShopsPlatesContainer, ShopsSearchBar, SubmitInput } from "./pages_elements";
import './resources/pages_styles.css'

export default function ShopsModeration({cookies}){

    let [shops, setShops] = useState([])
    let [page, setPage] = useState(0)
    let [pages, setPages] = useState(0)
    let [reloadSwitch, setMustReload] = useState(true)
    let reloaded = false

    useEffect(() => {
        if (!reloaded){
            let params = {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${cookies['jwt_token']}`
                },
            }
            fetch(`http://localhost:8080/api/shops/moderation`, params)
            .then((resp) => resp.json())
            .then((data) => {
                setShops(data.data)
                setPages(Math.ceil(data.matchesFound/8))
            })
            .catch((err) => alert(err.message))
            reloaded=true
        }
    }, [reloadSwitch, page])

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
        <ShopsPlatesContainer>
            {shops?.map((shop) => <ShopPlate shop={shop}/>)}
        </ShopsPlatesContainer>
        <PagesContainer>{listPages()}</PagesContainer>
    </ShopsContainer>)

}
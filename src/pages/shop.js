import { useEffect, useState } from "react";
import { AddressesContainer, InfoElement, ShopContainer } from "./pages_elements";
import './resources/pages_styles.css'
import { useNavigate, useParams } from "react-router-dom";
import FsLightbox from "fslightbox-react";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function Shop({ cookies, authorization }) {

    let { id } = useParams()
    let [toggler, setToggler] = useState(false)
    let [shop, setShop] = useState({ id: null, creator: null, name: null, description: null, mainImageURL: null, shopStatus: null, addresses: [], additionalImages: [{}] })

    let [status, setStatus] = useState()
    let [statusChanged, setStatusChanged] = useState(false)

    const navigate = useNavigate()


    useEffect(() => {
        fetch(`http://localhost:8080/api/shops/${id}`)
            .then((resp) => resp.json())
            .then((data) => {
                if (data.message) {
                    alert(data.message)
                    console.log('error')
                    navigate('/')
                } else {
                    setShop(data)
                    setStatus(data.shopStatus)
                }
            })
            .catch((err) => {
                navigate('/')
            })
    }, [])

    useEffect(() => {
        if (statusChanged) {
            let shop = {
                id: id,
                shopStatus: status
            }
            let params = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${cookies['jwt_token']}`
                },
                body: JSON.stringify(shop),
            }
            fetch('http://localhost:8080/api/shops/', params)
                .then((resp) => resp.json())
                .then((data) => {
                    if (data.message || data.error) {
                        alert(data.message)
                        setStatus(shop.shopStatus)
                    }
                })
            setStatusChanged(false)
        }
    }, [statusChanged])

    function changeStatus(newStatus) {
        setStatus(newStatus)
        setStatusChanged(true)
    }

    function moderationMenu() {
        switch (authorization.userRole) {
            case 'ROLE_ADMIN': return (<><p>{status}</p><span className="moderation_span" onClick={() => changeStatus('OPERATING')}>Verify</span> <span className="moderation_span" onClick={() => changeStatus('REFUSED')}>Refuse</span> <span className="moderation_span" onClick={() => changeStatus('BANNED')}>Ban</span></>)
            case 'ROLE_MODERATOR': return (<><p>{status}</p><span className="moderation_span" onClick={() => changeStatus('OPERATING')}>Verify</span> <span className="moderation_span" onClick={() => changeStatus('REFUSED')}>Refuse</span></>)
            default: return (<></>)
        }
    }

    return (
        <ShopContainer>
            {moderationMenu()}
            {shop.creator && shop.creator.id === authorization.userId ? <button onClick={() => navigate(`/shop/${id}/change`)}>Change</button> : <></>}
            <p className="shop_name">{shop.name}</p>
            <img src={shop.mainImageURL} alt="Shop main image" />
            {shop.additionalImages.length > 0 ?
                <button onClick={() => setToggler(!toggler)}>Show additional sources</button>
                : <></>
            }
            <FsLightbox
                toggler={toggler}
                sources={shop.additionalImages.map(additImage => additImage.imageUrl)}
                customAttributes={shop.additionalImages.map(additImage => { return { alt: additImage.imageDescription } })}
            />
            <div className='description_container'>
                <ReactMarkdown children={shop.description} remarkPlugins={[remarkGfm]} />
            </div>
            <div>
            <AddressesContainer>
                {shop.addresses?.map((el, index) => <InfoElement key={index}>
                    <span>Address</span>
                    <span>City - {el.city}</span>
                    <span>District - {el.district}</span>
                    <span>Street - {el.street}</span>
                    <span>Building - {el.building}</span>
                    <span>Room - {el.room}</span>
                </InfoElement>)}
            </AddressesContainer>
            </div>
        </ShopContainer>
    )

}
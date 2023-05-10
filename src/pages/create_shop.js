import { useState, useEffect } from "react"
import { AdditionalImageAddContainer, AddressesContainer, CreateShopContainer, ImageContainer, InputAddContainer, MainImageAddContainer, SubmitInput, TextInfoAddContainer, DataInput, InfoElement, BigDataInput } from "./pages_elements"
import './resources/pages_styles.css'
import { useNavigate } from "react-router-dom"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import remarkGfm from "remark-gfm"


export default function CreateShop({ cookies }) {

    let [name, setName] = useState('')
    let [description, setDescription] = useState('')
    let [mainImageURL, setMainImageURL] = useState('')

    let [addresses, setAddresses] = useState([{ city: '', district: '', street: '', building: '', room: '' }])
    let [additImages, setAdditImages] = useState([])

    let [createButtonPressed, setCreateButtonPressed] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (createButtonPressed) {
            let shop = {
                name: name,
                description: description,
                mainImageURL: mainImageURL,
                addresses: addresses,
                additionalImages: additImages
            }
            let params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${cookies['jwt_token']}`
                },
                body: JSON.stringify(shop),
            }
            fetch('http://localhost:8080/api/shops/', params)
                .then((resp) => resp.json())
                .then((data) => {
                    console.log(data)
                    if (data.message || data.error) {
                        alert(data.message)
                    } else {
                        navigate('/account')
                    }
                })
        }
        setCreateButtonPressed(false)
    }, [createButtonPressed])

    function sendCreateShopForm(event) {
        event.preventDefault()
        setCreateButtonPressed(true)
    }

    function addAddress(event) {
        event.preventDefault()
        setAddresses([...addresses, { city: '', district: '', street: '', building: '', room: '' }])
    }

    function deleteLastAddress(event) {
        event.preventDefault()
        addresses.pop()
        setAddresses([...addresses])
    }

    function addAdditImage(event) {
        event.preventDefault()
        setAdditImages([...additImages, { imageUrl: '', imageDescription: '' }])
    }

    function deleteLastImage(event) {
        event.preventDefault()
        additImages.pop()
        setAdditImages([...additImages])
    }

    return (
        <>
            <CreateShopContainer onSubmit={sendCreateShopForm}>
                <InputAddContainer>
                    <TextInfoAddContainer>
                        <label>Name</label>
                        <DataInput type='text' placeholder='Name' onChange={(e) => setName(e.target.value)} required />
                        <label>Addresses</label>
                        <AddressesContainer>
                            {addresses.map((el, index) => <InfoElement key={index}>
                                <span>Address</span>
                                <label>City</label>
                                <DataInput type="text" placeholder="City" onChange={(e) => el.city = e.target.value} defaultValue={el.city} required />
                                <label>District</label>
                                <DataInput type="text" placeholder="District" onChange={(e) => el.district = e.target.value} defaultValue={el.district} required />
                                <label>Street</label>
                                <DataInput type="text" placeholder="Street" onChange={(e) => el.street = e.target.value} defaultValue={el.street} required />
                                <label>Building</label>
                                <DataInput type="text" placeholder="Building" onChange={(e) => el.building = e.target.value} defaultValue={el.building} required />
                                <label>Room</label>
                                <DataInput type="text" placeholder="Room" onChange={(e) => el.room = e.target.value} defaultValue={el.room} required />
                            </InfoElement>)}
                            {addresses.length > 1 ? <span className="remove_last_p" onClick={deleteLastAddress}>Remove last</span> : <></>}
                            <span className="add_span" onClick={addAddress}>Add</span>
                        </AddressesContainer>
                        <label>Description</label>
                        <BigDataInput type='text' placeholder='Description' rows={6} onChange={(e) => setDescription(e.target.value)} required />
                    </TextInfoAddContainer>
                    <ImageContainer>
                        <label>Main Image</label>
                        <MainImageAddContainer>
                            <DataInput type='text' placeholder='Main image url' onChange={(e) => setMainImageURL(e.target.value)} required />
                        </MainImageAddContainer>
                        <label>Additional Sources</label>
                        <AdditionalImageAddContainer>
                            {additImages.map((el) => <InfoElement>
                                <span>Source</span>
                                <label>Source URL</label>
                                <DataInput type="text" placeholder="Source URL" onChange={(e) => el.imageUrl = e.target.value} required />
                                <label>Source Description</label>
                                <DataInput type="text" placeholder="Source Description" onChange={(e) => el.imageDescription = e.target.value} required />
                            </InfoElement>)}
                            {additImages.length > 0 ? <span className="remove_last_p" onClick={deleteLastImage}>Remove last</span> : <></>}
                            <span className="add_span" onClick={addAdditImage}>Add</span>
                        </AdditionalImageAddContainer>
                    </ImageContainer>
                </InputAddContainer>
                <SubmitInput type='submit' value='Create' />
                <p className="about_creation_text">
                    Names of shops can't duplicate each other. Every shop must have at least 1 address. You can add more addresses using "Add" button in Addresses menu. In description you must wright text that describes your
                    shop using <a href="https://www.markdownguide.org/basic-syntax/">markdown</a> language. In "Main Image" field you must place url to the main photo repsresenting your shop (It can either logo or main shop photo). In "Additional Sources" menu you can add additional sources like photos or videos with
                    description to them. We highly recommend uploading photos on <a href="https://photos.google.com/">Google Photos</a> and passing their url as photo media and uploading videos on <a href="https://www.youtube.com/">YouTube</a> and passing their url as video media.
                </p>
            </CreateShopContainer>
            <p>Description preview</p>
            <ReactMarkdown children={description} remarkPlugins={[remarkGfm]} />
        </>
    )
}
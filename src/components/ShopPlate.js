import './styles.css' 
import { useNavigate } from 'react-router-dom';

export default function ShopPlate({shop}){

    const navigate = useNavigate()

    function plateClicked() {
        navigate(`/shop/${shop.id}`)
    }

    return <div className='shop_plate' onClick={plateClicked}>
        <img src={shop.mainImageURL} className='shop_main_image'/>
        <p>{shop.name}</p>
    </div>
}
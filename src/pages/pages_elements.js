import styled from "styled-components";

export const MainContainer = styled.div`
    height: fit-content;
    width: 100%;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`

export const LoginContainer = styled.form`
    width: 40%;
    padding-top: 30px;
    height: 200px;
    display: inline-flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    align-self: center;
`

export const SignUpContainer = styled.form`
width: 40%;
padding-top: 30px;
height: fit-content;
display: inline-flex;
align-items: center;
flex-direction: column;
justify-content: space-between;
align-self: center;
`

export const TextInput = styled.input`
    display: flex;
    min-width: 90px;
    width: 50%;
    height: 26px;
    font-size: 22px;
    text-align: center;
    font-family: 'Oswald';
`

export const PasswordInput = styled.input`
    display: flex;
    min-width: 90px;
    width: 50%;
    height: 26px;
    text-align: center;
    font-family: 'Oswald';
    font-size: 22px;
`

export const SubmitInput = styled.input`
    display: flex;
    min-width: 65px;
    width: 40%;
    height: 35px;
    font-size: 22px;
    margin-top: 20px;
    margin-bottom: 10px;
    font-family: 'Oswald';
    justify-content: center;
    cursor: pointer;
`

export const CreateShopContainer = styled.form`
    border-radius: 5px;
    border: 3px solid black;
    width: 80%;
    min-width: 600px;
    height: 80%;
    min-height: 450px;
    margin-top: 20px;
    display: inline-flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    align-self: center;
`

export const InputAddContainer = styled.div`
    border-radius: 5px;
    width: 100%;
    min-height: 400px;
    display: inline-flex;
    align-items: start;
    flex-direction: row;
    justify-content: space-between;
`

export const TextInfoAddContainer = styled.div`
    border-radius: 5px;
    width: 50%;
    min-height: 380px;
    margin-left: 5px;
    display: inline-flex;
    align-items: center;
    flex-direction: column;
    justify-content: start;
`

export const AddressesContainer = styled.div`
    width: 90%;
    min-width: 300px;
    height: 350px;
    overflow-y: scroll;
    margin-bottom: 10px;
    background-color: lightgray;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    border: 1px solid black;
`

export const ImageContainer = styled.div`
    width: 50%;
    min-height: 380px;
    display: inline-flex;
    align-items: center;
    flex-direction: column;
    justify-content: space;
    align-self: center;
`

export const MainImageAddContainer = styled.div`
    border-radius: 5px;
    width: 90%;
    height: 40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    align-self: center;
`

export const AdditionalImageAddContainer = styled.div`
    border-radius: 5px;
    border: 1px solid black;
    width: 90%;
    height: 550px;
    overflow-y: scroll;
    display: inline-flex;
    background-color: lightgray;
    align-items: center;
    flex-direction: column ;
`

export const DataInput = styled.input`
    display: flex;
    min-width: 90px;
    width: 80%;
    height: 26px;
    font-size: 22px;
    text-align: center;
    font-family: 'Oswald';
`

export const BigDataInput = styled.textarea`
    display: flex;
    min-width: 90px;
    resize: none;
    width: 80%;
    font-size: 22px;
    text-align: start;
    font-family: 'Oswald';
`

export const InfoElement = styled.div`
    position: relative;
    width:90%;
    min-height: fit-content;
    background-color: white;
    border-radius: 10px;
    margin-top: 5px;
    padding-bottom: 5px;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
`

export const ShopsPlatesContainer = styled.div`
    width: 90%;
    margin-top: 10px;    
    height: fit-content;
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
`

export const ShopsContainer = styled.div`
    width: 90%;
    height: fit-content;
    margin-top: 10px;    
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
    flex-direction: column;
    justify-content: start;
`

export const UserPageContainer = styled.div`
    width: 90%;
    margin-top: 10px;    
    margin-bottom: 20px;
    min-height: 200px;
    height: fit-content;
    display: inline-flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
`

export const ShopsSearchBar = styled.form`
    border-radius: 5px;
    width: 50%;
    height: 100px;
    margin-top: 20px;
    margin-bottom: 20px;
    display: inline-flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
`

export const SearchSubmitInput = styled.input`
    display: flex;
    min-width: 65px;
    width: 10%;
    height: 35px;
    font-size: 22px;
    font-family: 'Oswald';
    justify-content: center;
    cursor: pointer;
`

export const PagesContainer = styled.div`
    width: 90%;
    margin-top: 10px;    
    margin-bottom: 10px;
    height: 20px;
    display: inline-flex;
    align-items: center;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
`

export const ShopContainer = styled.div`
    width: 90%;
    margin-top: 10px;    
    margin-bottom: 20px;
    min-height: 200px;
    height: fit-content;
    display: inline-flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
`

export const SearchInput = styled.input`
    display: flex;
    min-width: 90px;
    width: 60%;
    height: 26px;
    font-size: 22px;
    text-align: center;
    font-family: 'Oswald';
`
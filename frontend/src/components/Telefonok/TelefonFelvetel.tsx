import React, { useState } from "react"

export default function TelefonFelvetel(){
    const [brand, setBrand] = useState<string>("");
    const [model, setModel] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState(null);
    const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const newPhone={
            brand: brand,
            model: model,
            price: price
        }
        try{
            const response=await fetch("http://localhost:3000/phones", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    newPhone
                )
            })
            if(response.ok){
                throw new Error(`Szervehiba: ${response.status}`);
            }
            setSuccess(false);
            setBrand("");
            setModel("");
            setPrice(0);
        }
        catch(error){
            //console.log(error);
            setError(error.message);
        }
        finally{
            //...
        }
    }

    return <>
        <h1>Telefon felvétel</h1>
        <a href="/telefonlista">Telefonlista</a><br/>
        <a href="/telefonfelvetel">Telefonfelvétel</a><br/>
        <a href="/telefontorles">Telefontörlés</a><br/>
        <form onSubmit={handleSubmit}>
            <label>
                <p>Brand:</p>
                <input
                    type="text"
                    value={brand}
                    required
                    onChange={(e) => setBrand(e.target.value)}
                />
            </label>
            <label>
                <p>Model:</p>
                <input
                    type="text"
                    value={model}
                    required
                    onChange={(e) => setModel(e.target.value)}
                />
            </label>
            <label>
                <p>Price:</p>
                <input
                    type="number"
                    value={price}
                    required
                    onChange={(e) => setPrice(parseInt(e.target.value))}
                />
            </label>
            <button type="submit">Felvétel</button>
        </form>
        {success && <p>Sikeres felvétel!</p>}
        {error && <p>Hiba történt: {error}</p>}
    </>
}
import { useEffect, useState } from "react"


interface Phone {
    Id: number;
    Brand: string;
    Model: string;
    Price: number;
}

export default function TelefonTorles() {

    const [phones, setPhones] = useState<Phone[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState(null);
    const [errorServer, setErrorServer] = useState<string>("");
    const handleDelete=(id:number)=>{
        //alert("Törölt telefon: "+id);
        const answer=confirm("Biztosan törli?");
        if(!answer){
            return;
        }
        try{
            const response=fetch(`http://localhost:3000/phones/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            setPhones(phones.filter((phone)=>phone.Id!==id));
        }
        catch(error){
            console.log(error);
        }
    }
    
    useEffect(() => {
        fetch("http://localhost:3000/phones")
            .then((response) => { 
                if (response.status === 404){
                    setErrorServer('A kért erőforrás nem található (404)!');
                    //throw new Error('A kért erőforrás nem található (404)!');
                }
                if (!response.ok) {
                    setErrorServer(`Server responded with status ${response.status}`);
                    //throw new Error(`Server responded with status ${response.status}`);
                }
                return response.json() 
            })
            .then((data) => {
                setPhones(data);
                setLoading(false);
                //console.log(data); 
            })
            .catch((error) => { 
                console.log(error.message) 
                setError(error.message);
            })
    }, [])

    if(errorServer){
        return <p>{errorServer}</p>
    }
    if(loading) { 
        return <p>Loading...</p>
    }
    if(error){
        return <p>Hiba történt: {error}.</p>
    }

    return <>
        <h1>Telefonok listája</h1>
        <h2>Menü</h2>
        <a href="/telefonlista">Telefonlista</a><br/>
        <a href="/telefonfelvetel">Telefonfelvétel</a><br/>
        <a href="/telefontorles">Telefontörlés</a><br/>
        <ul>
            {phones.map((phone) => (
                    <li key={phone.Id}>
                        {phone.Brand}: {phone.Model} - {phone.Price}
                        <span style={{cursor: 'pointer', marginLeft: '10px'}}>
                            <button onClick={() => handleDelete(phone.Id)}>Törlés</button>
                        </span>
                    </li>
                    )
                )
            }
        </ul>
    </>
}
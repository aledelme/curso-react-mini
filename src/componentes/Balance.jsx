import { ethers, toBeHex } from "ethers"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

const {ethereum} = window

export function Balance(){
    const { register, handleSubmit} = useForm()
    const [cuenta, setCuenta] = useState(null)
    const [balance, setBalance] = useState(null)
    const [isOK, setOK] = useState(null)
    const [isKO, setKO] = useState(null)
    //useEffect se ejecuta cuando cambien algunos de los campos definidos en el segundo parametro []
    useEffect(() => {
        ethereum && ethereum.request({method: 'eth_requestAccounts'}).then(cuenta => {
            setCuenta(cuenta[0])
            ethereum.on('accountsChanged', (i) => {
                setCuenta(i[0])
            })
        })
    },[])
    useEffect(() => {
        if(cuenta){
            // const provider = new ethers.providers.Web3Provider(ethereum)
            const provider = new ethers.BrowserProvider(ethereum)
            provider.getBalance(cuenta).then(balance =>  {
                setBalance(ethers.formatEther(balance))
            })
        }
    },[cuenta])

    async function submit(data){
        setOK(null)
        setKO(null)
        const parametros = {
            from: cuenta,
            to: data.address,
            // value: ethers.parseEther(data.amount).toString()
            value: toBeHex(ethers.parseEther(data.amount))
        }
        try {
            const txHash = await ethereum.request({
                method:'eth_sendTransaction',
                params: [parametros]
            })
            setOK(txHash)
        } catch (error) {
            setKO("error en la transacción" + error.message)
        }
    }

if (!ethereum){
    return <div>No hay metamask</div>
}

    return (<div>
            <p>
                Cuenta: 
                {
                    cuenta ? cuenta : 'Cargando...'
                }
            </p>
            <p>
                Saldo: 
                {
                    balance ? balance : 'Cargando...'
                }
            </p>

            <form className="form-inline" onSubmit={handleSubmit(submit)}>
                <div className="form-group mb-3">
                    <label htmlFor="address">Address</label>
                    <input defaultValue={"0xDDA7d3339972bFdc5D0074AEE17542Cf19d9406F"} id="address" className="form-control" {...register("address")} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="amount">Amount</label>
                    <input defaultValue={0.01} id="amount" className="form-control" {...register("amount")} />
                </div>
                <button type="submit" className="btn btn-primary mb-3">Send</button>
            </form>
            {isOK && <div className="alert alert-info mt-3">{isOK}</div>}
            {isKO && <div className="alert alert-danger mt-3">{isKO}</div>}
        </div>)
}
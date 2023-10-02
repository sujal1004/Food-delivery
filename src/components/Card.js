import React, { useEffect, useRef, useState } from 'react'
import { useCart, useDispatchCart } from './ContextReducer';

export default function Card(props) {

    let options = props.options;
    let priceOptions = Object.keys(options);
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("")

    let dispatch = useDispatchCart();
    let data = useCart()

    const handleAddToCart = async () => {
        let food = []
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;
                break;
            }
        }
        if (food !== []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
                return
            }
            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
                return
                // console.log(data);
            }
            return
        }
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
    }



    let finalPrice = qty * parseInt(options[size]);

    const priceRef = useRef();
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])

    return (

        <div>
            <div className="card mt-3 " style={{ "width": "18rem", "maxHeight": "390px" }}>
                <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "150px", objectFit: "fill" }} />
                <div className="card-body" >
                    <h5 className="card-title"> {props.foodItem.name} </h5>
                    <p className="card-text">Lorem ipsum dolor sit amet consectetur..</p>
                    <div className="container w-100">
                        <select name="" id="" className="m-2 bg-success h-100 rounded" onChange={(e) => setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option value={i + 1} key={i + 1}>{i + 1}</option>
                                )
                            })}
                        </select>
                        <select name="" id="" className="m-2 bg-success h-100 rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                            {priceOptions.map((data) => {
                                return <option key={data} value={data}>
                                    {data}
                                </option>
                            })}
                        </select>

                        <div className='d-inline h-100 fs-6'>
                            Rs{finalPrice}/-
                        </div>
                    </div>
                    <hr></hr>
                    <button className={`btn btn-success justify-center ms-2`} onClick={handleAddToCart}>Add To Cart</button>
                </div>
            </div>
        </div>
    )
}

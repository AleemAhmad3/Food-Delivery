import { useNavigate, useSearchParams } from "react-router-dom"
import axios from "axios";
import { useEffect } from "react";

const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderid = searchParams.get("orderid");
    const navigate = useNavigate();

    const verifyPayment = async () => {
        const response = await axios.post("http://localhost:5000/api/orders/verify", {success,orderid});
        if(response.data.success){
            navigate("/myorders");
        }
        else{
            navigate("/")
        }
    }
    useEffect(() => {
        verifyPayment();
    },[]);
    
  return (
    <div>Verify</div>
  )
}

export default Verify
import { useEffect, useState } from "react";
import GlobalApi from "./GlobalApi";

export default function Order() {
     const [orders, setOrders] = useState([]);
     const [loading, setLoading] = useState(true);
     const [search, setSearch] = useState("");
     useEffect(() => {
        const fetchOrders = async () => {
            try {
                // const res = await GlobalApi.get("/reports/orders");
                const res = await GlobalApi.get(`/reports/orders?search=${search}`);
                setOrders(res.data.data || []);
            } catch (error) {
                console.error("Error fetching orders:", error);
                setOrders([]);
            }finally {
                setLoading(false);
            }
        };
        const timeOut = setTimeout(() => {
             fetchOrders();
        },300)
        return () => clearTimeout(timeOut);
           
     },[search])
     return  { orders, loading, search, setSearch };
    }

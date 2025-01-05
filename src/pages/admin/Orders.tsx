import { useState, useEffect } from 'react';

const Orders = () => {
    const [itemCount, setItemCount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        fetch('/api/admin/orders/stats')
            .then(response => response.json())
            .then(data => {
                setItemCount(data.itemCount);
                setTotalAmount(data.totalAmount);
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="p-5 bg-gray-100 rounded shadow">
            <div className="report-container">
                <h2 className="text-2xl font-semibold">Purchase Statistics</h2>
                <table className="w-full border-collapse mt-5">
                    <thead>
                        <tr>
                            <th className="p-3 border text-left bg-gray-200">Metric</th>
                            <th className="p-3 border text-left bg-gray-200">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="p-3 border text-left">Total Items Purchased</td>
                            <td className="p-3 border text-left">{itemCount}</td>
                        </tr>
                        <tr>
                            <td className="p-3 border text-left">Total Purchase Amount</td>
                            <td className="p-3 border text-left">${totalAmount}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Orders;
import React, { useState, useEffect } from "react";
import { OrderInfoQueryModel, OrderItemQueryModel } from "./OrderModels";
import { useParams, useNavigate } from "react-router-dom";
import AxiosInstance from "../common/AxiosInstance";

const OrderInfo = () => {
  const navigate = useNavigate();
  const [orderInfo, setOrderInfo] = useState<OrderInfoQueryModel>();

  const { orderId } = useParams();
  console.log(orderId);

  const refundOrder = async () => {
    const url = "/purcahse/cancel?orderId=" + orderId;

    try {
      const response = await AxiosInstance.get(url);

      navigate("/order-info/" + orderId);
    } catch (e) {}
  };

  const fetchData = async () => {
    const url = `orders/${orderId}/info`;

    try {
      const response = await AxiosInstance.get(url);
      const responseData: OrderInfoQueryModel = response.data;
      setOrderInfo(responseData);
      console.log(responseData);
    } catch (e) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {!orderInfo ? (
        <div>Waiting</div>
      ) : (
        <div className="container">
          <h4 className="text-left">주문 조회</h4>
          <div className="row mb-5">
            <div className="col-md-6 col-xl-4 mb-4 mb-xl-0">
              <div className="confirmation-card">
                <h3 className="billing-title">Order Info</h3>
                <table className="order-table">
                  <tbody>
                    <tr>
                      <td>Order number</td>
                      <td>: {orderInfo.orderCode}</td>
                    </tr>
                    <tr>
                      <td>Date</td>
                      <td>: {orderInfo.orderDate.toString()}</td>
                    </tr>
                    <tr>
                      <td>Total</td>
                      <td>: {orderInfo.totalPrice}</td>
                    </tr>
                    <tr>
                      <td>Provider</td>
                      <td>: {orderInfo.purchaseProvider}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-md-5"></div>
            <div className="col-md-1">
              <button className="btn btn-primary" onClick={refundOrder}>
                환불 요청
              </button>
            </div>
          </div>
          <div className="order_details_table">
            <h2>Order Details</h2>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">물품 이름</th>
                    <th scope="col">수량</th>
                    <th scope="col">총액</th>
                  </tr>
                </thead>
                <tbody>
                  {orderInfo.orderItemList.map((orderItem) => (
                    <OrderItem key={orderItem.itemId} item={orderItem} />
                  ))}

                  <tr>
                    <td>
                      <h4>총 금액</h4>
                    </td>
                    <td>
                      <h5></h5>
                    </td>
                    <td>
                      <p>{orderInfo.totalPrice}원</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const OrderItem: React.FC<{
  item: OrderItemQueryModel;
}> = ({ item }) => {
  return (
    <tr>
      <td>
        <p>{item.itemName}</p>
      </td>
      <td>
        <h5>{item.quantity}</h5>
      </td>
      <td>
        <p>{item.discountedPrice}</p>
      </td>
    </tr>
  );
};

export default OrderInfo;
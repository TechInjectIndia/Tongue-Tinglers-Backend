async function parseAndSaveEvent(eventPayload: any) {
    const { event, payload } = eventPayload;
  
    let transactionData: any = {};
  
    if (event.startsWith("order.")) {
      // Handle `order.*` events
      const order = payload.order;
      transactionData = {
        transactionId: order.id,
        entity: "order",
        status: order.status,
        amount: order.amount,
        currency: order.currency,
        createdAt: new Date(order.created_at * 1000),
      };
    } else if (event.startsWith("payment_link.")) {
      // Handle `payment_link.*` events
      const paymentLink = payload.payment_link;
      transactionData = {
        transactionId: paymentLink.id,
        entity: "payment_link",
        status: paymentLink.status,
        amount: paymentLink.amount,
        currency: paymentLink.currency,
        createdAt: new Date(paymentLink.created_at * 1000),
      };
    }   
    console.log(transactionData);
    
}    


export {parseAndSaveEvent}
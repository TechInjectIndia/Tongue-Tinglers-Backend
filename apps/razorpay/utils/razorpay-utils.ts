async function parseAndSaveEvent(eventPayload: any) {
    const { event, payload } = eventPayload;
    let transactionData: any = {};
  
    // Check if the event is of type 'order.' or 'payment_link.'
    if (event.startsWith("order.")) {
      // Order event, e.g., order.paid
      const order = payload?.order?.entity; // Access the 'entity' object
  
      // Ensure that the 'order' entity exists before extracting its properties
      if (order) {
        transactionData = {
          transactionId: order?.id || null,
          entity: "order",
          status: order?.status || null,
          amount: order?.amount || null,
          currency: order?.currency || null,
          createdAt: order?.created_at ? new Date(order.created_at * 1000) : null, // Convert UNIX timestamp
        };
      }
    } else if (event.startsWith("payment_link.")) {
      // Payment link event, e.g., payment_link.paid
      const paymentLink = payload?.payment_link?.entity; // Access the 'entity' object
  
      // Ensure that the 'payment_link' entity exists before extracting its properties
      if (paymentLink) {
        transactionData = {
          transactionId: paymentLink?.id || null,
          entity: "payment_link",
          status: paymentLink?.status || null,
          amount: paymentLink?.amount || null,
          currency: paymentLink?.currency || null,
          createdAt: paymentLink?.created_at ? new Date(paymentLink.created_at * 1000) : null, // Convert UNIX timestamp
        };
      }
    } else if (event.startsWith("payment.")) {
      // Payment event, e.g., payment.authorized, payment.captured
      const payment = payload?.payment?.entity; // Access the 'entity' object
  
      // Ensure that the 'payment' entity exists before extracting its properties
      if (payment) {
        transactionData = {
          transactionId: payment?.id || null,
          entity: "payment",
          status: payment?.status || null,
          amount: payment?.amount || null,
          currency: payment?.currency || null,
          createdAt: payment?.created_at ? new Date(payment.created_at * 1000) : null, // Convert UNIX timestamp
        };
      }
    }
  
    console.log("Parsed Transaction Data:", transactionData);
  
    // Save the transaction data to your transactionTable
    
  }  


export {parseAndSaveEvent}
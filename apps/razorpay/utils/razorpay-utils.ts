 async function parseAndSaveEvent(eventPayload: any) {
    const { event, payload } = eventPayload;
    let transactionData: any = {};
  
    // For "order" events, e.g., order.paid, order.created
    if (event.startsWith("order.")) {
      const order = payload?.order?.entity; // Access the 'entity' object of the order
  
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
    } 
    // For "payment_link" events, e.g., payment_link.paid
    else if (event.startsWith("payment_link.")) {
      const paymentLink = payload?.payment_link?.entity;
  
      if (paymentLink) {
        transactionData = {
          transactionId: paymentLink?.id || null,
          entity: "payment_link",
          status: paymentLink?.status || null,
          amount: paymentLink?.amount || null,
          currency: paymentLink?.currency || null,
          createdAt: paymentLink?.created_at ? new Date(paymentLink.created_at * 1000) : null,
        };
      }
    } 
    // For "payment" events, including "payment.failed"
    else if (event.startsWith("payment.")) {
      const payment = payload?.payment?.entity;
  
      if (payment) {
        // Special handling for failed payments
        if (event === "payment.failed") {
          transactionData = {
            transactionId: payment?.id || null,
            entity: "payment",
            status: "failed", // Explicitly mark the status as "failed"
            amount: payment?.amount || null,
            currency: payment?.currency || null,
            failureReason: payment?.failure_reason || null, // Extract failure reason if available
            createdAt: payment?.created_at ? new Date(payment.created_at * 1000) : null,
          };
        } else {
          // Handle other payment events (e.g., payment.authorized, payment.captured)
          transactionData = {
            transactionId: payment?.id || null,
            entity: "payment",
            status: payment?.status || null,
            amount: payment?.amount || null,
            currency: payment?.currency || null,
            createdAt: payment?.created_at ? new Date(payment.created_at * 1000) : null,
          };
        }
      }
    }
  
    console.log("Parsed Transaction Data:", transactionData);
  
    // Save the transaction data to your transactionTable
    // await saveTransaction(transactionData);
  }
  
export {parseAndSaveEvent}
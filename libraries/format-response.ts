import common500 from "constants";

export default (message, data, error = false, errorData = null) => ({
  error: !!error,
  message: message || (error ? common500 : "Success"),
  errorData: error ? errorData : null,
  data: error ? null : data,
});

export function safeStringify(obj) {
  const seen = new WeakSet(); // Use WeakSet to keep track of visited objects
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return undefined; // Avoid circular reference by returning undefined
      }
      seen.add(value); // Mark object as visited
    }
    return value; // Return value if no circular reference
  });
}

export const createLeadResponse = (obj: any) => {
  return {
    "id": obj.id,
    "campaignId": obj.campaign,
    "firstName": obj.firstName,
    "lastName": obj.lastName,
    "email": obj.email,
    "phoneNumber": obj.phoneNumber,
    "address": obj.address,
    "additionalInfo": obj?.additionalInfo ?? null,
    "status": obj.status,
    "source": obj.source,
    "sourceInfo": obj?.sourceInfo ?? null,
    "followDetails": obj?.followDetails ?? [],
    "referBy": obj?.referBy ?? null,
    "logs": obj?.logs ?? [],
    "notes": obj?.notes ?? [],
    "proposalModalId": obj?.proposalModalId,
    "amount": obj?.amount,
    "franchiseModals": obj?.franchiseModals ?? [],
    "affiliate": obj?.affiliate ?? [],
    "marketing": obj?.marketing ?? [],
    "other": obj?.other ?? [],
    "createdBy": obj?.createdBy,
    "updatedBy": obj?.updatedBy,
    "deletedBy": obj?.deletedBy ?? null,
    "createdAt": obj?.createdAt,
    "updatedAt": obj?.updatedAt,
    "deletedAt": obj?.deletedAt ?? null,
    "assignedUser": obj?.assignedUser ?? null
  }
}

export const createLeadsResponse = (data: any[]) => {
  return data.map((lead) => createLeadResponse(lead));
};


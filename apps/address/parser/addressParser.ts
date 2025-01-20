import {Address, ParsedAddress} from '../../../types/baseAddress';
import {sortingLogs} from '../../lead/parser/leadParser'
const parseAddress = (address: any): ParsedAddress => {
  const data: ParsedAddress = {
    id: address.id,
    street: address.street,
    city: address.city,
    state: address.state,
    postalCode: address.postalCode,
    country: address.country,
    phoneNumber: address.phoneNumber,
    firstName: address.firstName,
    lastName: address.lastName,
    logs: address.logs ? address.logs : null
  };
  return data
};

export {parseAddress}



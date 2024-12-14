import {Address, ParsedAddress} from '../../../types/baseAddress';

const parseAddress = (address: Address): ParsedAddress => {
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
  };
  return data
};

export {parseAddress}
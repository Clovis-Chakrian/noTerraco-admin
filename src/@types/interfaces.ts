export default interface IProduct {
  id: number,
  name: string,
  type: string,
  subtype: string,
  description: string,
  memory: string,
  imageUrl: string,
  price: number,
  availability: boolean,
  priceForTwo: number,
  updateTimes: number
};

export interface IAdmin {
  id: number,
  name: string,
  accountType: string
};
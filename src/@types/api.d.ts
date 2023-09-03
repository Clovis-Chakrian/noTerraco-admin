interface IProduct {
  id: string,
  name: string,
  imageUrl: string,
  description?: string,
  availability: boolean,
  type: string,
  subtype?: string,
  price: string,
  priceForTwo?: string
};

export { IProduct };
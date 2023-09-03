interface IDisheCard {
  name: string,
  type: string,
  description: string,
  imageUrl: string,
  price: string,
  editFunction: () => void,
  deleteFunction: () => void,
  avaibilityFunction: () => void,
  avaibility: boolean
};

interface IMainDisheCard {
  name: string,
  type: string,
  subtype: string,
  description: string,
  imageUrl: string,
  price: string,
  priceForTwo: string,
  editFunction: () => void,
  deleteFunction: () => void,
  avaibilityFunction: () => void,
  avaibility: boolean
};

interface IExtraPortionCard {
  name: string,
  type: string,
  price: string,
  editFunction: () => void,
  deleteFunction: () => void,
  avaibilityFunction: () => void,
  avaibility: boolean
};

interface IWineCard {
  name: string,
  type: string,
  subtype: string,
  imageUrl: string,
  price: string,
  priceForTwo: string,
  editFunction: () => void,
  deleteFunction: () => void,
  avaibilityFunction: () => void,
  avaibility: boolean
};

interface IPicker {
  options: string[],
  onSelectOption: (option: string) => void,
  selectedOption: string
};

interface IDisheForm {
  type: string,
  selectedProductId?: string,
  currentImageUrl?: string,
  currentName?: string,
  currentDescription?: string,
  currentPrice?: string,
  subtype?: string | null,
  edit?: boolean
};

interface IMainDisheForm {
  type: string,
  selectedProductId?: string,
  currentImageUrl?: string,
  subtype: string,
  currentName?: string,
  currentDescription?: string,
  currentPrice?: string,
  currentPriceForTwo?: string,
  edit?: boolean
}

interface IInput {
  placeholder: string,
  onChangeText: (text: string) => void,
  label: string,
  initialValue?: string,
  number?: boolean
};

interface IImageInput {
  label: string,
  onPressFunction: () => void,
  icon: 'add-circle-outline' | 'sync-outline',
  uri?: string
}

interface IFile {
  type: "success";
  name: string;
  size?: number | undefined;
  uri: string;
  mimeType?: string | undefined;
  lastModified?: number | undefined;
  file?: File | undefined;
  output?: FileList | null | undefined;
}

export {
  IDisheCard,
  IMainDisheCard,
  IExtraPortionCard,
  IPicker,
  IDisheForm,
  IInput,
  IImageInput,
  IFile,
  IMainDisheForm,
  IWineCard
};
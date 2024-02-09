export class UpdateProductsDTO {
    adminId?: string
    name?: string;
    value?: number;
    Amount?: number;
    description?: string;
    productPicture?: string;

    constructor(pructData?: ProductsDTO) {
        this.adminId = pructData?.adminId;
        this.name = pructData?.name;
        this.value = pructData?.value;
        this.Amount = pructData?.Amount;
        this.description = pructData?.description;
        this.productPicture = pructData?.productPicture;
    }
}

export type ProductsDTO={
    adminId?: string
    name?: string;
    value?: number;
    Amount?: number;
    description?: string;
    productPicture?: string;
}

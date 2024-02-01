export class UpdateProductsDTO {
    name?: string;
    value?: number;
    Amount?: number;
    description?: string;
    image?: string;

    constructor(pructData?: ProductsDTO) {
        this.name = pructData?.name;
        this.value = pructData?.value;
        this.Amount = pructData?.Amount;
        this.description = pructData?.description;
        this.image = pructData?.image;
    }
}

export type ProductsDTO={
    name?: string;
    value?: number;
    Amount?: number;
    description?: string;
    image?: string;
}

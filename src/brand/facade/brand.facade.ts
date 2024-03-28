import { Injectable } from '@nestjs/common';
import { BrandService } from '../brand.service';
import { Brand } from '../schemas/brand.schema';

@Injectable()
export class BrandFacade {
    constructor(private readonly brandService: BrandService) {}

    async createBrand(name: string): Promise<Brand> {
        return this.brandService.create({ name });
    }

    async getAllBrands(): Promise<Brand[]> {
        return this.brandService.findAll();
    }
    
    async getBrandById(id: string): Promise<Brand> {
        return this.brandService.findById(id);
    }

    async updateBrand(id: string, name: string): Promise<Brand> {
        return this.brandService.update(id, { name });
    }

    async deleteBrand(id: string): Promise<Brand> {
        return this.brandService.delete(id);
    }
}

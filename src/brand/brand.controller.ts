import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BrandFacade } from './facade/brand.facade';
import { Brand } from './schemas/brand.schema';

@Controller('brand')
export class BrandController {
    constructor(private readonly brandFacade: BrandFacade) {}


    @Post()
    async create(@Body('name') name: string): Promise<Brand> {
        return this.brandFacade.createBrand(name);

    }

    @Get() //read
    async findAllBrands() {
        return await this.brandFacade.getAllBrands();
    }

    @Get(':id')
    async findBrandById(@Param('id') id: string) {
        return await this.brandFacade.getBrandById(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body('name') name: string): Promise<Brand> {
        return this.brandFacade.updateBrand(id, name);
    }

    @Delete(':id')
    async deleteBrand(@Param('id') id: string) {
        return await this.brandFacade.deleteBrand(id);
    }
}

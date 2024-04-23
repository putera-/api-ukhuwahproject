import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, UseInterceptors, ValidationPipe, UploadedFiles } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';
import { Campaign } from './campaigns.interface';
import { Pagination } from 'src/app.interface';
import { Public } from 'src/auth/auth.metadata';
import { PhotosService } from 'src/photos/photos.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Prisma } from '@prisma/client';

@Controller('campaigns')
export class CampaignsController {
    constructor(
        private readonly campaignsService: CampaignsService,
        private photoService: PhotosService
    ) { }

    @Roles(Role.Admin, Role.Staff)
    @Post()
    @UseInterceptors(FilesInterceptor('photos', 10)) // key=photo. max = 10
    async create(@Req() req, @Body(new ValidationPipe()) createCampaignDto: CreateCampaignDto, @UploadedFiles() files: Array<Express.Multer.File>): Promise<Campaign> {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

        try {
            // save photos
            let photos = [];
            if (files) photos = await this.photoService.createMany(files, uniqueSuffix);

            const data: Record<string, any> | Prisma.CampaignCreateInput = { ...createCampaignDto };

            // set author
            data.author = {
                connect: { id: req.user.id }
            }

            return this.campaignsService.create(data as Prisma.CampaignCreateInput, photos);
        } catch (error) {
            // remove photo
            if (files) this.photoService.removeMany(files, uniqueSuffix);

            throw error;
        }
    }

    @Roles(Role.Admin, Role.Staff)
    @Get()
    async findAll(@Query('search') search: string, @Query('page') page: string, @Query('limit') limit: string): Promise<Pagination<Campaign[]>> {
        try {
            return this.campaignsService.findAll(search, page, limit);
        } catch (error) {
            throw error;
        }
    }

    @Public()
    @Get('published')
    async findAllPublish(@Req() req, @Query('search') search: string, @Query('page') page: string, @Query('limit') limit: string): Promise<Pagination<Campaign[]>> {
        try {
            const userId: string | undefined = req.user ? req.user.id : undefined;

            return this.campaignsService.findAllPublished(search, page, limit, userId);
        } catch (error) {
            throw error;
        }
    }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //   return this.campaignsService.findOne(+id);
    // }

    @Public()
    @Get('published/:id')
    findPublished(@Param('id') id: string, @Req() req) {
        try {
            const userId: string | undefined = req.user ? req.user.id : undefined;

            return this.campaignsService.findPublished(id, userId);
        } catch (error) {
            throw error;
        }
    }

    @Get('transaction/:id')
    findByTransaction(@Param('id') id: string, @Req() req) {
        try {
            return this.campaignsService.findByTransaction(id);
        } catch (error) {
            throw error;
        }
    }

    @Public()
    @Get('donations/:campaignId')
    getDonations(@Param('campaignId') campaignId: string, @Query('page') page) {
        try {
            return this.campaignsService.getDonations(campaignId, page);
        } catch (error) {
            throw error;
        }
    }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateCampaignDto: UpdateCampaignDto) {
    //   return this.campaignsService.update(+id, updateCampaignDto);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //   return this.campaignsService.remove(+id);
    // }
}

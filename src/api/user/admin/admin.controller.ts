import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SwaggerApi } from 'src/common/swagger-apiresponse/swagger-response';
import { adminData } from 'src/common/document/swagger';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  // ================================= CREATED =================================
  @ApiOperation({ summary: 'Created Admin' })
  @ApiResponse(
    SwaggerApi.ApiSuccessResponse(
      adminData,
      HttpStatus.CREATED,
      'Admin created',
    ),
  )
  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.createAdmin(createAdminDto);
  }

  // ================================= GET ALL =================================
  @ApiOperation({ summary: 'Get All Admin' })
  @ApiResponse(
    SwaggerApi.ApiSuccessResponse(
      adminData,
      HttpStatus.OK,
      'Success',
    ),
  )
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  // ================================= GET ONE =================================
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOneById(id);
  }

  // ================================= UPDATE =================================
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(id, updateAdminDto);
  }

  // ================================= DELETE =================================
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SwaggerApi } from 'src/common/swagger-apiresponse/swagger-response';
import { adminData, tokenRes } from 'src/common/document/swagger';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { RolesGuard } from 'src/common/guard/role.guard';
import { AccessRoles } from 'src/common/decorator/roles.decorator';
import { Roles } from 'src/common/enum/Roles';
import type { Response } from 'express';
import { SignInAdminDto } from './dto/sign-in.dto';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  // ================================= CREATED =================================

  // SWAGGER
  @ApiOperation({ summary: 'Created Admin' })
  @ApiResponse(
    SwaggerApi.ApiSuccessResponse(
      adminData,
      HttpStatus.CREATED,
      'Admin created',
    ),
  )
  // GUARD
  @UseGuards(AuthGuard, RolesGuard)
  @AccessRoles(Roles.SUPERADMIN)

  // ENDPOINT
  @Post()
  @ApiBearerAuth()

  // CREATED
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.createAdmin(createAdminDto);
  }
  // ================================= SIGN IN =================================

  // SWAGGER
  @ApiOperation({ summary: 'Sign In' })
  @ApiResponse(
    SwaggerApi.ApiSuccessResponse(tokenRes, HttpStatus.OK, 'Success'),
  )

  // ENDPOINT
  @Post('signin')
  signIn(
    @Body() signInDto: SignInAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.signIn(signInDto, res);
  }
  // ================================= GET ALL =================================

  // SWAGGER
  @ApiOperation({ summary: 'Get All Admin' })
  @ApiResponse(
    SwaggerApi.ApiSuccessResponse(adminData, HttpStatus.OK, 'Success'),
  )
  // GUARD
  @UseGuards(AuthGuard, RolesGuard)
  @AccessRoles(Roles.SUPERADMIN)

  // ENDPOINT
  @Get()
  @ApiBearerAuth()

  // FIND ALL
  findAll() {
    return this.adminService.findAll();
  }

  // ================================= GET ONE =================================

  // SWAGGER
  @ApiOperation({ summary: 'Get one' })
  @ApiResponse(
    SwaggerApi.ApiSuccessResponse(adminData, HttpStatus.OK, 'Success'),
  )
  // GUARD
  @UseGuards(AuthGuard, RolesGuard)
  @AccessRoles(Roles.SUPERADMIN, Roles.ADMIN)

  // ENDPOINT
  @Get(':id')
  @ApiBearerAuth()

  // FIND ONE
  findOne(@Param('id') id: number) {
    return this.adminService.findOneById(+id);
  }

  // ================================= UPDATE =================================

  // SWAGGER
  @ApiOperation({ summary: 'Update Admin' })
  @ApiResponse(
    SwaggerApi.ApiSuccessResponse(adminData, HttpStatus.OK, 'Success'),
  )
  // GUARD
  @UseGuards(AuthGuard, RolesGuard)
  @AccessRoles(Roles.SUPERADMIN)

  // ENDPOINT
  @Patch(':id')
  @ApiBearerAuth()

  // UPDATE
  update(
    @Param('id') id: number,
    @Body() updateAdminDto: UpdateAdminDto,
    @Req() req: Request,
  ) {
    console.log(req);

    return this.adminService.updateAdmin(+id, updateAdminDto);
  }

  // ================================= DELETE =================================

  // SWAGGER
  @ApiOperation({ summary: 'Delete Admin' })
  @ApiResponse(SwaggerApi.ApiSuccessResponse({}, HttpStatus.OK, 'Success'))

  // GUARD
  @UseGuards(AuthGuard, RolesGuard)
  @AccessRoles(Roles.SUPERADMIN, Roles.ADMIN)

  // ENDPOINT
  @Delete(':id')
  @ApiBearerAuth()

  // DELETE
  remove(@Param('id') id: number) {
    return this.adminService.remove(+id);
  }
}

// ================================= SIGN OUT =================================

// ================================= NEW TOKEN =================================

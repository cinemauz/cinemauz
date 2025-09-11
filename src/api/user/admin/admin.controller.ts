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
  Query,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SwaggerApi } from 'src/common/swagger-apiresponse/swagger-response';
import { adminData, tokenRes } from 'src/common/document/swagger';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { RolesGuard } from 'src/common/guard/role.guard';
import { AccessRoles } from 'src/common/decorator/roles.decorator';
import { Roles } from 'src/common/enum/Roles';
import { SignInAdminDto } from './dto/sign-in.dto';
import { GetRequestUser } from 'src/common/decorator/get-request.decorator';
import type { IToken } from 'src/infrastructure/token/token.interface';
import { CookieGetter } from 'src/common/decorator/cooki-getter.decorator';
import { AuthService } from '../auth/auth.service';
import type { Response } from 'express'
import { QueryPagination } from 'src/common/dto/query.pagenation';
import { ILike } from 'typeorm';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService,
    private readonly authService: AuthService
  ) { }

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
    SwaggerApi.ApiSuccessResponse(tokenRes),
  )

  // ENDPOINT
  @Post('signin')
  signIn(
    @Body() signInDto: SignInAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.signIn(signInDto, res);
  }

  // ================================= NEW TOKEN =================================
  @ApiOperation({ summary: 'New Token' })
  @ApiResponse(
    SwaggerApi.ApiSuccessResponse(tokenRes),
  )

  // ENDPOINT
  @Post('newtoken')
  newToken(@CookieGetter('adminToken') token: string) {
    return this.authService.newToken(this.adminService.getRepository, token)
  }

  // ================================= SIGN OUT =================================

  // SWAGGER
  @ApiOperation({ summary: 'Sign out' })
  @ApiResponse(
    SwaggerApi.ApiSuccessResponse({}),
  )
  // GUARD
  @UseGuards(AuthGuard, RolesGuard)
  @AccessRoles(Roles.SUPERADMIN, Roles.ADMIN)

  // ENDPOINT
  @Post('signout')
  @ApiBearerAuth()
  signOut(
    @CookieGetter('adminToken') token: string,
    @Res({ passthrough: true }) res: Response) {
    return this.authService.signOut(this.adminService.getRepository, token, res, 'adminToken')
  }
  // ================================= GET ALL PAGENATION =================================
  // SWAGGER
  @ApiOperation({ summary: 'Find All Pagenation' })
  @ApiResponse(
    SwaggerApi.ApiSuccessResponse([adminData,adminData]),
  )
  // GUARD
  @UseGuards(AuthGuard, RolesGuard)
  @AccessRoles(Roles.SUPERADMIN)

  // ENDPOINT
  @Get('page')
  @ApiBearerAuth()
  findAllWithPagenation(
    @Query() queryDto:QueryPagination) {
      const {query,page,limit}=queryDto
      const where=query?
      {username:ILike(`%${query}%`),role:Roles.ADMIN,is_deleted:false}:
      {role:Roles.ADMIN,is_deleted:false}
      return this.adminService.findAllWithPagination({
        where,
        select:{
          id:true,
          username:true,
          is_active:true,
        },
        skip:page,
        take:limit
      })
  }
  // ================================= GET ALL =================================

  // SWAGGER
  @ApiOperation({ summary: 'Get All Admin' })
  @ApiResponse(
    SwaggerApi.ApiSuccessResponse([adminData,adminData]),
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
    SwaggerApi.ApiSuccessResponse(adminData),
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
  @ApiParam(SwaggerApi.ApiParam())
  @ApiResponse(
    SwaggerApi.ApiSuccessResponse(adminData),
  )

  // GUARD
  @UseGuards(AuthGuard, RolesGuard)
  @AccessRoles(Roles.SUPERADMIN, 'ID')

  // ENDPOINT
  @Patch(':id')
  @ApiBearerAuth()

  // UPDATE
  update(
    @GetRequestUser('user') user: IToken,
    @Param('id') id: number,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return this.adminService.updateAdmin(+id, updateAdminDto, user);
  }

  // ================================= DELETE =================================

  // SWAGGER
  @ApiOperation({ summary: 'Delete Admin' })
  @ApiResponse(SwaggerApi.ApiSuccessResponse({}))

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

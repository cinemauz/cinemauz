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
  Res,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { AuthService } from '../auth/auth.service';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { SwaggerApi } from 'src/common/swagger-apiresponse/swagger-response';
import { adminAll, adminData, tokenRes } from 'src/common/document/swagger';
import { AccessRoles } from 'src/common/decorator/roles.decorator';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { RolesGuard } from 'src/common/guard/role.guard';
import { Roles } from 'src/common/enum/Roles';
import { CookieGetter } from 'src/common/decorator/cooki-getter.decorator';
import { UpdatePassword } from '../admin/dto/update-password.dto';
import { QueryPagination } from 'src/common/dto/query.pagenation';
import { GetRequestUser } from 'src/common/decorator/get-request.decorator';
import { IToken } from 'src/infrastructure/token/token.interface';
import { UpdateAdminDto } from '../admin/dto/update-admin.dto';

@Controller('customer')
export class CustomerController {
    constructor(
      private readonly customerService: CustomerService,
      private readonly authService: AuthService,
    ) { }
  
    // ================================= CREATED =================================
  
    // SWAGGER
    @ApiOperation({ summary: 'Created Customer' })
    @ApiResponse(
      SwaggerApi.ApiSuccessResponse(
        adminData,
        HttpStatus.CREATED,
        'Customer created',
      ),
    )
    // GUARD
    @UseGuards(AuthGuard, RolesGuard)
    @AccessRoles(Roles.SUPERADMIN,Roles.ADMIN)
  
    // ENDPOINT
    @Post()
    @ApiBearerAuth()
  
    // CREATED
    create(@Body() createCustomerDto: CreateCustomerDto) {
      // return this.customerService.createAdmin(createCustomerDto);
    }
  
    // ================================= SIGN IN =================================
  
    // SWAGGER
    @ApiOperation({ summary: 'Sign In' })
    @ApiResponse(SwaggerApi.ApiSuccessResponse(tokenRes))
  
    // ENDPOINT
    @Post('signin')
  
    // SIGN IN
    signIn(
      // @Body() signInDto: SignInAdminDto,-------------------?
      @Res({ passthrough: true }) res: Response,
    ) {
      // return this.customerService.signIn(signInDto, res);,-------------------?
    }
  
    // ================================= NEW TOKEN =================================
    @ApiOperation({ summary: 'New Token' })
    @ApiResponse(SwaggerApi.ApiSuccessResponse(tokenRes))
  
    // ENDPOINT
    @Post('newtoken')
  
    // NEW TOKEN
    newToken(@CookieGetter('adminToken') token: string) {
      return this.authService.newToken(this.customerService.getRepository, token);
    }
  
    // ================================= SIGN OUT =================================
  
    // SWAGGER
    @ApiOperation({ summary: 'Sign out' })
    @ApiResponse(SwaggerApi.ApiSuccessResponse({}))
  
    // GUARD
    @UseGuards(AuthGuard, RolesGuard)
    @AccessRoles(Roles.SUPERADMIN, 'ID')
  
    // ENDPOINT
    @Post('signout')
    @ApiBearerAuth()
  
    // SIGN OUT
    signOut(
      @CookieGetter('adminToken') token: string,
      @Res({ passthrough: true }) res: Response,
    ) {
      // return this.authService.signOut( ,-------------------?
      //   this.customerService.getRepository,
      //   token,
      //   // res,
      //   'adminToken',
      // );
    }
    // ================================= UPDATE OLD PASSWORD =================================
  
    // SWAGGER
    @ApiOperation({ summary: 'Update Password' })
    @ApiParam(SwaggerApi.ApiParam())
    @ApiResponse(SwaggerApi.ApiSuccessResponse())
  
    // GUARD
    @UseGuards(AuthGuard, RolesGuard)
    @AccessRoles(Roles.SUPERADMIN, 'ID')
  
    // ENDPOINT
    @Post('update-password:id')
    @ApiBearerAuth()
  
    // UPDATE PASSWORD
    updatePassoword(
      @Param('id',ParseIntPipe) id:number,
      @Body() updatePassword:UpdatePassword
    ) {
      const {old_password,new_password}=updatePassword
      return this.authService.UpdatePassword(old_password,new_password,id,this.customerService.getRepository)
    }
    // ================================= GET ALL PAGENATION =================================
    // SWAGGER
    @ApiOperation({ summary: 'Find All Pagenation' })
    @ApiResponse(SwaggerApi.ApiSuccessResponse([adminData, adminData]))
  
    // GUARD
    @UseGuards(AuthGuard, RolesGuard)
    @AccessRoles(Roles.SUPERADMIN)
  
    // ENDPOINT
    @Get('page')
    @ApiBearerAuth()
  
    // PAGENATION
    findAllWithPagenation(@Query() queryDto: QueryPagination) {
  
      const { query, limit, page } = queryDto;
  
      return this.customerService.findAllWithPagination(query, limit, page);
    }
    // ================================= GET ALL =================================
  
    // SWAGGER
    @ApiOperation({ summary: 'Get All Admin' })
    @ApiResponse(SwaggerApi.ApiSuccessResponse([adminAll, adminAll]))
    // GUARD
    @UseGuards(AuthGuard, RolesGuard)
    @AccessRoles(Roles.SUPERADMIN)
  
    // ENDPOINT
    @Get()
    @ApiBearerAuth()
  
    // FIND ALL
    findAll() {
      // return this.customerService.findAll({
      //   where: { is_deleted: false, role: Roles.ADMIN },,-------------------?
      //   select: {
      //     id: true,
      //     username: true,
      //     role: true,
      //     balance: true,
      //     name: true,
      //   },
      //   order: { createdAt: 'DESC' },
      // });
    }
  
    // ================================= GET ONE =================================
  
    // SWAGGER
    @ApiOperation({ summary: 'Get one' })
    @ApiResponse(SwaggerApi.ApiSuccessResponse(adminData))
    // GUARD
    @UseGuards(AuthGuard, RolesGuard)
    @AccessRoles(Roles.SUPERADMIN, 'ID')
  
    // ENDPOINT
    @Get(':id')
    @ApiBearerAuth()
  
    // FIND ONE
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.customerService.findOneById(+id);
    }
  
    // ================================= UPDATE =================================
  
    // SWAGGER
    @ApiOperation({ summary: 'Update Admin' })
    @ApiParam(SwaggerApi.ApiParam())
    @ApiResponse(SwaggerApi.ApiSuccessResponse(adminData))
  
    // GUARD
    @UseGuards(AuthGuard, RolesGuard)
    @AccessRoles(Roles.SUPERADMIN, 'ID')
  
    // ENDPOINT
    @Patch(':id')
    @ApiBearerAuth()
  
    // UPDATE
    update(
      // @GetRequestUser('user') user: IToken, ,-------------------?
      @Param('id', ParseIntPipe) id: number,
      @Body() updateAdminDto: UpdateAdminDto,
    ) {
      // return this.customerService.updateAdmin(+id, updateAdminDto, user);,-------------------?
    }
  
    // ================================= SOFT DELETE =================================
    // SWAGGER
    @ApiOperation({ summary: 'Soft delete Admin' })
    @ApiParam(SwaggerApi.ApiParam())
    @ApiResponse(SwaggerApi.ApiSuccessResponse({}))
  
    // GUARD
    @UseGuards(AuthGuard, RolesGuard)
    @AccessRoles(Roles.SUPERADMIN)
  
    // ENDPOINT
    @Patch('delete/:id')
    @ApiBearerAuth()
  
    // UPDATE
    softDelete(@Param('id', ParseIntPipe) id: number) {
      return this.customerService.softDelete(+id);
    }
    // ================================= DELETE =================================
  
    // SWAGGER
    @ApiOperation({ summary: 'Delete Admin' })
    @ApiResponse(SwaggerApi.ApiSuccessResponse({}))
  
    // GUARD
    @UseGuards(AuthGuard, RolesGuard)
    @AccessRoles(Roles.SUPERADMIN)
  
    // ENDPOINT
    @Delete(':id')
    @ApiBearerAuth()
  
    // DELETE
    remove(@Param('id', ParseIntPipe) id: number) {
      return this.customerService.remove(+id);
    }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SwaggerApi } from 'src/common/swagger-apiresponse/swagger-response';
import { PostSawgger } from 'src/common/document/swagger.post';
import { RolesGuard } from 'src/common/guard/role.guard';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { AccessRoles } from 'src/common/decorator/roles.decorator';
import { Roles } from 'src/common/enum/Roles';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  // ================================ CREATE ================================

  // SWAGGER
  @ApiOperation({ summary: 'Create Wallet' })
  @ApiResponse(SwaggerApi.ApiSuccessResponse(PostSawgger.reviewDate))

  // GUARD
  @UseGuards(AuthGuard, RolesGuard)
  @AccessRoles(Roles.SUPERADMIN, Roles.ADMIN, Roles.CUSTOMER)

  // ENDPOINT
  @Post()
  @ApiBearerAuth()

  // CREATE
  create(@Body() createWalletDto: CreateWalletDto) {
    return this.walletService.createWallet(createWalletDto);
  }
  // ================================ FIND ALL ================================

  // SWAGGER
  @ApiOperation({ summary: 'Get All Wallet' })
  @ApiResponse(
    SwaggerApi.ApiSuccessResponse([
      PostSawgger.reviewAll,
      PostSawgger.reviewAll,
    ]),
  )

  // ENDPOINT
  @Get()

  //FIND ALL
  findAll() {
    // return this.walletService.findAll({
    //   relations: {
    //     customer: true,
    //     movie: true,
    //   },
    //   where: {
    //     is_deleted: false,
    //   },
    //   select: {
    //     id: true,
    //     rating: true,
    //     comment: true,
    //     customer: {
    //       id: true,
    //       name: true,
    //       email: true,
    //     },
    //     movie: {
    //       id: true,
    //       title: true,
    //       createdAt: true,
    //     },
    //   },
    //   order: { createdAt: 'DESC' },
    // });
  }
  // ================================ GET ONE ================================

  // SWAGGER
  @ApiOperation({ summary: 'Get One Wallet' })
  @ApiResponse(SwaggerApi.ApiSuccessResponse(PostSawgger.reviewDate))

  // ENDPOINT
  @Get(':id')

  // FIND ONE
  findOne(@Param('id') id: number) {
    // return this.walletService.findOneBY({
    //   relations: {
    //     customer: true,
    //     movie: true,
    //   },
    //   where: {
    //     id,
    //     is_deleted: false,
    //   },
    //   select: {
    //     createdAt: true,
    //     updatedAt: true,
    //     id: true,
    //     rating: true,
    //     comment: true,
    //     customer: {
    //       id: true,
    //       name: true,
    //       email: true,
    //     },
    //     movie: {
    //       id: true,
    //       title: true,
    //       createdAt: true,
    //     },
    //   },
    //   order: { createdAt: 'DESC' },
    // });
  }
  // ================================ UPDATE ================================

  // SWAGGER
  @ApiOperation({ summary: 'Update Wallet' })
  @ApiResponse(SwaggerApi.ApiSuccessResponse(PostSawgger.reviewDate))

  // GUARD
  @UseGuards(AuthGuard, RolesGuard)
  @AccessRoles(Roles.SUPERADMIN, Roles.ADMIN, Roles.CUSTOMER)

  // ENDPOINT
  @Patch(':id')
  @ApiBearerAuth()

  // UPDATE
  update(@Param('id') id: number, @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletService.updateWallet(+id, updateWalletDto);
  }

  // ================================ SOFT DELETE ================================

  // SWAGGER
  @ApiOperation({ summary: 'Soft Delete Wallet' })
  @ApiResponse(SwaggerApi.ApiSuccessResponse({}))

  // GUARD
  @UseGuards(AuthGuard, RolesGuard)
  @AccessRoles(Roles.SUPERADMIN, Roles.ADMIN, Roles.CUSTOMER)

  // ENDPOINT
  @Patch('delete/:id')
  @ApiBearerAuth()

  //SOFT DELETE
  softRemove(@Param('id') id: number) {
    return this.walletService.softDelete(+id);
  }

  // ================================ DELETE ================================

  // SWAGGER
  @ApiOperation({ summary: 'Delete Wallet' })
  @ApiResponse(SwaggerApi.ApiSuccessResponse({}))

  // GUARD
  @UseGuards(AuthGuard, RolesGuard)
  @AccessRoles(Roles.SUPERADMIN)

  // ENDPOINT
  @Delete(':id')
  @ApiBearerAuth()

  //DELETE
  remove(@Param('id') id: number) {
    return this.walletService.remove(+id);
  }
}

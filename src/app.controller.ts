import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { AppService } from './app.service';
import { UserService } from './user.service';
import { PrismaService } from './prisma.service';
import { Campaign, PotentialEarningDto } from './user.dto';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { ApiBody } from '@nestjs/swagger';

@Controller('api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('users')
  async getAllUsers(): Promise<User[]> {
    return this.userService.main11();
  }

  @Post('users')
  async createAllUsers(): Promise<void> {
    return this.userService.main12();
  }

  //Promise<Observable<AxiosResponse<Campaign[], any>>>
  @Get('campaign')
  getallCampaign() {
    return this.userService.allCampaign();
  }

  @Get('price/bitcoin')
  getBitcoinPrice() {
    return this.userService.getBitcoinPriceUSD();
  }

  @Get('facts/cats')
  getCatFacts() {
    return this.userService.getCatFacts();
  }

  @Get('facts/cats/deprecated')
  getCatFactsWithAxiosLib() {
    return this.userService.getCatFactsWithAxiosLib();
  }

  @Get('campaign/axios')
  getCampaignwithAxisLib(){
    return this.userService.getCampaignfromAxisLib();
  }

  @Post('potentialEarning')
  @ApiBody({ type: PotentialEarningDto })
  postPotentialEarning(@Body() potentialEarningDto: PotentialEarningDto){
    return this.userService.postPotentialEarningfromAxiosLib(potentialEarningDto);
  }
}

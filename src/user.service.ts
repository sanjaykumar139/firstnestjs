import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User, Prisma } from '@prisma/client';
import axios, { AxiosResponse } from 'axios';
import { Observable, map, catchError, lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Campaign, Cat, PotentialEarningDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  async main12() {
    await this.prisma.user.create({
      data: {
        //name: 'Rich',
        email: 'hello3@prisma.com',
        posts: {
          create: {
            title: 'My third post',
            //body: 'Lots of really interesting stuff',
            //slug: 'my-first-post',
          },
        },
      },
    });
  }

  async main11() {
    return await this.prisma.user.findMany();
  }

  //Promise<Observable<AxiosResponse<Campaign[], any>>>

  async findAllCampaign(): Promise<string> {
    const data1 = await this.httpService.get(
      'https://api-dev.adanidigitallabs.com/loyalty/Loyalty/CampaignList?name=0',
    );

    const str = JSON.stringify(data1);
    console.log(str);
    return str;
  }

  async getBitcoinPriceUSD() {
    return this.httpService
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .pipe(
        map((res) => res.data?.bpi),
        map((bpi) => bpi?.USD),
        map((usd) => {
          return usd?.rate;
        }),
      )
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      );
  }

  async allCampaign() {
    return this.httpService
      .get(
        'https://api-dev.adanidigitallabs.com/loyalty/Loyalty/CampaignList?name=0',
      )
      .pipe(map((res) => res.data?.data))
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      );
  }

  async getCatFacts() {
    const request = this.httpService
      .get('https://catfact.ninja/fact')
      .pipe(map((res) => res.data?.fact))
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      );

    const fact = await lastValueFrom(request);
    return {
      data: {
        fact,
      },
    };
  }

  //https://api-dev.adanidigitallabs.com/loyalty/Loyalty/PotentialEarning

  async getCatFactsWithAxiosLib() {
    const response = await axios({
      method: 'GET',
      url: 'https://catfact.ninja/fact',
    }).catch(() => {
      throw new ForbiddenException('API not available');
    });

    return {
      data: {
        fact: response.data?.fact,
      },
    };
  }

  async getCampaignfromAxisLib() {
    const response = await axios({
      method: 'GET',
      url: 'https://api-dev.adanidigitallabs.com/loyalty/Loyalty/CampaignList?name=0',
    }).catch(() => {
      throw new ForbiddenException('Not Avaialble');
    });

    return {
      data: {
        data: response.data?.data,
      },
    };
  }

  async postPotentialEarningfromAxiosLib(
    _potentialEarningDto: PotentialEarningDto,
  ) {
    const respone = await axios({
      method: 'POST',
      url: 'https://api-dev.adanidigitallabs.com/loyalty/Loyalty/PotentialEarning',
      data : _potentialEarningDto,
    }).catch((err) => {
      console.log(err);
      throw new ForbiddenException('Not Available');
    });

    return {
      data: {
        data: respone.data?.data,
      },
    };
  }
}

// const {data} = await axios.post('https://httpbin.org/post', {
//     firstName: 'Fred',
//     lastName: 'Flintstone',
//     orders: [1, 2, 3]
//   }, {
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     }
// })

import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { isLocal } from '@app/common/configs/env.config';

describe('envConfig', () => {
  beforeEach(async () => {
    await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: 'env/local.env',
        }),
      ],
      providers: [ConfigService],
    }).compile();
  });

  it('isLocal', () => {
    // console.log(result);
    expect(isLocal()).toEqual(false);
  });
});

import { Module } from '@nestjs/common'

import { AssetsController } from './assets.controller'
import { AssetsService } from './assets.service'

@Module({
  controllers: [AssetsController],
  providers: [AssetsService],
  exports: [],
})
export class AssetsModule {}

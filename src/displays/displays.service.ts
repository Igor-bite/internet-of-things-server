import { Injectable, NotImplementedException } from "@nestjs/common";
import { Display } from '@prisma/client';
import CreateDisplayDto from "./dto/createDisplay.dto";
import UpdateDisplayDto from "./dto/updateDisplay.dto";

@Injectable()
export default class DisplaysService {
  getAllDisplays(userId: number): Promise<Display[]> {
    throw new NotImplementedException();
  }

  getDisplayById(userId: number, displayId: number): Promise<Display> {
    throw new NotImplementedException();
  }

  addDisplay(userId: number, displayData: CreateDisplayDto): Promise<Display> {
    throw new NotImplementedException();
  }

  updateDisplay(userId: number, displayId: number, displayData: UpdateDisplayDto): Promise<Display> {
    throw new NotImplementedException();
  }

  removeDisplay(userId: number, displayId: number): Promise<Display> {
    throw new NotImplementedException();
  }
}
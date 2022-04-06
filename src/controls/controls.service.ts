import { Injectable, NotImplementedException } from "@nestjs/common";
import { Control } from '@prisma/client';
import CreateControlDto from "./dto/createControl.dto";
import UpdateControlDto from "./dto/updateControl.dto";

@Injectable()
export default class ControlsService {
  getAllControls(userId: number): Promise<Control[]> {
    throw new NotImplementedException();
  }

  getControlById(userId: number, controlId: number): Promise<Control> {
    throw new NotImplementedException();
  }

  addControl(userId: number, controlData: CreateControlDto): Promise<Control> {
    throw new NotImplementedException();
  }

  updateControl(userId: number, controlId: number, controlData: UpdateControlDto): Promise<Control> {
    throw new NotImplementedException();
  }

  removeControl(userId: number, controlId: number): Promise<Control> {
    throw new NotImplementedException();
  }
}
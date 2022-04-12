import { ExceptionFilter, Catch, ArgumentsHost, HttpException, NotFoundException, HttpStatus } from "@nestjs/common";
import { Request, Response } from 'express';
import { Prisma } from "@prisma/client";
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientValidationError
} from "@prisma/client/runtime";

@Catch(PrismaClientInitializationError, PrismaClientKnownRequestError, PrismaClientValidationError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    let message = "";
    let statusCode = 500;
    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      message = "PrismaClientKnownError: " + exception.message;
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    } else if (exception instanceof Prisma.PrismaClientInitializationError) {
      message = "PrismaClientInitializationError: Database credentials may be incorrect";
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    } else if (exception instanceof Prisma.PrismaClientValidationError) {
      message = "PrismaClientValidationError: " + exception.message;
      statusCode = HttpStatus.BAD_REQUEST;
    } else {
      message = exception.message;
    }

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    response
      .json({
        statusCode: statusCode,
        timestamp: new Date().toISOString(),
        path: request.url,
        requestMethod: request.method,
        message: message
      });
  }
}
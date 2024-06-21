import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { tap } from 'rxjs/operators';
  
  @Injectable()
  export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    context.getArgs().map(arg =>{
        if(arg ==="_parsedUrl") {
          console.log("arg==========",arg)
        }
        return arg;
      });

      const now = Date.now();
      return next
        .handle()
        .pipe(
          tap(() => console.log("")),
        );
    }
  }
  
import { validate as validateClass } from 'class-validator';
import { plainToClass } from 'class-transformer';
import utils from '../../utils/utils';

export interface Action {
  type: string;
  data?;
  message?: string;
}

export const AppTypes = {
  reset: 'app.reset',
};

export function createAction(type: string, data?, message?: string): Action {
  return {
    type,
    data,
    message,
  };
}

export async function validate(
  data: any,
  className: any,
  fieldPrefix = '',
): Promise<{ errors: any; data: any }> {
  const addDot = !!fieldPrefix;
  const errors = {};
  const dataClass = plainToClass(className, data, {
    excludeExtraneousValues: true,
  });
  const validatedErrors = await validateClass(dataClass);
  if (validatedErrors.length > 0) {
    validatedErrors.forEach((item) => {
      let message: string | undefined;
      for (const key in item.constraints) {
        if (item.constraints[key]) {
          message = utils.toUpperCaseFirstLetter(item.constraints[key]);
        }
      }
      errors[
        `${fieldPrefix}${addDot ? '.' + item.property : item.property}Error`
      ] = message;
    });
  }
  return { errors, data: dataClass };
}

export const commonAction = {
  validate,
  createAction,
};

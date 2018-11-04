'use strict';

const NotValid = require(`../error/not-valid`);

const validateSettings = {
  TITLE_MIN_LENGTH: 30,
  TITLE_MAX_LENGTH: 140,
  MIN_PRICE: 1,
  MAX_PRICE: 100000,
  MAX_ADDRESS_LENGTH: 100,
  MIN_ROOMS: 1,
  MAX_ROOMS: 1000,
  TYPES: [
    `flat`,
    `house`,
    `bungalo`,
    `palace`
  ]
};

const requiredError = (type) => `${type} - обязательный пункт для заполнения`;

const isInvalidAddress = (address) => {
  let invalid = false;

  address = address.split(`, `);
  if (address.length !== 2) {
    return true;
  }
  address.forEach((it) => {
    if (it.length > validateSettings.MAX_ADDRESS_LENGTH) {
      invalid = true;
    }
  });
  return invalid;
};

const isInvalidRegistration = (registration) => {
  let invalid = false;
  registration = registration.split(`:`);

  if (registration.length !== 2) {
    return true;
  }

  const HOURS_IN_DAY = 12;
  const MINUTES_IN_HOUR = 59;

  if (!(+registration[0] <= HOURS_IN_DAY && +registration[0] >= 0)) {
    invalid = true;
  }

  if (!(+registration[1] <= MINUTES_IN_HOUR && +registration[1] >= 0)) {
    invalid = true;
  }
  return invalid;
};

const validate = (data) => {
  const errors = [];

  if (!data.title) {
    errors.push(requiredError(`title`));
  } else if (data.title.length < validateSettings.TITLE_MIN_LENGTH || data.title.length > validateSettings.TITLE_MAX_LENGTH) {
    errors.push(`Длинна заголовка должна быть от 30 до 140 символов`);
  }

  if (!data.type) {
    errors.push(requiredError(`type`));
  } else if (!validateSettings.TYPES.includes(data.type)) {
    errors.push(`Неизвестный тип ${data.type}`);
  }

  if (typeof data.price === `undefined`) {
    errors.push(requiredError(`price`));
  } else if (data.price < validateSettings.MIN_PRICE || data.price > validateSettings.MAX_PRICE) {
    errors.push(`Цена должна быть в диапозоне от 1 до 100 000`);
  }

  if (!data.address) {
    errors.push(requiredError(`address`));
  } else if (isInvalidAddress(data.address)) {
    errors.push(`Адрес должен быть в формате координат: x, y`);
  }

  if (!data.checkin) {
    errors.push(requiredError(`checkin`));
  } else if (isInvalidRegistration(data.checkin)) {
    errors.push(`Дата въезда должна быть в формате HH:mm`);
  }

  if (!data.checkout) {
    errors.push(requiredError(`checkout`));
  } else if (isInvalidRegistration(data.checkout)) {
    errors.push(`Дата выезда должна быть в формате HH:mm`);
  }

  if (typeof data.rooms === `undefined`) {
    errors.push(requiredError(`rooms`));
  } else if (data.rooms < validateSettings.MIN_ROOMS || data.rooms > validateSettings.MAX_ROOMS) {
    errors.push(`Количество комнат должно быть от 1 до 1000`);
  }


  if (errors.length) {
    throw new NotValid(errors);
  }
  return data;
};

module.exports = validate;

import { UserInfo } from '../models/user';
import { Country } from '../models/country';
import { Drc20Token, Drc10Token, Tx } from '../redux/transaction';

const saveAssets = (drc10Token: Drc10Token[] | null) => {
  try {
    if (!drc10Token) {
      localStorage.removeItem('app-drc10Token');
      return;
    }
    localStorage.setItem('app-drc10Token', JSON.stringify(drc10Token));
  } catch (err) {
    console.log('saveAssets error', err);
  }
};

const loadAssets = () => {
  try {
    const drc10Token = localStorage.getItem('app-drc10Token');
    if (!drc10Token) {
      return null;
    }

    return drc10Token;
  } catch (err) {
    console.log('loadAssets error', err);
  }
  return null;
};

const saveDrc20Token = (drc20Token: Drc20Token[] | null) => {
  try {
    if (!drc20Token) {
      localStorage.removeItem('app-drc20Token');
      return;
    }
    localStorage.setItem('app-drc20Token', JSON.stringify(drc20Token));
  } catch (err) {
    console.log('saveDrc20Token error', err);
  }
};

const loadDrc20Token = () => {
  try {
    const drc20Token = localStorage.getItem('app-drc20Token');
    if (!drc20Token) {
      return null;
    }

    return drc20Token;
  } catch (err) {
    console.log('loadDrc20Token error', err);
  }
  return null;
};

const saveTxs = (txs: Tx[] | null) => {
  try {
    if (!txs) {
      localStorage.removeItem('app-txs');
      return;
    }
    localStorage.setItem('app-txs', JSON.stringify(txs));
  } catch (err) {
    console.log('saveTxs error', err);
  }
};

const loadTxs = () => {
  try {
    const txs = localStorage.getItem('app-txs');
    if (!txs) {
      return null;
    }

    return txs;
  } catch (err) {
    console.log('loadTxs error', err);
  }
  return null;
};

const saveConnectKey = (key: string | null) => {
  try {
    if (!key) {
      localStorage.removeItem('app-connect-key');
      return;
    }
    localStorage.setItem('app-connect-key', key);
  } catch (err) {
    console.log('saveConnectKey error', err);
  }
};

const loadConnectKey = () => {
  try {
    const key = localStorage.getItem('app-connect-key');
    if (!key) {
      return null;
    }

    return key;
  } catch (err) {
    console.log('loadConnectKey error', err);
  }
  return null;
};

const saveUser = (user: UserInfo | null, access_token: string | null): void => {
  try {
    if (!user || !access_token) {
      localStorage.removeItem('app-user');
      localStorage.removeItem('app-token');
      return;
    }
    localStorage.setItem('app-user', JSON.stringify(user));
    localStorage.setItem('app-token', access_token);
  } catch (err) {
    console.log('Save user error', err);
  }
};

const loadUser = (): {
  user: UserInfo;
  access_token: string;
} | null => {
  try {
    const userData = localStorage.getItem('app-user');
    const token = localStorage.getItem('app-token');
    if (!userData || !token) {
      return null;
    }

    return {
      user: JSON.parse(userData) as UserInfo,
      access_token: token,
    };
  } catch (err) {
    console.log('Save user error', err);
  }
  return null;
};

const saveCountry = (country: Country | null): void => {
  try {
    if (!country) {
      localStorage.removeItem('app-country');
      return;
    }
    localStorage.setItem('app-country', JSON.stringify(country));
  } catch (err) {
    console.log('Save country error', err);
  }
};

const loadCountry = (): Country | null => {
  try {
    const country = localStorage.getItem('app-country');
    if (!country) {
      return null;
    }

    return JSON.parse(country);
  } catch (err) {
    console.log('Load country error', err);
  }
  return null;
};

const setHideNotification = (version: number): void => {
  localStorage.setItem('hide-notification-version', version + '');
};

const getHideNotification = (): number | null => {
  const value = localStorage.getItem('hide-notification-version');
  if (typeof value === 'string') {
    const valueAsString = parseInt(value);
    if (valueAsString >= 0) {
      return valueAsString;
    }
  }
  return null;
};

export const storage = {
  saveTxs,
  loadTxs,
  saveConnectKey,
  loadConnectKey,
  saveUser,
  loadUser,
  saveCountry,
  loadCountry,
  setHideNotification,
  getHideNotification,
  saveAssets,
  loadAssets,
  saveDrc20Token,
  loadDrc20Token,
};

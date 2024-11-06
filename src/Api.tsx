const ROOT = import.meta.env.VITE_ENDPOINT
const TOKEN = import.meta.env.VITE_TOKEN

export const fetchManufacturers = async () => {
    const res = await fetch(
      `${ROOT}/api/manufacturers`,
      {
        headers: {
          "x-authentication-token": TOKEN,
        },
      }
    );
    return res.json();
  };

  export const fetchServices = async () => {
    const res = await fetch(
      `${ROOT}/api/services`,
      {
        headers: {
          "x-authentication-token": TOKEN,
        },
      }
    );
    return res.json();
  };

  export const validatePromoCode = async (code: string) => {
    const res = await fetch(
      `${ROOT}/api/validate-promo-code/${code}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "x-authentication-token": TOKEN,
        },
      }
    );
    return res.json();
  };

  export const postContact = async (data: {
    manufacturerId: string;
    serviceIds: string[];
    promoCode: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    note: string;
  }) => {
    const res = await fetch(
      `${ROOT}/api/contact`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "x-authentication-token": TOKEN,
        },
        body: JSON.stringify(data),
      }
    );
    return res.json();
  };

type Location = {
  name: string;
  state: {
    name: string;
    country: {
      name: string;
    };
  };
};

export type GetLocationResponse = {
    success: boolean;
    message: string;
    data: Location;
    error: Record<string, null>;
};
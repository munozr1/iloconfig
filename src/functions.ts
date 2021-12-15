export function authHeader(u: string, p: string) {
  return "Basic " + new Buffer(u + ":" + p).toString("base64");
}

export function pretty(obj: any) {
  return JSON.stringify(obj, null, 2);
}

export const timeout = (ms: any) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
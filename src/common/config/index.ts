export const Paths = {
  uploadFile: "/RSP/File/UploadRSP"
};

export const Deploy = {
  live: "http://localhost:3003/",
  testpool: "http://localhost:3003/",
  dev: "/",
  development: "/",
  stage: "https://client-smsonedev.sms-assist.com/"
} as { [key: string]: string };

export const RES_PATH = process.env.RES_PATH;

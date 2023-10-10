export enum ApiCodeResponse {
  SUCCESS = 'api.succes.resp',
  BAD_REQUEST = 'api.result.bad.req',
  INTERNAL_ERROR = 'api.result.error',
  UNAUTHORIZED = 'api.result.unauthorized',
  TOKEN_INVALID = 'token.invalid.error',
  TOKEN_NOT_FOUND = 'token.missing.error',
  ACCOUNT_NOT_FOUND = 'account.notfound.error',
  ACCOUNT_WRONG_PWD = 'account.wrong.password.error',
}

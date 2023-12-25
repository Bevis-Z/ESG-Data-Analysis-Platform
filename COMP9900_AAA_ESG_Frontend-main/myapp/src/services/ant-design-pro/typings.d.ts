declare namespace API {
  type applyFrameworkReportUsingPOSTParams = {
    /** companyName */
    companyName: string;
  };

  type deleteFrameworkUsingPOSTParams = {
    /** frameworkId */
    frameworkId: number;
  };

  type editAndApplyFrameworkUsingPOSTParams = {
    /** companyName */
    companyName: string;
  };

  type FrameworkDTO = {
    frameworkId: number;
    frameworkName: string;
    score: number;
    subElementDTOList: SubElementDTO[];
    userId: number;
    isUserDefined: boolean;
  };

  type getFrameworkByIdUsingGET1Params = {
    /** id */
    id: number;
  };

  type getReportByIdUsingGETParams = {
    /** reportId */
    reportId: number;
  };

  type IndicatorDTO = {
    eleWeight: number;
    indicatorId: number;
    indicatorName: string;
    iptValue: number;
    score: number;
    tertiaryElementId: number;
  };

  type insertFrameworkReportUsingPOSTParams = {
    /** companyName */
    companyName: string;
  };

  type ModelAndView = {
    empty?: boolean;
    model?: Record<string, any>;
    modelMap?: Record<string, any>;
    reference?: boolean;
    status?:
      | '100 CONTINUE'
      | '101 SWITCHING_PROTOCOLS'
      | '102 PROCESSING'
      | '103 CHECKPOINT'
      | '200 OK'
      | '201 CREATED'
      | '202 ACCEPTED'
      | '203 NON_AUTHORITATIVE_INFORMATION'
      | '204 NO_CONTENT'
      | '205 RESET_CONTENT'
      | '206 PARTIAL_CONTENT'
      | '207 MULTI_STATUS'
      | '208 ALREADY_REPORTED'
      | '226 IM_USED'
      | '300 MULTIPLE_CHOICES'
      | '301 MOVED_PERMANENTLY'
      | '302 FOUND'
      | '302 MOVED_TEMPORARILY'
      | '303 SEE_OTHER'
      | '304 NOT_MODIFIED'
      | '305 USE_PROXY'
      | '307 TEMPORARY_REDIRECT'
      | '308 PERMANENT_REDIRECT'
      | '400 BAD_REQUEST'
      | '401 UNAUTHORIZED'
      | '402 PAYMENT_REQUIRED'
      | '403 FORBIDDEN'
      | '404 NOT_FOUND'
      | '405 METHOD_NOT_ALLOWED'
      | '406 NOT_ACCEPTABLE'
      | '407 PROXY_AUTHENTICATION_REQUIRED'
      | '408 REQUEST_TIMEOUT'
      | '409 CONFLICT'
      | '410 GONE'
      | '411 LENGTH_REQUIRED'
      | '412 PRECONDITION_FAILED'
      | '413 PAYLOAD_TOO_LARGE'
      | '413 REQUEST_ENTITY_TOO_LARGE'
      | '414 URI_TOO_LONG'
      | '414 REQUEST_URI_TOO_LONG'
      | '415 UNSUPPORTED_MEDIA_TYPE'
      | '416 REQUESTED_RANGE_NOT_SATISFIABLE'
      | '417 EXPECTATION_FAILED'
      | '418 I_AM_A_TEAPOT'
      | '419 INSUFFICIENT_SPACE_ON_RESOURCE'
      | '420 METHOD_FAILURE'
      | '421 DESTINATION_LOCKED'
      | '422 UNPROCESSABLE_ENTITY'
      | '423 LOCKED'
      | '424 FAILED_DEPENDENCY'
      | '425 TOO_EARLY'
      | '426 UPGRADE_REQUIRED'
      | '428 PRECONDITION_REQUIRED'
      | '429 TOO_MANY_REQUESTS'
      | '431 REQUEST_HEADER_FIELDS_TOO_LARGE'
      | '451 UNAVAILABLE_FOR_LEGAL_REASONS'
      | '500 INTERNAL_SERVER_ERROR'
      | '501 NOT_IMPLEMENTED'
      | '502 BAD_GATEWAY'
      | '503 SERVICE_UNAVAILABLE'
      | '504 GATEWAY_TIMEOUT'
      | '505 HTTP_VERSION_NOT_SUPPORTED'
      | '506 VARIANT_ALSO_NEGOTIATES'
      | '507 INSUFFICIENT_STORAGE'
      | '508 LOOP_DETECTED'
      | '509 BANDWIDTH_LIMIT_EXCEEDED'
      | '510 NOT_EXTENDED'
      | '511 NETWORK_AUTHENTICATION_REQUIRED';
    view?: View;
    viewName?: string;
  };

  type ReportDTO = {
    companyName: string;
    frameworkDTO: FrameworkDTO;
    userId: number;
  };

  type SubElementDTO = {
    eleWeight: number;
    frameworkId: number;
    score: number;
    subElementId: number;
    subElementName: string;
    tertiaryElementDTOList: TertiaryElementDTO[];
  };

  type TertiaryElementDTO = {
    eleWeight: number;
    indicatorDTOList: IndicatorDTO[];
    score: number;
    subElementId: number;
    tertiaryElementId: number;
    tertiaryElementName: string;
  };

  type updatePasswordUsingPOSTParams = {
    /** newPassword */
    newPassword: string;
  };

  type User = {
    email?: string;
    nickname?: string;
    password?: string;
    userId?: number;
  };

  type UserDTO = {
    email?: string;
    nickname?: string;
    userId?: number;
  };

  type verifyCodeUsingPOSTParams = {
    /** code */
    code: string;
    /** email */
    email: string;
    /** newPassword */
    newPassword: string;
  };

  type verifyEmailUsingPOSTParams = {
    /** email */
    email: string;
  };

  type verifyUserUsingPOSTParams = {
    /** password */
    password: string;
  };

  type View = {
    contentType?: string;
  };
}

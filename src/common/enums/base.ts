export enum Type {
  Number = 'Number',
  String = 'String',
  Boolean = 'Boolean',
  Object = 'Object',
  Array = 'Array',
  Function = 'Function'
}

export enum HttpStatusType {
  Continue = 100,
  SwitchingProtocol = 101,
  Processing = 102,
  OK = 200,
  Created = 201,
  Accepted = 202,
  NonAuthoritativeInformation = 203,
  NoContent = 204,
  ResetContent = 205,
  PartialContent = 206,
  MultipleChoice = 300,
  MovedPermanently = 301,
  Found = 302,
  SeeOther = 303,
  NotModified = 304,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalServerError = 500
}

export enum ContentType {
  Image = 1,
  Word = 2,
  Excel = 3,
  Pdf = 4,
  Video = 5,
  Message = 6,
  Email = 7,
  Ppt = 8,
  Audio = 9,
  Unknow = 10
}

export enum UserBehaviorType {
  PM = 1,
  CLIENT = 2,
  AFFILIATE = 3
}

export enum WOStatus {
  PendingSchedule = 0,
  PendingDispatch = 1,
  PendingVendorAcceptance = 2,
  Scheduled = 3,
  OnSite = 4,
  PendingVendorQuote = 5,
  VendorQuoteSubmitted = 6,
  PendingApproval = 7,
  QuoteRejected = 8,
  QuoteApproved = 9,
  ReturnTripNeeded = 10,
  WorkCompletePendingVendorInvoice = 11,
  VendorInvoiceReceived = 12,
  PendingInvoiceApproval = 13,
  VendorInvoiceRejected = 14,
  CompletedandInvoiced = 15,
  VendorPaid = 16,
  Closed = 17,
  ResolvedWithoutInvoice = 18,
  ResolvedWithoutDispatch = 19,
  Cancelled = 20,
  WorkOrderAvoidance = 21,
  PendingSelfHelpApproval = 22,
  SelfHelpApproved = 23,
  Deferred = 24,
  LandlordResolved = 25,
  VendorQuoteRejected = 26,
  SelfHelpRejected = 27,
  BilledInProgress = 28,
  Billed = 29,
  Missed = 30,
  Rescheduled = 31,
  Completed = 32,
  PaytoAffiliate = 33,
  Expired = 34,
  Void = 35,
  LogRefusal = 36,
  ServicePool = 37,
  PendingDispatchRFI = 38
}

export enum PredefinedClient {
  CAH = 26,
  WPH = 26,
  HPA = 69,
  RentersWarehouse = 1085,
  Tricon = 1086,
  GPS = 1103,
  IH = 1200
}

export enum PredefinedWoType {
  StopFoodOrder = 22,
  WorkOrder = 23,
  OtherWO = 53,
  InHouseTechnician = 30,
}

export enum RatingState {
  Detail = 1,
  Success = 2,
  Complete = 3,
  Fail = 4,
}

export enum LinkObjectType {
  RecurrentWo = 1,
  ReactiveWo = 2,
  Call = 3
}

export enum WorkCompletedStatus {
  Yes = 1,
  No = 2,
  FurtherConfirm = 3,
  ReadyforBilling = 4
}

export enum ProCareSupportBundleType {
  Unsupported = 1,
  PullIn = 2,
  PushOut = 3,
  PullInOrPushOut = 4
}

export enum BundleDataDirection {
  Normal = 1,
  Pull = 2,
  Push = 3
}

export enum PredefinePriority {
  Response2H = 1,
  Response4H = 2,
  Response24H = 3,
  Response48H = 4,
  Response7D = 5,
  Response14D = 6,
  NextAvailableService = 7,
  RoutineExpeditedService = 8,
  RoutineStandardService = 9,
  Emergency = 10,
  Expedited = 11,
  TuneUp = 12,
  ResidentResponsibility = 13,
  Critical = 20,
  FeelsLike = 30000 // Virtual  FeelsLikePriorityId
}

export enum PredefinedServiceCategory {
  AirConditioningHeating = 1,
}

export enum QuestionType {
  Radio = 1,
  Input = 2,
  TextArea = 3,
  Select = 4,
  LimitSelect = 6,
  Label = 5
}

export enum PredefinedProcareProjectWOType {
  ServiceCodeId = 8924,
  ServiceTypeId = 1337,
  ServiceCategoryId = 96
}

export enum FileType {
  Image,
  Unknown,
  Word,
  Excel,
  Pdf,
  Video,
  Msg,
  Mp3
}

export enum PredefinedClientName {
  "Invitation Homes" = 1200,
  "Waypoint Homes" = 26,
  "Pathlight Property Management" = 69,
  "Renters Warehouse" = 1085,
  "Tricon" = 1086,
  "GOAL Properties" = 1103
}

export enum SessionKey {
  ScheduleDate = 'ScheduleDate',
  Attachments = 'Attachments',
  CommonQuestion = 'CommonQuestion',
  ServiceCodeQuestion = 'ServiceCodeQuestion',
  ServiceIssue = 'serviceIssue',
  AccessInformation = 'AccessInformation',
  ReactiveWo = 'ReactiveWo',
  AutoScheduleModel = 'AutoScheduleModel',
  SliceScheduleListAllSumZero = 'SliceScheduleListAllSumZero',
  SelectedSchedule = 'SelectedSchedule',
}

export enum AutoScheduleControl {
  NoAvailable = 'NoAvailable',
  Disable = 'Disable',
  "Tricon" = 1086
}

export enum LibraryTypeId {
  Video = 2,
  Guide = 1
}

export enum ClientUserTrackingCode {
  ReactiveWOSchedule = 'WCLRAW018361507',
  ReactiveWOReschedule =  'WCLRAW102361507',
  ScheduleCalendarReschedule = 'WCL026102361507',
  ProCareSchedule = 'WCL027105361507',
  RspProCareSchedule = 'WCL023106249509',
  RspProCareReschedule = 'WCL023106241509'
}
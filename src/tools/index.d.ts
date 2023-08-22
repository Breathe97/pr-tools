// pr-func.js
export declare function uuid(len?: number, radix?: number): string

// pr-md5.js
export declare function md5(str?: string): string

// pr-reg-test.js
export declare namespace regTest {
  function mobile(str: string | number): boolean
  function email(str: string | number): boolean
  function url(str: string | number): boolean
  function date(str: string | number): boolean
  function dateISO(str: string | number): boolean
  function number(str: string | number): boolean
  function digits(str: string | number): boolean
  function idCard(str: string | number): boolean
  function carNo(str: string | number): boolean
  function amount(str: string | number): boolean
  function chinese(str: string | number): boolean
  function letter(str: string | number): boolean
  function enOrNum(str: string | number): boolean
  function landline(str: string | number): boolean
}

// pr-transfer.js
export declare function timeFormat(dateTime: string | number, format?: string): string
export declare function timeFrom(timestamp: string | number, format?: string): string
export declare function ab2hex(buffer: ArrayBuffer): string
export declare function hex2ab(str: string): string
export declare function hex2str(hexCharCodeStr: string): string
export declare function line2hump(str: string): string
export declare function hump2line(str: string): string
export declare function delSpaces(str: string): string

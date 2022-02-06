export declare type iLOError = {
    message: string | ErrorMessages;
    resolution?: string | undefined;
};
export declare const enum ErrorMessages {
    MissingFlags = "Error: missing flags.",
    MissingArgs = "Error: missing an argument in the initial ilo command",
    InvalidFlags = "Error: invalid flag"
}
/**
 *
 * @param err return value of a function
 * @returns true if error is of type iLOError, false if return type is not of iLOError
 */
export declare function checkError(err: any | iLOError): err is iLOError;

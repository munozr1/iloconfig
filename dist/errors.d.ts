export declare type iLOError = {
    message: string | ErrorMessages;
    resolution?: string | undefined;
};
export declare const enum ErrorMessages {
    MissingFlags = "Error: missing flags.",
    MissingArgs = "Error: missing an argument in the initial ilo command",
    InvalidFlags = "Error: invalid flag",
    MissingServerFile = "Error: missing file or not a csv file",
    InvalidFile = "Error: could not find or open csv file",
    TooManyFiles = "Error: too many csv files passed in",
    TooManyFlagArguments = "Error: too many flag arguments have been passed in"
}
/**
 *
 * @param err return value of a function
 * @returns true if error is of type iLOError, false if return type is not of iLOError
 */
export declare function checkError(err: any | iLOError): err is iLOError;

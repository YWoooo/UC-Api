export interface ResInterface {
    code: number;
    msg?: string;
}

/**
 * code
 *  1: Request success. All good.
 *  -1: Request fail Don't know why.
 * -20: Wrong format of param.
 * -21: Duplicated.
 */

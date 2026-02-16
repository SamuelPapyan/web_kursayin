import { responseStatus } from "../enums/response.enum";
import { IResponse } from "../interfaces/response.interface";

class ResponseService {
    createResponse(
        success: boolean,
        data: any,
        message: string,
    ): IResponse {
        return {
            success,
            data,
            message,
            code: responseStatus.OK
        }
    }
}

export default new ResponseService();
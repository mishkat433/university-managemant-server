import { SortOrder } from "mongoose";

type IOptions = {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: SortOrder;
};

type IPaginationNextPrevResult = {
    prevPage: number | null,
    nextPages: number | null,
}

const paginationNextPrevHelper = (options: IOptions, count: number): IPaginationNextPrevResult => {

    const page = Number(options.page || 1)
    const limit = Number(options.limit || 10)

    const prevPage = page - 1 > 0 ? page - 1 : null

    const nextPages = page + 1 <= Math.ceil(count / limit) ? page + 1 : null

    return {
        prevPage,
        nextPages
    }

}


export default paginationNextPrevHelper
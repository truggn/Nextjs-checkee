import dbConnect from '@/utils/dbConnect';
import Organization, { OrganizationDocument } from '@/models/Organization';
import type { CustomerHandlers } from '../export';


// Return all employees info
const exportCustomer: CustomerHandlers['exportDataCustomer'] = async ({
    res,
    req,
    body,
    // config,
}) => {
    let result: { data?: OrganizationDocument[] } = {}

    try {
        await dbConnect()
        result.data = await Organization.find()
            .where({ isDeleted: false })
            .select('address bank email fax name_customer phone taxCode -_id')
            .sort({
                createdAt: "desc",
            });

    } catch (error) {
        return res.status(500).json({
            data: null,
            errors: [{ message: error.message, code: "err002" }],
        });
    }

    return res.status(200).json({ data: result.data ?? null })
}


export default exportCustomer
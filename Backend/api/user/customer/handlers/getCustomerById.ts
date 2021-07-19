import dbConnect from '@/utils/dbConnect';
import Organization, { OrganizationDocument } from '@/models/Organization';
import type { CustomerHandlers } from 'Backend/api/customer/indexId';

// Return all employees info
const getCustomerById: CustomerHandlers['getCustomerById'] = async ({
    res,
    req,
    body,
    // config,
}) => {
    await dbConnect();
    let result: { data?: OrganizationDocument } = {}

    try {
        const foundOrg = await Organization.findById(req.query.id)
            .where({ isDeleted: false })

        if (!foundOrg) {
            return res.status(400).json({
                data: null,
                errors: [{ message: "không tìm thấy SystemPage" }]
            })
        } else {
            result.data = foundOrg
            
            return res.status(200).json({
                data: result.data,
            })
        }
    } catch (error) {
        return res.status(500).json({
            data: null,
            errors: [{ message: error.message }]
        })
    }
}


export default getCustomerById
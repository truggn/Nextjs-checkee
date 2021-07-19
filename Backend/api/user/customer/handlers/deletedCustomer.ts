import dbConnect from '@/utils/dbConnect';
import Organization, { OrganizationDocument } from '@/models/Organization';
import type { CustomerHandlers } from 'Backend/api/customer/indexId';

// Return all employees info
const deleteCustomer: CustomerHandlers['deleteCustomer'] = async ({
    res,
    req,
    body,
}) => {
    try {
        await dbConnect()

        await Organization.findOneAndUpdate({
            _id: req.query.id
        }, { isDeleted: true }, { new: true })

        const chkContract = await Organization.findOne({
            _id: req.query.id
        })

        if (chkContract && chkContract.isDeleted) {
            return res.status(200).json({
                data: null,
                errors: [{ message: "xóa thành công" }]
            })
        } else {
            return res.status(400).json({
                data: null,
                errors: [{ message: "xóa không thành công" }]
            })
        }
    } catch (error) {
        return res.status(500).json({
            data: null,
            errors: [{ message: error.message }],
        });
    }
}

export default deleteCustomer
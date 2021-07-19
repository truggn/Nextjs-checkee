import dbConnect from '@/utils/dbConnect';
import type { OrganizationHandlers } from '..';
import Organization from '@/models/Organization';


const getOrganization: OrganizationHandlers['getOrganization'] = async ({
    res,
    req,
    body
}) => {

    try {
        await dbConnect()

        const _data =await Organization.find({ 
           
        })
       
        return res.status(200).json({
            data: _data,
        });
       
    } catch (error) {
        return res.status(500).json({
            data: null,
            errors: [{ message: error.message }],
        });
    }
}

export default getOrganization
import dbConnect from '@/utils/dbConnect';
import type { OrganizationMembersHandlers } from '..';
import OrganizationMembers from '@/models/OrganizationMembers';


const getOrganizationMembers: OrganizationMembersHandlers['getOrganizationMembers'] = async ({
    res,
    req,
    body
}) => {

    try {
        await dbConnect()

        const _data =await OrganizationMembers.find({ 
           
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

export default getOrganizationMembers
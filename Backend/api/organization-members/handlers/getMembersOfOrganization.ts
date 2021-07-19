import dbConnect from '@/utils/dbConnect';
import type { OrganizationMembersHandlers } from '../getMembersOfOrganization';
import OrganizationMembers from '@/models/OrganizationMembers';
import User from '@/models/User';


// Return all Participants info
const getMembersOfOrganization: OrganizationMembersHandlers['getMembersOfOrganization'] = async ({
  res,
  req,
  // body,
  // config,
}) => {  
  try {
    await dbConnect()

    const _data =await OrganizationMembers.find({ 
      organizationId: req.query.organizationId
    }, '')
    .populate({
        path: 'userId',
        select: 'email',
        model: User
    });

   
    if (!_data || _data === null) {
        return res.status(400).json({
            data: null,
            errors: [{message: 'OrganizationMembers không tồn tại'}],
        });
    } 

    return res.status(200).json({
        data: _data,
    });
    
  } catch (error) {
    return res.status(400).json({
      data: null,
      errors: [{message: error.message, code: "err002"}],
    });
  }

}

export default getMembersOfOrganization
import dbConnect from '@/utils/dbConnect';
import type { OrganizationMembersHandlers } from '../getMember';
import OrganizationMembers from '@/models/OrganizationMembers';
import Organization from '@/models/Organization';


// Return all Participants info
const getMember: OrganizationMembersHandlers['getMember'] = async ({
  res,
  req,
  // body,
  // config,
}) => {  
  try {
    await dbConnect()

    const _data =await OrganizationMembers.find({ 
      userId: req.query.userId
    }, '')
    .populate({
        path: 'organizationId',
        // select: 'email',
        model: Organization
    });

   
    if (!_data || _data === null) {
        return res.status(400).json({
            data: null,
            errors: [{message: 'User không xác định.'}],
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

export default getMember
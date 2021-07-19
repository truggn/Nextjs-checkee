 
import dbConnect from '@/utils/dbConnect';
import SystemUserTypePage from '@/models/SystemUserTypePage';
import type { SystemUserTypePageDocument } from '@/models/SystemUserTypePage';
import type { SystemUserTypePageHandlers } from 'Backend/api/systemusertypepage/aceessRight';
import SystemPage from '@/models/SystemPage';
import User from '@/models/User';
const aceessRight : SystemUserTypePageHandlers['aceessRight'] = async ({
  res,
  req,
  body,
}) => {
  let result: { data?: SystemUserTypePageDocument } = {}
  try {
    await dbConnect()
    const dataUserType = await User.findOne({
        _id: body.userId
    })
    const chkPage = await SystemPage.find({
        actionName : body.actionName,
        controllerName:body.controllerName
    })
    const arr: Array<SystemUserTypePageDocument[]> = [];
    let data = await Promise.all(chkPage.map(async element=>{
        let chkRight = await SystemUserTypePage.find({
            userTypeId : dataUserType.userTypeId,
            pageId:element.id
        })
        if(chkRight.length>0){
            arr.push(chkRight)
        }
    }))
    if(dataUserType.name === "Admin"){
        return res.status(200).json({
            data : null,
            errors:[{message:"truy cập thành công"}]
        })
    }
    else if(arr.length>0){
        return res.status(200).json({
            data : null,
            errors:[{message:"truy cập thành công"}]
        })
    }else{
        return res.status(400).json({
            data : null,
            errors:[{message:"truy cập ko thành công"}]
        })
    }
  } catch (error) {
    return res.status(500).json({
      data: null,
      errors: [{message: error.message}],
    });
  }

}

export default aceessRight
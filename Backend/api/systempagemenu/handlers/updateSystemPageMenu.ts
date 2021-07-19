import dbConnect from '@/utils/dbConnect';
import SystemPageMenu, { SystemPageMenuDocument } from '@/models/SystemPageMenu';
import type { SystemPageMenuHandlers } from 'Backend/api/systempagemenu/indexId';
import SystemPage from '@/models/SystemPage';
const updateSystemPageMenu : SystemPageMenuHandlers['updateSystemPageMenu']= async ({
    res,
    req,
    body
}) =>{
    let result: { data: SystemPageMenuDocument | null } = { data: null }
    try{
        await dbConnect();
        if(body.pageId){
            const chkPage = await SystemPage.findOne({
                _id : body.pageId
            })
            if(!chkPage){
                return res.status(400).json({
                    data: null,
                    errors:[{message:"ko tồn tại page"}]
                })
            }
        }
        // if(body.parentId ===' '||body.parentId==='0'){
        //     result.data = await SystemPageMenu.findOneAndUpdate({
        //         _id:req.query.id,
        //         isDeleted:false,
        //     },{
        //         $set:{name : body.name,
        //             url : body.url,
        //             clas : body.clas,
        //             orderNo: body.orderNo,
        //             isVisible : body.isVisible,
        //             pageId : body.pageId,
        //             parentId : body.parentId,
        //             isDashBoard: body.isDashBoard,
        //             updatedBy : body.updatedBy
        //         }
                
        //     },{new:true})
            
        // }
        if(body.parentId && body.parentId !== ' '&&body.parentId !== '0'){
            const chkPage = await SystemPageMenu.findOne({
                _id : body.parentId
            }) 
            if(!chkPage){
                return res.status(400).json({
                    data: null,
                    errors:[{message:"ko tồn tại page"}]
                })
            }
        }
        const chkSystemPage = await SystemPageMenu.findOne({
            _id : req.query.id,
            isDeleted:false
        })
        if(!chkSystemPage){
            return res.status(400).json({
                data: null,
                errors:[{message:"ko tìm thấy systemPage"}]
            })
        }
        result.data = await SystemPageMenu.findOneAndUpdate({
            _id:req.query.id,
            isDeleted:false,
        },{
            $set:{name : body.name,
                url : body.url,
                clas : body.clas,
                orderNo: body.orderNo,
                isVisible : body.isVisible,
                pageId : body.pageId,
                parentId : body.parentId,
                isDashBoard: body.isDashBoard,
                updatedBy : body.updatedBy
            }
            
        },{new:true})
        if(!result.data){
            return res.status(400).json({
                data: null,
                errors:[{message:"cập nhật ko thành công"}]
            })
        }else{
            return res.status(200).json({
                data : result.data,
                errors:[{message:" cập nhật thành công"}]
            })
        }


    }catch (error) {
    return res.status(500).json({
      data: null,
      errors: [{message: error.message}],
    });
  }
}
export default updateSystemPageMenu
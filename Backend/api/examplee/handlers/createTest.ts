 
import dbConnect from '@/utils/dbConnect';
import Test,{ TestDocument } from '@/models/Test';
import Example,{ExampleDocument} from '@/models/Example';
import type { TestHandlers } from '..';

const createTest : TestHandlers['createTest'] = async ({
  res,
  req,
  body,
}) => {
  await dbConnect()
  let result: { data?: TestDocument[] } = {}
  const session = await Test.startSession();
  session.startTransaction();
  
  try {
    

    // const session = await Test.startSession();
    const createData =await Test.create([body],{ session: session })
    const createExample = await Example.create([{name : body.name , age: body.age , createBy:body.createBy}],{ session: session })
    console.log(createData)
    console.log(createExample)
    await session.commitTransaction();
    
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({
      data: null,
      errors: [{message: error.message}],
    });
    
  }
  
  
    
   return res.status(200).json({ data:null, errors: [{message: "tạo mới thành công"}],
    })
    
}

export default createTest
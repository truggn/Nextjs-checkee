import dbConnect from "@/utils/dbConnect";
import type { ProductTypeHandlers } from "../id";
import ProductType from "@/models/ProductType";
import cloudinary from "Backend/middlewares/cloudinary";
import { format } from 'date-fns';
import Organization from '@/models/Organization';
import Category from '@/models/Category'

const updateProductType: ProductTypeHandlers["updateProductType"] = async ({
  res,
  req,
  body: {
    id,
    name,
    price,
    productRepresentation,
    images,
    categoryId,
    countryOfOrigin,
    description,
    updatedBy
  },
  // config,
}) => {
  try {
    await dbConnect();

    const date = format(new Date(), 'yyyy/MM/dd')

    // array public_id images
    const public_ids: string[] = []

    const result = await ProductType.findOne({ _id: id })
    if (result) {
      public_ids.push(
        result.productRepresentation.public_id,
        result.productRepresentation.public_id.concat('_tn'));

      for (let i = 0; i < result.images.length; i++) {
        public_ids.push(
          result.images[i].public_id,
          result.images[i].public_id.concat('tn'));
      };
    };

    const images_cloud = images.map(async item => {

      const result_data = await cloudinary.v2.uploader.upload(item, {
        folder: `producttype/images/${date}`,
        format: 'jpg',
        transformation: [{
          quality: 'auto',
          fetch_format: 'auto'
        }]
      }, (error, result) => {
        if (error) return error.message
        if (result) return result
        return 'Unknow Error'
      });

      // fix size app
      await cloudinary.v2.uploader.upload(item, {
        transformation: [{
          height: 320,
          width: 320,
          crop: 'pad',
          quality: 'auto',
          fetch_format: 'auto',
        }],
        public_id: result_data.public_id.concat('_tn')
      }, (error, result) => {
        if (result) return result
        if (error) return error.message
        return 'Unknow Error'
      })

      return result_data;
    });

    const _images: any = await Promise.all(images_cloud)

    const representation_Image: any = await cloudinary.v2.uploader.upload(productRepresentation, {
      format: 'jpg',
      folder: `producttype/avata/${date}`,
      transformation: [{
        quality: 'auto',
        fetch_format: 'auto'
      }]
    }, (error, result) => {
      if (result) return result
      if (error) return error.message
      return 'Unknow Error'
    });

    // fix size app
    await cloudinary.v2.uploader.upload(productRepresentation, {
      transformation: [{
        width: 320,
        height: 320,
        crop: 'pad',
        quality: 'auto',
        fetch_format: 'auto'
      }],
      public_id: representation_Image.public_id.concat('_tn')
    }, (error, result) => {
      if (result) return result
      if (error) return error.message
      return 'Unknow Error'
    });

    const _productType = await ProductType.findOneAndUpdate({ _id: id }, {
      name: name,
      price: price,
      productRepresentation: representation_Image,
      images: _images,
      categoryId: categoryId,
      countryOfOrigin: countryOfOrigin,
      description: description,
      updatedBy: updatedBy
    }, { new: true });

    if (_productType) {

      // khi cập nhật thành công sẽ delete hình cũ trên cloudinary.
      public_ids.map(async item => {
        await cloudinary.v2.uploader.destroy(item, (error, result) => {
          if (error) return error.message
          if (result) return result
          return 'Unknow Error'
        })
      })

      const result_update = await ProductType.findOne({ _id: _productType.id })
        .populate({
          path: 'categoryId',
          select: 'code name',
          model: Category
        })
        .populate({
          path: 'organizationId',
          select: 'name_customer code',
          model: Organization
        })

      return res.status(200).json({
        data: result_update
      });

    } else {
      return res.status(401).json({
        data: null,
        errors: [{
          message: 'Không tìm thấy Product Type.'
        }]
      })
    }
  }
  catch (error) {
    return res.status(400).json({
      data: null,
      errors: [{ message: error.message }],
    });
  }
};

export default updateProductType;
